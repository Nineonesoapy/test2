from flask import Flask, request, render_template, redirect, session, url_for, flash, send_from_directory
import os
import subprocess
import requests
import json
import mysql.connector
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Cloudflare + Hosting Config
UPLOAD_DIR = "/var/www/test"
CLOUDFLARE_API_TOKEN = "95m7aLwbU8JZDt_tc7R5ImtVmGEx5Apo4cknFxhI"
ZONE_ID = "40ffe9b69c8309098982a5c5c4a5a16d"
DOMAIN = "sriox.com"
SERVER_IP = "103.180.237.199"

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="sriox",
        password="sriox",
        database="sriox"
    )

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS sites (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            subdomain VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    """)
    conn.commit()
    cur.close()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        conn = get_db()
        cur = conn.cursor()
        try:
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                        (request.form['username'], request.form['password']))
            conn.commit()
            flash("Account created successfully! Please login.", "success")
            return redirect('/login')
        except:
            flash("Username already exists. Please choose another.", "error")
        finally:
            cur.close()
            conn.close()
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE username=%s AND password=%s",
                    (request.form['username'], request.form['password']))
        user = cur.fetchone()
        cur.close()
        conn.close()
        if user:
            session['user_id'] = user[0]
            session['username'] = request.form['username']
            return redirect('/dashboard')
        flash("Invalid username or password.", "error")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out successfully.", "success")
    return redirect('/')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/login')
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT subdomain, created_at FROM sites WHERE user_id=%s ORDER BY created_at DESC", (session['user_id'],))
    sites = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('dashboard.html', sites=sites, username=session.get('username'))

@app.route('/create-site', methods=['GET', 'POST'])
def create_site():
    if 'user_id' not in session:
        return redirect('/login')
    if request.method == 'POST':
        subdomain = request.form['subdomain'].strip().lower()
        file = request.files['file']
        
        if not subdomain:
            flash("Please enter a subdomain.", "error")
            return render_template('create_site.html')
            
        if not file or not file.filename.endswith('.html'):
            flash("Please upload a valid HTML file.", "error")
            return render_template('create_site.html')

        # Check if subdomain already exists
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT id FROM sites WHERE subdomain=%s", (subdomain,))
        if cur.fetchone():
            flash("Subdomain already exists. Please choose another.", "error")
            cur.close()
            conn.close()
            return render_template('create_site.html')

        site_dir = os.path.join(UPLOAD_DIR, subdomain)
        os.makedirs(site_dir, exist_ok=True)
        file.save(os.path.join(site_dir, 'index.html'))

        cur.execute("INSERT INTO sites (user_id, subdomain) VALUES (%s, %s)", (session['user_id'], subdomain))
        conn.commit()
        cur.close()
        conn.close()

        # Cloudflare DNS setup
        headers = {
            "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
            "Content-Type": "application/json"
        }
        data = {
            "type": "A",
            "name": f"{subdomain}.{DOMAIN}",
            "content": SERVER_IP,
            "ttl": 120,
            "proxied": False
        }
        requests.post(f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records",
                      headers=headers, json=data)

        subprocess.Popen(['bash', 'setup_site.sh', subdomain])
        return render_template("loading.html", subdomain=subdomain)

    return render_template('create_site.html')

@app.route('/manage/<subdomain>')
def manage_site(subdomain):
    if 'user_id' not in session:
        return redirect('/login')
    
    # Verify user owns this site
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id FROM sites WHERE subdomain=%s AND user_id=%s", (subdomain, session['user_id']))
    if not cur.fetchone():
        flash("Site not found or access denied.", "error")
        cur.close()
        conn.close()
        return redirect('/dashboard')
    cur.close()
    conn.close()
    
    site_path = os.path.join(UPLOAD_DIR, subdomain)
    files = []
    if os.path.exists(site_path):
        for f in os.listdir(site_path):
            if os.path.isfile(os.path.join(site_path, f)):
                stat = os.stat(os.path.join(site_path, f))
                files.append({
                    'name': f,
                    'size': stat.st_size,
                    'modified': stat.st_mtime
                })
    return render_template('manage.html', subdomain=subdomain, files=files)

@app.route('/manage/<subdomain>/edit/<filename>', methods=['GET', 'POST'])
def edit_file(subdomain, filename):
    if 'user_id' not in session:
        return redirect('/login')
        
    path = os.path.join(UPLOAD_DIR, subdomain, filename)
    if not os.path.exists(path):
        flash("File not found.", "error")
        return redirect(url_for('manage_site', subdomain=subdomain))
        
    if request.method == 'POST':
        with open(path, 'w') as f:
            f.write(request.form['content'])
        flash("File saved successfully!", "success")
        return redirect(url_for('manage_site', subdomain=subdomain))
        
    with open(path, 'r') as f:
        content = f.read()
    return render_template('edit_file.html', filename=filename, content=content, subdomain=subdomain)

@app.route('/manage/<subdomain>/delete/<filename>')
def delete_file(subdomain, filename):
    if 'user_id' not in session:
        return redirect('/login')
        
    path = os.path.join(UPLOAD_DIR, subdomain, filename)
    if os.path.exists(path):
        os.remove(path)
        flash("File deleted successfully!", "success")
    return redirect(url_for('manage_site', subdomain=subdomain))

@app.route('/manage/<subdomain>/upload', methods=['GET', 'POST'])
def upload_file(subdomain):
    if 'user_id' not in session:
        return redirect('/login')
        
    if request.method == 'POST':
        file = request.files['file']
        if file and file.filename:
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_DIR, subdomain, filename))
            flash("File uploaded successfully!", "success")
        return redirect(url_for('manage_site', subdomain=subdomain))
    return render_template('upload_file.html', subdomain=subdomain)

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
