/**
 * WeRobot Gallery
 * Follows the strict 5-column grid layout requirement
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("WeRobot Gallery initialization started");
    const galleryContainer = document.getElementById("weRobotGallery");
    
    if (!galleryContainer) {
        console.error("WeRobot gallery container not found");
        return;
    }

    // Set a flag to prevent multiple initializations
    if (galleryContainer.classList.contains("initialized")) {
        console.log("WeRobot gallery already initialized, skipping");
        return;
    }

    // Debug info
    console.log("WeRobot gallery container found", galleryContainer);

    // List of WeRobot event images with cache-busting version
    const version = "20250317"; // Use version instead of timestamp for predictable caching
    const images = [
        getAssetUrl(`werobot/JPEG/01.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/02.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/03.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/04.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/05.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/06.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/07.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/08.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/09.jpeg?v=${version}`),
        getAssetUrl(`werobot/JPEG/10.jpeg?v=${version}`)
    ];

    // Force the correct styles first - ensure 5-column grid
    galleryContainer.style.cssText = `
        display: grid !important;
        grid-template-columns: repeat(5, 1fr) !important;
        gap: 0 !important;
        width: 62.5% !important;
        margin-left: 0 !important;
        margin-right: auto !important;
        margin-top: 20px !important;
    `;

    // If the gallery manager exists, use it for consistency
    if (window.galleryManager) {
        console.log("Using gallery manager for WeRobot gallery");
        
        // Initialize the gallery with the common gallery manager
        window.galleryManager.initializeGallery("weRobotGallery", images, {
            columns: 5, // Ensure 5-column layout as required
            showNumbers: true,
            fadeIn: true
        });
        
        // Mark as initialized
        galleryContainer.classList.add("initialized");
        console.log("WeRobot gallery initialized with common gallery manager");
        return;
    }

    // Fallback implementation if gallery manager is not available
    console.warn("Gallery manager not found, using fallback implementation for WeRobot gallery");
    
    // Clear the container
    galleryContainer.innerHTML = "";
    
    // Create gallery items for all images
    images.forEach((imagePath, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `WeRobot Event - Image ${index + 1}`;
        img.className = "project-gallery-image";
        img.loading = "lazy";
        
        // Error handling for images
        img.onerror = function() {
            console.error(`Failed to load image ${index + 1}: ${imagePath}`);
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
    
    // Mark as initialized
    galleryContainer.classList.add("initialized");
    console.log(`WeRobot Gallery loaded with ${images.length} images`);
});
