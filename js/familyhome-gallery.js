// Family Home Gallery Initialization
document.addEventListener("DOMContentLoaded", function() {
    initFamilyHomeGallery();
});

// Initialize the Family Home Gallery
function initFamilyHomeGallery() {
    const galleryContainer = document.getElementById("familyHomeGallery");
    if (!galleryContainer) {
        console.error("Family Home Gallery container not found");
        return;
    }

    // Define the image paths for the Family Home Gallery (2inspiration photos)
    const images = [
        // 2inspiration folder (10 images) - note the leading zeros in filenames
        getAssetUrl("realestate/JPEG/2inspiration/01.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/02.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/03.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/04.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/05.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/06.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/07.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/08.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/09.jpg"),
        getAssetUrl("realestate/JPEG/2inspiration/10.jpg")
    ];

    // Use the common gallery manager if available
    if (window.galleryManager) {
        window.galleryManager.initializeGallery("familyHomeGallery", images, {
            columns: 5, // Ensure 5-column grid layout
            showNumbers: true,
            fadeIn: true
        });
    } else {
        // Fallback to manual initialization if gallery manager is not available
        manualInitGallery(galleryContainer, images);
    }
}

// Manual gallery initialization as a fallback
function manualInitGallery(container, images) {
    // Clear any existing content
    container.innerHTML = "";
    
    // Create gallery items for each image
    images.forEach((imagePath, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `Family Home Image ${index + 1}`;
        img.className = "gallery-item-img";
        img.loading = "lazy";
        
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
            this.src = getAssetUrl("placeholder.jpg"); // Fallback image
        };
        
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = index + 1;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(imageNumber);
        
        // Add click event for modal view
        galleryItem.addEventListener("click", function() {
            openImageModal(imagePath, index, images);
        });
        
        container.appendChild(galleryItem);
    });
}

// Open image in modal view
function openImageModal(imagePath, index, allImages) {
    // Check if modal container exists, create if not
    let modalContainer = document.getElementById("gallery-modal-container");
    if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.id = "gallery-modal-container";
        modalContainer.className = "gallery-modal-container";
        document.body.appendChild(modalContainer);
        
        // Create modal content
        const modalContent = document.createElement("div");
        modalContent.className = "gallery-modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "gallery-modal-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = closeModal;
        
        const modalImage = document.createElement("img");
        modalImage.id = "gallery-modal-image";
        
        const prevBtn = document.createElement("a");
        prevBtn.className = "gallery-modal-prev";
        prevBtn.innerHTML = "&#10094;";
        prevBtn.onclick = () => navigateModal(-1);
        
        const nextBtn = document.createElement("a");
        nextBtn.className = "gallery-modal-next";
        nextBtn.innerHTML = "&#10095;";
        nextBtn.onclick = () => navigateModal(1);
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalImage);
        modalContent.appendChild(prevBtn);
        modalContent.appendChild(nextBtn);
        
        modalContainer.appendChild(modalContent);
    }
    
    // Set current image index and update modal
    window.currentModalIndex = index;
    window.modalImages = allImages;
    updateModalImage();
    
    // Show modal
    modalContainer.style.display = "flex";
    
    // Add keyboard navigation
    document.addEventListener("keydown", handleModalKeydown);
}

// Update modal image based on current index
function updateModalImage() {
    const modalImage = document.getElementById("gallery-modal-image");
    if (modalImage) {
        modalImage.src = window.modalImages[window.currentModalIndex];
    }
}

// Navigate through images in modal
function navigateModal(step) {
    window.currentModalIndex = (window.currentModalIndex + step + window.modalImages.length) % window.modalImages.length;
    updateModalImage();
}

// Close modal
function closeModal() {
    const modalContainer = document.getElementById("gallery-modal-container");
    if (modalContainer) {
        modalContainer.style.display = "none";
        document.removeEventListener("keydown", handleModalKeydown);
    }
}

// Handle keyboard navigation in modal
function handleModalKeydown(event) {
    if (event.key === "ArrowLeft") {
        navigateModal(-1);
    } else if (event.key === "ArrowRight") {
        navigateModal(1);
    } else if (event.key === "Escape") {
        closeModal();
    }
}
