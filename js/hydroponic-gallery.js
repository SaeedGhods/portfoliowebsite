/**
 * Hydroponic Innovations Gallery
 * Maintains strict 5-column grid layout as required
 */

// Define the hydroponic gallery images
const hydroponicImages = [
    getAssetUrl("hydroponic/JPEG/JPEG/01.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/02.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/03.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/04.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/05.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/06.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/07.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/08.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/09.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/10.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/11.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/12.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/13.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/14.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/15.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/16.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/17.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/18.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/19.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/20.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/21.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/22.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/23.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/24.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/25.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/26.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/27.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/28.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/29.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/30.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/31.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/32.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/33.jpeg"),
    getAssetUrl("hydroponic/JPEG/JPEG/34.jpg"),
    getAssetUrl("hydroponic/JPEG/JPEG/35.jpg")
];

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initHydroponicGallery();
});

function initHydroponicGallery() {
    // Check if gallery container exists
    const gallery = document.getElementById("hydroponicGallery");
    if (!gallery) {
        console.warn("Hydroponic gallery container not found");
        return;
    }
    
    // Skip if already initialized
    if (gallery.classList.contains("initialized")) {
        console.log("Hydroponic gallery already initialized, skipping");
        return;
    }
    
    console.log("Initializing Hydroponic gallery with images from 01-35");
    
    // Use the common gallery manager if available
    if (window.galleryManager) {
        // Initialize the gallery with the common gallery manager
        window.galleryManager.initializeGallery("hydroponicGallery", hydroponicImages, {
            columns: 5, // Ensure 5-column layout as required
            showNumbers: true,
            fadeIn: true
        });
        
        // Mark as initialized
        gallery.classList.add("initialized");
        console.log("Hydroponic gallery initialized with common gallery manager");
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
        this.src = getAssetUrl("placeholder.jpg");
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
