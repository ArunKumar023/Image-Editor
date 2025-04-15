# Image Editor Application

## Introduction
Welcome to the Image Editor Application, a simple web app built with React, React Router, and Fabric.js. It allows you to search for images using the Unsplash API, edit them by adding text or shapes (triangle, circle, rectangle, polygon), and download your creations as PNG files. This app is perfect for quick image edits with an intuitive interface.

## How to Use
Follow these steps to use the app on CodeSandbox:

1. **Access the App**: Open the app at CodeSandbox Link https://codesandbox.io/p/devbox/jolly-buck-c6jlpz

2. **Search for Images**:
   - On the Search Page, type a keyword (e.g., "nature") in the search bar.
   - Click the 🔍 button to fetch images from Unsplash.
3. **Edit an Image**:
   - Click any image or its "Add Caption" button to go to the Edit Page.
   - The image loads on a canvas where you can:
     - Click "Add Text" to type custom text.
     - Click "Add Triangle," "Add Circle," "Add Rectangle," or "Add Polygon" to draw shapes.
     - Click an object to select it, then use "Delete Selected" to remove it.
     - Drag, resize, or rotate objects on the canvas.
4. **Save Your Work**:
   - Click "Download" to save the edited image as a PNG file.
5. **Return to Search**: Use the browser’s back button to search again.


## Notes
- The Name and Email fields on the Search Page are placeholders and not used.
- The Unsplash API key is included for demo purposes. In production, use a `.env` file.
- If images don’t load, try a different search term or check your connection.

