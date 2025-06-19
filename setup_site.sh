#!/bin/bash

SUBDOMAIN=$1
DOMAIN="sriox.com"
ROOT_DIR="/var/www/test/$SUBDOMAIN"
NGINX_CONF="/etc/nginx/sites-available/$SUBDOMAIN.$DOMAIN"

# Write NGINX config
cat <<EOF > $NGINX_CONF
server {
    listen 80;
    server_name $SUBDOMAIN.$DOMAIN;

    root $ROOT_DIR;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/$SUBDOMAIN.$DOMAIN

# Test and reload nginx
nginx -t && systemctl reload nginx

# Issue SSL certificate
certbot --nginx -d "$SUBDOMAIN.$DOMAIN" --non-interactive --agree-tos -m admin@sriox.com --redirect

echo "Site setup completed for $SUBDOMAIN.$DOMAIN"
