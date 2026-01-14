/**
 * Giga Austin Gallery
 * Follows the strict 5-column grid layout requirement
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Giga Austin Gallery initialization started");
    const galleryContainer = document.getElementById("gigaAustinGallery");
    
    if (!galleryContainer) {
        console.error("Giga Austin gallery container not found");
        return;
    }

    // Set a flag to prevent multiple initializations
    if (galleryContainer.classList.contains("initialized")) {
        console.log("Giga Austin gallery already initialized, skipping");
        return;
    }

    // Debug info
    console.log("Giga Austin gallery container found", galleryContainer);

    // List of Giga Austin event images with cache-busting version
    const version = new Date().getTime(); // Use timestamp for cache busting
    const images = [
        getAssetUrl(`gigaaustin/JPEG/01.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/02.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/04.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/05.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/06.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/08.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/10.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/11.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/12.jpg?v=${version}`),
        getAssetUrl(`gigaaustin/JPEG/14.jpg?v=${version}`)
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
        console.log("Using gallery manager for Giga Austin gallery");
        window.galleryManager.initializeGallery("gigaAustinGallery", images);
        galleryContainer.classList.add("initialized");
        return;
    }

    // Fallback if gallery manager doesn't exist
    console.log("Gallery manager not found, using fallback for Giga Austin gallery");
    
    // Clear any existing content
    galleryContainer.innerHTML = "";
    
    // Add loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "gallery-loading";
    loadingIndicator.innerHTML = "<div class=\"gallery-spinner\"></div>";
    galleryContainer.appendChild(loadingIndicator);
    
    // Create gallery items
    let loadedCount = 0;
    
    images.forEach((imagePath, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `Giga Austin Image ${index + 1}`;
        img.className = "project-gallery-image";
        img.loading = "lazy";
        
        // Handle image loading
        img.onload = function() {
            loadedCount++;
            if (loadedCount === images.length) {
                // All images loaded, remove loading indicator
                loadingIndicator.remove();
                galleryContainer.style.opacity = "1";
            }
        };
        
        // Error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
            this.src = getAssetUrl("placeholder.jpg"); // Fallback image
            loadedCount++;
            if (loadedCount === images.length) {
                loadingIndicator.remove();
                galleryContainer.style.opacity = "1";
            }
        };
        
        // Add image number
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = (index + 1).toString();
        
        // Add click handler for modal
        galleryItem.addEventListener("click", function() {
            openImageModal(imagePath, index, images);
        });
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(imageNumber);
        galleryContainer.appendChild(galleryItem);
    });
    
    // Mark as initialized
    galleryContainer.classList.add("initialized");
});

// Function to open an image modal
function openImageModal(imagePath, index, images) {
    // Check if gallery manager exists and use it
    if (window.galleryManager) {
        window.galleryManager.openModal(images, index);
        return;
    }

    // Fallback modal implementation
    console.log("Using fallback modal for Giga Austin gallery");

    // Create modal elements if they don't exist
    let modal = document.querySelector(".gallery-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.className = "gallery-modal";
        document.body.appendChild(modal);

        // Create modal content
        const modalContent = document.createElement("div");
        modalContent.className = "gallery-modal-content";

        // Create close button
        const closeBtn = document.createElement("span");
        closeBtn.className = "gallery-modal-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };

        // Create image element
        const modalImg = document.createElement("img");
        modalImg.className = "gallery-modal-img";
        modalImg.loading = "lazy";

        // Assemble modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalImg);
        modal.appendChild(modalContent);
    }

    // Get modal elements
    const modalImg = modal.querySelector(".gallery-modal-img");

    // Set image source
    modalImg.src = imagePath;

    // Show modal
    modal.style.display = "flex";
}
