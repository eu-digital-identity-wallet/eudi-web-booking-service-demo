#!/bin/sh

# Start the Next.js app in the background
npm start &

# Start Nginx in the foreground
nginx -g 'daemon off;'