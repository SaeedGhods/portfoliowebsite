/**
 * Diagnostic Loader
 * This script dynamically injects the error-diagnostic.js script 
 * without requiring modifications to the large index.html file
 */

(function() {
    // Function to inject our diagnostic script
    function injectDiagnosticScript() {
        console.log("Injecting diagnostic script...");
        const script = document.createElement("script");
        script.src = "js/error-diagnostic.js?" + Date.now(); // Add cache busting
        script.async = true;
        script.onload = function() {
            console.log("Diagnostic script loaded successfully");
        };
        script.onerror = function() {
            console.error("Failed to load diagnostic script");
        };
        document.body.appendChild(script);
    }

    // Add the script right away
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectDiagnosticScript);
    } else {
        injectDiagnosticScript();
    }

    // Fix any missing gallery declarations
    function fixGalleryStyles() {
        // Make sure we have the mandatory 5-column style for galleries
        const style = document.createElement("style");
        style.textContent = `
            /* Fix for gallery columns - ensuring 5-column layout */
            .gallery-container, 
            #teslaNorthHollywoodGallery,
            #gigaAustinGallery, 
            #cybermaskGallery,
            #wwrenoGallery,
            #weRobotGallery,
            #modelXFianceGallery,
            #ventGallery,
            #hydroponicGallery,
            #familyHomeGallery {
                display: grid !important;
                grid-template-columns: repeat(5, 1fr) !important;
                gap: 0 !important;
                width: 62.5% !important;
                margin: 20px 0 !important;
            }
            
            /* Fix for images scaling on hover */
            .gallery-item,
            .gallery-item img,
            .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
                transition: none !important;
            }
            
            .gallery-item:hover,
            .gallery-item:hover img,
            .gallery-item:hover .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
            }
            
            /* Ensure only proper hover effects */
            .gallery-item img,
            .gallery-item-img {
                filter: saturate(0.22);
                transition: filter 0.3s ease;
            }
            
            .gallery-item:hover img,
            .gallery-item:hover .gallery-item-img {
                filter: saturate(1);
            }
        `;
        document.head.appendChild(style);
    }

    // Fix styles when DOM is loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fixGalleryStyles);
    } else {
        fixGalleryStyles();
    }
})();
