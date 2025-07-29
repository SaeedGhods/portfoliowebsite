// Real Estate License Gallery Initialization
document.addEventListener("DOMContentLoaded", function() {
    console.log("Real Estate Gallery script loaded");
    initRealEstateGallery();
});

// Initialize the Real Estate License Gallery
function initRealEstateGallery() {
    console.log("Initializing Real Estate Gallery...");
    const galleryContainer = document.getElementById("trumanGallery");
    if (!galleryContainer) {
        console.error("Real Estate Gallery container #trumanGallery not found");
        return;
    }
    
    console.log("Found trumanGallery container:", galleryContainer);

    // Define the image paths for the Real Estate License Gallery in the requested order (29hp, 17t)
    const images = [
        // 29hp folder (10 images)
        getAssetUrl("realestate/JPEG/29hp/1.jpg"),
        getAssetUrl("realestate/JPEG/29hp/2.jpg"),
        getAssetUrl("realestate/JPEG/29hp/3.jpg"),
        getAssetUrl("realestate/JPEG/29hp/4.jpg"),
        getAssetUrl("realestate/JPEG/29hp/5.jpg"),
        getAssetUrl("realestate/JPEG/29hp/6.jpg"),
        getAssetUrl("realestate/JPEG/29hp/7.jpg"),
        getAssetUrl("realestate/JPEG/29hp/8.jpg"),
        getAssetUrl("realestate/JPEG/29hp/9.jpg"),
        getAssetUrl("realestate/JPEG/29hp/10.jpg"),
        
        // 17t folder (10 images) - updated to use zero-padded filenames
        getAssetUrl("realestate/JPEG/17t/01.jpg"),
        getAssetUrl("realestate/JPEG/17t/02.jpg"),
        getAssetUrl("realestate/JPEG/17t/03.jpg"),
        getAssetUrl("realestate/JPEG/17t/04.jpg"),
        getAssetUrl("realestate/JPEG/17t/05.jpg"),
        getAssetUrl("realestate/JPEG/17t/06.jpg"),
        getAssetUrl("realestate/JPEG/17t/07.jpg"),
        getAssetUrl("realestate/JPEG/17t/08.jpg"),
        getAssetUrl("realestate/JPEG/17t/09.jpg"),
        getAssetUrl("realestate/JPEG/17t/10.jpg")
    ];
    
    console.log("Prepared image paths:", images.length, "images");

    // Use the common gallery manager if available
    if (window.galleryManager) {
        console.log("Using gallery manager to initialize gallery");
        window.galleryManager.initializeGallery("trumanGallery", images, {
            columns: 5, // Ensure 5-column grid layout
            showNumbers: true,
            fadeIn: true
        });
        console.log("Gallery initialization complete");
    } else {
        console.warn("Gallery manager not available, falling back to manual initialization");
        // Fallback to manual initialization if gallery manager is not available
        manualInitGallery(galleryContainer, images);
    }
}

// Manual gallery initialization as a fallback
function manualInitGallery(container, images) {
    console.log("Manually initializing gallery with", images.length, "images");
    // Clear any existing content
    container.innerHTML = "";
    
    // Create gallery items for each image
    images.forEach((imagePath, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `Real Estate Image ${index + 1}`;
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
        console.log(`Added image ${index + 1}: ${imagePath}`);
    });
    
    console.log("Manual gallery initialization complete");
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
        modalImage.loading = "lazy";
        
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
    
    console.log("Modal opened with image:", imagePath);
}

// Update modal image based on current index
function updateModalImage() {
    const modalImage = document.getElementById("gallery-modal-image");
    if (modalImage) {
        modalImage.src = window.modalImages[window.currentModalIndex];
        console.log("Updated modal image:", modalImage.src);
    }
}

// Navigate through images in modal
function navigateModal(step) {
    window.currentModalIndex = (window.currentModalIndex + step + window.modalImages.length) % window.modalImages.length;
    updateModalImage();
    console.log("Navigated to image:", window.currentModalIndex + 1);
}

// Close modal
function closeModal() {
    const modalContainer = document.getElementById("gallery-modal-container");
    if (modalContainer) {
        modalContainer.style.display = "none";
        document.removeEventListener("keydown", handleModalKeydown);
        console.log("Modal closed");
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
    console.log("Handled keyboard event:", event.key);
}
