/**
 * Cache Buster Script
 * This script helps ensure that browser cache is properly cleared
 */
console.log("Cache Buster loaded - " + new Date().toISOString());

// Force browser to reload all assets by adding cache-busting query parameter
window.addEventListener("DOMContentLoaded", function() {
    const uniqueTimestamp = Date.now();
    console.log("Cache buster timestamp: " + uniqueTimestamp);
    
    // Function to reload all scripts with a timestamp
    function reloadScripts() {
        const scripts = document.querySelectorAll("script[src]");
        scripts.forEach(script => {
            if (script.src.includes("vent-gallery.js")) {
                const originalSrc = script.src.split("?")[0];
                const newSrc = originalSrc + "?v=" + uniqueTimestamp;
                console.log("Reloading script: " + newSrc);
                
                // Create a new script element
                const newScript = document.createElement("script");
                newScript.src = newSrc;
                newScript.onload = function() {
                    console.log("Successfully reloaded: " + newSrc);
                    // Re-initialize the gallery
                    if (typeof initVentGallery === "function") {
                        console.log("Re-initializing VENT gallery");
                        initVentGallery();
                    }
                };
                
                // Replace the old script
                script.parentNode.replaceChild(newScript, script);
            }
        });
    }
    
    // Add small delay to ensure DOM is fully loaded
    setTimeout(reloadScripts, 500);
});
