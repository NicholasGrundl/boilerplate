# 7. Asset Management

For the issfrontend project, we'll focus on managing assets within the React application and Docker container, as the project is currently small.

## Managing Assets in React

1. Place static assets in the `public` folder:
   - Navigate to your project's `public` folder
   - Add your images, fonts, and other static files here

2. Reference assets in your React components:
   - Use relative paths starting with `%PUBLIC_URL%/`
   - Example:
     ```jsx
     <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
     ```

3. Update your `public/index.html` file:
   - Add any necessary meta tags, font links, or other assets

## Optimizing Assets

1. Optimize images:
   - Use tools like ImageOptim or TinyPNG to compress images
   - Consider using WebP format for better compression

2. Use SVGs for icons and logos when possible

3. Implement lazy loading for images:
   ```jsx
   import React, { lazy, Suspense } from 'react';
   
   const LazyImage = lazy(() => import('./LazyImage'));
   
   function MyComponent() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyImage src="large-image.jpg" alt="Large Image" />
       </Suspense>
     );
   }
   ```

## Managing Assets in Docker

1. Update your Dockerfile to copy assets:
   ```dockerfile
   # ... (previous Dockerfile content)
   
   # Copy public folder to the container
   COPY public/ /app/public/
   
   # ... (rest of Dockerfile)
   ```

2. If you have large assets, consider using Docker's `.dockerignore` file to exclude unnecessary files:
   ```
   # .dockerignore
   node_modules
   npm-debug.log
   build
   .git
   *.md
   ```

## Using Environment Variables for Dynamic Assets

1. Create a `.env` file in your project root:
   ```
   REACT_APP_API_URL=https://api.example.com
   REACT_APP_ASSET_URL=https://assets.example.com
   ```

2. Use these variables in your React components:
   ```jsx
   <img src={`${process.env.REACT_APP_ASSET_URL}/logo.png`} alt="Logo" />
   ```

3. For Cloud Run, set environment variables:
   ```bash
   gcloud run services update issfrontend \
     --set-env-vars REACT_APP_API_URL=https://api.example.com,REACT_APP_ASSET_URL=https://assets.example.com
   ```

## Implementing a Basic Asset Preloading Strategy

1. Create a `preloadAssets.js` file in your `src` folder:
   ```javascript
   const assetUrls = [
     '/logo.png',
     '/background.jpg',
     // Add more asset URLs as needed
   ];
   
   export const preloadAssets = () => {
     assetUrls.forEach((url) => {
       const img = new Image();
       img.src = `${process.env.PUBLIC_URL}${url}`;
     });
   };
   ```

2. Call this function in your main `App.js` or a top-level component:
   ```jsx
   import React, { useEffect } from 'react';
   import { preloadAssets } from './preloadAssets';
   
   function App() {
     useEffect(() => {
       preloadAssets();
     }, []);
   
     // ... rest of your component
   }
   ```

This setup should be sufficient for managing assets in your small to medium-sized project. As your project grows, you may want to consider more advanced strategies like using a CDN or implementing server-side rendering for better performance.
