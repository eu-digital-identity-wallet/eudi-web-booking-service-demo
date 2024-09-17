# Stage 1: Install dependencies and build the Next.js app
FROM node:20.15.1-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .
#Initialize prisma
RUN npm run prisma:init
# Build the Next.js application
RUN npm run build

# Stage 2: Set up the production environment with Nginx
FROM node:20.15.1-alpine
WORKDIR /app

## Install Nginx
#RUN apk update && apk add nginx

# Copy the built Next.js app and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

## Copy Nginx configuration file
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Copy the startup script
#COPY start.sh /start.sh
#
#RUN chmod +x /start.sh

## Expose port 80 for Nginx
#EXPOSE 80

# Start the Next.js app and Nginx
CMD ["npm", "start"]
