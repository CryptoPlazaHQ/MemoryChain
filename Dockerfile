# Use a Node.js base image for building the React app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally and then install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React app
RUN pnpm run build

# Use a lightweight web server image for serving the app
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
