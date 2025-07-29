/**
 * Cybermask Gallery - Loads images using the asset manager for environment-specific URLs
 * Maintains strict 5-column grid layout as required
 */

// Define the Cybermask gallery images
const cybermaskImages = [];
for (let i = 1; i <= 40; i++) {
    const paddedNumber = i.toString().padStart(3, "0");
    cybermaskImages.push(getAssetUrl(`cybermask/JPEG/${paddedNumber}.jpg`));
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initCybermaskGallery();
});

function initCybermaskGallery() {
    // Check if gallery container exists
    const gallery = document.getElementById("cybermaskGallery");
    if (!gallery) {
        console.warn("Cybermask gallery container not found");
        return;
    }
    
    // Skip if already initialized
    if (gallery.classList.contains("initialized")) {
        console.log("Cybermask gallery already initialized, skipping");
        return;
    }
    
    console.log(`Initializing Cybermask gallery with 40 images from ${getAssetUrl('cybermask/JPEG/')}`);
    
    // Use the common gallery manager if available
    if (window.galleryManager) {
        // Initialize the gallery with the common gallery manager
        window.galleryManager.initializeGallery("cybermaskGallery", cybermaskImages, {
            columns: 5, // Ensure 5-column layout
            showNumbers: true,
            fadeIn: true
        });
        
        // Mark as initialized
        gallery.classList.add("initialized");
        console.log("Cybermask gallery initialized with common gallery manager");
    } else {
        // Fallback to manual initialization
        console.warn("Common gallery manager not available, using fallback initialization");
        manualInitGallery(gallery);
    }
}

// Fallback manual initialization if common gallery manager is not available
function manualInitGallery(gallery) {
    // Clear any existing content
    gallery.innerHTML = "";
    
    // Ensure the gallery has the cybermask-gallery class for proper styling
    gallery.classList.add("cybermask-gallery");
    
    // Create a grid container
    const gridContainer = document.createElement("div");
    gridContainer.className = "gallery-grid";
    gallery.appendChild(gridContainer);
    
    // Add all images to the gallery
    cybermaskImages.forEach((path, index) => {
        createImageItem(gridContainer, path, index + 1);
    });
    
    // Mark gallery as initialized
    gallery.classList.add("initialized");
    console.log("Cybermask gallery initialized with fallback method");
}

// Create an individual image item for the fallback method
function createImageItem(container, imagePath, index) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = `Cybermask Image ${index}`;
    img.loading = "lazy";
    
    // Add error handling
    img.onerror = function() {
        console.error(`Failed to load image: ${imagePath}`);
        // Try alternative path format if needed
        const match = imagePath.match(/(\d+)\.jpg$/);
        if (match) {
            const num = parseInt(match[1]);
            const paddedNumber = num.toString().padStart(3, "0");
            img.src = getAssetUrl(`cybermask/JPEG/${paddedNumber}.jpg`);
        }
    };
    
    // Add image number
    const number = document.createElement("div");
    number.className = "image-number";
    number.textContent = index;
    
    // Add click event to open modal
    item.addEventListener("click", function() {
        openImageModal(imagePath, index - 1);
    });
    
    item.appendChild(img);
    item.appendChild(number);
    container.appendChild(item);
}

// Fallback modal functionality
function openImageModal(imageSrc, index) {
    if (window.galleryManager) {
        window.galleryManager.openModal(cybermaskImages, index);
    } else {
        // Create modal if it doesn't exist
        const modal = document.getElementById("imageModal") || createFallbackModal();
        const modalImg = document.getElementById("modalImage");
        
        // Show the modal and set the image
        modal.style.display = "block";
        modalImg.src = imageSrc;
    }
}

// Create a fallback modal if needed
function createFallbackModal() {
    const modal = document.createElement("div");
    modal.id = "imageModal";
    modal.className = "image-modal";
    
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    
    const closeBtn = document.createElement("span");
    closeBtn.className = "close-modal";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
    
    const modalImg = document.createElement("img");
    modalImg.id = "modalImage";
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalImg);
    modal.appendChild(modalContent);
    
    // Add modal to document
    document.body.appendChild(modal);
    
    // Close modal when clicking outside the image
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    
    return modal;
}
