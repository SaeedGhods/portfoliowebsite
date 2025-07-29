/**
 * Simple HTTP server for testing the website
 * This runs a local server and injects the diagnostics scripts automatically
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const PORT = 8080;
const ROOT_DIR = __dirname;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg'
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Normalize the pathname (handle potential path traversal attacks)
  pathname = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  
  // Default to index.html for root path
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }
  
  // Get the file path
  const filePath = path.join(ROOT_DIR, pathname);
  
  // Get the file extension
  const ext = path.extname(filePath).toLowerCase();
  
  // Check if the file exists
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h1>404 Not Found</h1><p>The resource ${pathname} was not found.</p>`);
      return;
    }
    
    // Read the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 Internal Server Error</h1><p>${err}</p>`);
        return;
      }
      
      // Get the content type
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // If it's an HTML file, inject the diagnostic scripts
      if (ext === '.html') {
        const htmlContent = data.toString();
        
        // Inject our scripts at the end of the body
        const injectedHtml = htmlContent.replace('</body>', 
          `<script src="js/injector.js?_=${Date.now()}"></script>
           </body>`);
        
        // Send the response
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(injectedHtml);
      } else {
        // Send the response without modifications for non-HTML files
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`\n=== Portfolio Diagnostic Server ===`);
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Diagnostic page: http://localhost:${PORT}/diagnostic.html`);
  console.log(`Gallery test page: http://localhost:${PORT}/gallery-test.html`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
