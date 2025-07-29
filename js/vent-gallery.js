// Force cache clearing for VENT gallery
console.log("VENT Gallery script - CACHE BUSTER - v=" + Date.now());

// Try to clear cache using various methods
if ("caches" in window) {
    console.log("Clearing cache using Cache API");
    caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                console.log("Deleting cache: " + cacheName);
                return caches.delete(cacheName);
            })
        );
    }).catch(function(error) {
        console.error("Cache clearing error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize the VENT gallery when the DOM is fully loaded
    console.log("VENT Gallery script loaded - version 2025-03-16 19:25");
    
    initVentGallery();
});

function initVentGallery() {
    // Get the container for the VENT gallery
    const galleryContainer = document.getElementById("ventGallery");
    if (!galleryContainer) {
        console.error("Vent gallery container not found");
        return;
    }

    console.log("Initializing VENT Gallery");

    // List of VENT project images from the JPEG folder
    const images = [
        getAssetUrl("vent/JPEG/01.jpg"),
        getAssetUrl("vent/JPEG/02.jpg"),
        getAssetUrl("vent/JPEG/03.jpg"),
        getAssetUrl("vent/JPEG/04.jpg"),
        getAssetUrl("vent/JPEG/05.jpg"),
        getAssetUrl("vent/JPEG/06.jpg"),
        getAssetUrl("vent/JPEG/07.jpg"),
        getAssetUrl("vent/JPEG/08.jpg"),
        getAssetUrl("vent/JPEG/09.jpg")
    ];

    // If the gallery manager exists, use it for consistency with other galleries
    if (window.galleryManager) {
        // Initialize the gallery with the common gallery manager
        window.galleryManager.initializeGallery("ventGallery", images, {
            columns: 5, // Use 5-column layout for consistency
            showNumbers: true,
            fadeIn: true
        });
        
        // Mark as initialized
        galleryContainer.classList.add("initialized");
        console.log("VENT gallery initialized with common gallery manager");
        return;
    }

    // Fallback implementation if gallery manager is not available
    // Clear the container
    galleryContainer.innerHTML = "";
    
    // Add CSS that ensures 5-column grid layout with proper image sizing
    const galleryCss = document.createElement("style");
    galleryCss.textContent = `
        #ventGallery {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important; /* Force 5-column layout */
            gap: 0 !important;
            padding: 0;
            background: transparent;
            margin: 20px 0;
            width: 62.5% !important; /* Match Tesla North Hollywood gallery width */
            margin-left: 0;
            margin-right: auto;
            opacity: 1;
        }
        
        #ventGallery .gallery-item {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            overflow: hidden;
            margin: 0 !important;
            border: none !important;
            cursor: pointer;
            transform: none !important;
            scale: 1 !important;
            transition: none !important;
        }
        
        #ventGallery .project-gallery-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: saturate(0.22);
            transition: filter 0.3s ease;
            border: none !important;
            transform: none !important;
            scale: 1 !important;
        }
        
        #ventGallery .gallery-item:hover .project-gallery-image {
            filter: saturate(1);
            transform: none !important;
            scale: 1 !important;
        }
        
        #ventGallery .image-number {
            position: absolute;
            top: 5px;
            left: 5px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            z-index: 2;
            transition: opacity 0.3s ease;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
        
        #ventGallery .gallery-item:hover .image-number {
            opacity: 0;
        }
    `;
    document.head.appendChild(galleryCss);
    
    // Create gallery items for all images
    images.forEach((imagePath, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        // Extract filename for tooltip
        const filename = imagePath.split("/").pop();
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `VENT Project - Image ${index + 1}`;
        img.className = "project-gallery-image";
        img.loading = "lazy";
        img.title = `VENT Project - Image ${index + 1}`;
        
        // Error handling for images
        img.onerror = function() {
            console.error(`Failed to load image ${index + 1}: ${filename}`);
            this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23cccccc%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22150%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%22%23666666%22%3EImage%20not%20found%3C%2Ftext%3E%3C%2Fsvg%3E";
        };
        
        // Add image number
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = (index + 1).toString();
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(imageNumber);
        galleryContainer.appendChild(galleryItem);
    });
    
    console.log(`VENT Gallery loaded with ${images.length} images`);
}
