/**
 * Hydroponic Innovations Gallery
 * Maintains strict 5-column grid layout as required
 */

// Function to get hydroponic gallery images (called when needed to ensure getAssetUrl is available)
function getHydroponicImages() {
    return [
        getAssetUrl("hydroponic/JPEG/JPEG/01.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/02.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/03.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/04.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/05.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/06.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/07.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/08.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/09.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/10.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/11.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/12.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/13.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/14.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/15.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/16.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/17.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/18.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/19.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/20.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/21.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/22.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/23.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/24.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/25.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/26.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/27.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/28.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/29.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/30.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/31.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/32.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/33.jpg"),
        getAssetUrl("hydroponic/JPEG/JPEG/34.jpeg"),
        getAssetUrl("hydroponic/JPEG/JPEG/35.jpeg")
    ];
}

// Initialize when timeline item is expanded or when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Find the timeline item containing the hydroponic gallery
    const gallery = document.getElementById("hydroponicGallery");
    if (gallery) {
        const hydroponicItem = gallery.closest('.timeline-item');
        if (hydroponicItem) {
            // Use MutationObserver to watch for 'expanded' class
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (hydroponicItem.classList.contains('expanded')) {
                            // Small delay to ensure container is visible
                            setTimeout(() => {
                                initHydroponicGallery();
                            }, 100);
                        }
                    }
                });
            });
            observer.observe(hydroponicItem, { attributes: true });
        }
        
        // Also try to initialize if the item is already expanded
        setTimeout(() => {
            if (gallery.offsetParent !== null) {
                // Gallery is visible, initialize it
                initHydroponicGallery();
            }
        }, 500);
    }
});

function initHydroponicGallery() {
    // Check if gallery container exists
    const gallery = document.getElementById("hydroponicGallery");
    if (!gallery) {
        console.warn("Hydroponic gallery container not found");
        return;
    }
    
    // Check if already initialized using gallery manager's tracking
    if (window.galleryManager) {
        if (window.galleryManager.initializedGalleries && window.galleryManager.initializedGalleries.has("hydroponicGallery")) {
            console.log("Hydroponic gallery already initialized (via gallery manager), skipping");
            return;
        }
        if (window.galleryManager.loadingGalleries && window.galleryManager.loadingGalleries.has("hydroponicGallery")) {
            console.log("Hydroponic gallery currently loading, skipping");
            return;
        }
    } else if (gallery.classList.contains("initialized")) {
        console.log("Hydroponic gallery already initialized (via class), skipping");
        return;
    }
    
    console.log("Initializing Hydroponic gallery with images from 01-35");
    
    // Get the images array (ensures getAssetUrl is available)
    const hydroponicImages = getHydroponicImages();
    
    // Use the common gallery manager if available
    if (window.galleryManager) {
        // Initialize the gallery with the common gallery manager
        // Note: initializeGallery only accepts 2 parameters (galleryId, images)
        window.galleryManager.initializeGallery("hydroponicGallery", hydroponicImages);
        
        // Don't mark as initialized here - let the gallery manager handle it
        // The gallery manager will mark it as initialized when images finish loading
        console.log("Hydroponic gallery initialization started with common gallery manager");
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
    
    // Create a grid container with 5-column layout
    const gridContainer = document.createElement("div");
    gridContainer.className = "gallery-grid";
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
    gallery.appendChild(gridContainer);
    
    // Get the images array (ensures getAssetUrl is available)
    const hydroponicImages = getHydroponicImages();
    
    // Add all images to the gallery
    hydroponicImages.forEach((path, index) => {
        createImageItem(gridContainer, path, index + 1);
    });
    
    // Mark gallery as initialized
    gallery.classList.add("initialized");
    console.log("Hydroponic gallery initialized with fallback method");
}

// Create an individual image item for the fallback method
function createImageItem(container, imagePath, index) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = `Hydroponic System Image ${index}`;
    img.loading = "lazy";
    
    // Add error handling
    img.onerror = function() {
        console.error(`Failed to load hydroponic image: ${imagePath}`);
        console.error(`Image naturalWidth: ${this.naturalWidth}, naturalHeight: ${this.naturalHeight}`);
        console.error(`Image current src: ${this.src}`);
        console.error(`Attempting to load placeholder instead`);
        this.src = getAssetUrl("placeholder-image.jpg");
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
        const hydroponicImages = getHydroponicImages();
        window.galleryManager.openModal(hydroponicImages, index);
    } else {
        // Create modal if it doesn't exist
        const modal = document.getElementById("imageModal") || createFallbackModal();
        const modalImg = document.getElementById("modalImage");
        
        // Show the modal and set the image
        modal.style.display = "block";
        modalImg.src = imageSrc;
        modalImg.loading = "lazy";
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
    modalImg.loading = "lazy";
    
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
// Force cache invalidation - Tue Jan 13 15:08:43 EST 2026
