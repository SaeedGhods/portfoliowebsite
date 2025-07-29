#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
import glob

PORT = 8082

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        http.server.SimpleHTTPRequestHandler.end_headers(self)
    
    def do_GET(self):
        # Handle special API endpoints
        if self.path == '/api/last-modified':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            # Get the last modified time of key website files
            last_modified = self.get_last_modified_time()
            
            # Send the last modified time as JSON
            self.wfile.write(json.dumps({'lastModified': last_modified}).encode())
            return
        
        if self.path == '/list-asia-images':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            # Get all jpg files in the asia-study-abroad directory
            image_dir = os.path.join(os.getcwd(), 'images', 'asia-study-abroad')
            image_files = []
            
            # Get all jpg files
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.gif']:
                image_files.extend([os.path.basename(f) for f in glob.glob(os.path.join(image_dir, ext))])
            
            # Sort files
            image_files.sort()
            
            # Send the list as JSON
            self.wfile.write(json.dumps(image_files).encode())
            return
        
        # For all other paths, use the default handler
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
    def get_last_modified_time(self):
        """Get the most recent modification time of key website files"""
        key_files = [
            'index.html',
            'js/app.js',
            'css/consolidated-styles.css'
        ]
        
        latest_time = 0
        
        for file_path in key_files:
            if os.path.exists(file_path):
                file_time = os.path.getmtime(file_path)
                if file_time > latest_time:
                    latest_time = file_time
        
        # Convert to ISO format
        from datetime import datetime
        return datetime.fromtimestamp(latest_time).isoformat()

Handler = CustomHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT} with no-cache headers")
    print(f"Working directory: {os.getcwd()}")
    httpd.serve_forever()
