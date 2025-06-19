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

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

# Enable site
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/$SUBDOMAIN.$DOMAIN

# Test and reload nginx
nginx -t && systemctl reload nginx

# Issue SSL certificate
certbot --nginx -d "$SUBDOMAIN.$DOMAIN" --non-interactive --agree-tos -m your@email.com
