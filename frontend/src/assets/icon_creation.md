# Icon Creation Process using Inkscape on WSL

## Prerequisites
1. Install Inkscape on WSL: `sudo apt-get install inkscape`
2. Install ImageMagick: `sudo apt-get install imagemagick`

## Creating PNG Versions
1. Open terminal in WSL
2. Navigate to the directory containing your SVG file
3. Create 192x192 PNG:
   ```
   inkscape -w 192 -h 192 insilico-strategy-logo.svg -o insilico-strategy-logo-192.png
   ```
4. Create 512x512 PNG:
   ```
   inkscape -w 512 -h 512 insilico-strategy-logo.svg -o insilico-strategy-logo-512.png
   ```

## Creating Favicon
1. Create 16x16, 32x32, and 64x64 PNGs:
   ```
   inkscape -w 16 -h 16 insilico-strategy-logo.svg -o favicon-16.png
   inkscape -w 32 -h 32 insilico-strategy-logo.svg -o favicon-32.png
   inkscape -w 64 -h 64 insilico-strategy-logo.svg -o favicon-64.png
   ```
2. Create ICO file:
   ```
   convert favicon-16.png favicon-32.png favicon-64.png favicon.ico
   ```
3. Rename 32x32 PNG to favicon.png:
   ```
   mv favicon-32.png favicon.png
   ```

## Cleanup
1. Remove intermediate files:
   ```
   rm favicon-16.png favicon-64.png
   ```

## Implement in React Project
1. Move PNG and ICO files to the `public` folder of your React project
2. Update `manifest.json` in the `public` folder (see previous instructions)
3. Update `<head>` section in `public/index.html` (see previous instructions)