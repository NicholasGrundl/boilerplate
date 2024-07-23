# 2. Containerize the Application

## Create a Dockerfile

1. In the root directory of your `issfrontend` project, create a new file named `Dockerfile`.

2. Open the `Dockerfile` in your text editor and add the following content:

   ```dockerfile
   # Build stage
   FROM node:14 as build

   # Set working directory
   WORKDIR /app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm ci

   # Copy the rest of the application code
   COPY . .

   # Build the application
   RUN npm run build

   # Production stage
   FROM nginx:alpine

   # Copy the build output to replace the default nginx contents
   COPY --from=build /app/build /usr/share/nginx/html

   # Expose port 80
   EXPOSE 80

   # Start Nginx server
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. Save the file.

## Create a .dockerignore file

1. In the root directory of your `issfrontend` project, create a new file named `.dockerignore`.

2. Open the `.dockerignore` file in your text editor and add the following content:

   ```
   node_modules
   npm-debug.log
   build
   .dockerignore
   **/.git
   **/.DS_Store
   **/node_modules
   ```

3. Save the file.

## Build the Docker image

1. Open your terminal and navigate to the root directory of your `issfrontend` project.

2. Run the following command to build your Docker image:

   ```bash
   docker build -t issfrontend:latest .
   ```

   This command builds a Docker image with the tag `issfrontend:latest`.

## Test the Docker image locally

1. Once the build is complete, run the following command to start a container from your image:

   ```bash
   docker run -p 8080:80 issfrontend:latest
   ```

   This command runs your container and maps port 8080 on your host to port 80 in the container.

2. Open a web browser and navigate to `http://localhost:8080`. You should see your React application running from within the Docker container.

3. To stop the container, press `Ctrl+C` in the terminal where the container is running.

Now your React application is containerized and ready for deployment to Google Cloud Platform.
