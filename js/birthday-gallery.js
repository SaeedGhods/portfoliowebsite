/**
 * Birthday Gallery
 * Follows the strict 5-column grid layout requirement
 * Version: 2025-03-17
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Birthday Gallery script loaded");
    initBirthdayGallery();
});

function initBirthdayGallery() {
    const galleryContainer = document.getElementById("birthdayGallery");
    if (!galleryContainer) {
        console.error("Birthday gallery container not found");
        return;
    }

    console.log("Initializing Birthday Gallery");

    // List of Birthday images
    const images = [
        getAssetUrl("birthday/JPEG/19920531.jpg"),
        getAssetUrl("birthday/JPEG/19920200-02.jpeg")
    ];

    // If the gallery manager exists, use it for consistency with other galleries
    if (window.galleryManager) {
        // Initialize the gallery with the common gallery manager
        window.galleryManager.initializeGallery("birthdayGallery", images, {
            columns: 5, // Ensure 5-column layout as required
            showNumbers: true,
            fadeIn: true
        });
        return;
    }

    // Fallback implementation if gallery manager doesn't exist
    galleryContainer.style.opacity = "0";
    
    // Clear any existing content
    galleryContainer.innerHTML = "";
    
    // Create loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "gallery-loading";
    loadingIndicator.innerHTML = "<div class=\"spinner\"></div><p>Loading images...</p>";
    galleryContainer.appendChild(loadingIndicator);
    
    // Track loading progress
    let loadedCount = 0;
    const totalImages = images.length;
    
    // Function to check if all images are loaded
    const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
            // Remove loading indicator
            galleryContainer.removeChild(loadingIndicator);
            
            // Show gallery with fade-in effect
            galleryContainer.style.opacity = "1";
        }
    };
    
    // Create and append gallery items
    images.forEach((src, index) => {
        // Create gallery item container
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        
        // Create image element
        const img = document.createElement("img");
        img.className = "gallery-item-img";
        img.alt = `Birthday photo ${index + 1}`;
        img.dataset.index = index;
        img.loading = "lazy";
        
        // Handle image loading
        img.onload = checkAllLoaded;
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            img.src = getAssetUrl("placeholder.jpg"); // Fallback image
            checkAllLoaded();
        };
        
        // Set image source
        img.src = src;
        
        // Add image number
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = (index + 1).toString();
        
        // Append elements to gallery item
        galleryItem.appendChild(img);
        galleryItem.appendChild(imageNumber);
        
        // Add click handler for opening modal
        galleryItem.addEventListener("click", () => {
            openModal(images, index);
        });
        
        // Append gallery item to container
        galleryContainer.appendChild(galleryItem);
    });
}

// Modal functionality (if gallery manager doesn't exist)
let modalElement = null;
let currentImages = null;
let currentIndex = 0;

function openModal(images, index) {
    // If gallery manager exists, use it
    if (window.galleryManager) {
        window.galleryManager.openModal(images, index);
        return;
    }
    
    // Otherwise use fallback implementation
    currentImages = images;
    currentIndex = index;
    
    // Create modal if it doesn't exist
    if (!modalElement) {
        modalElement = document.createElement("div");
        modalElement.className = "gallery-modal";
        modalElement.innerHTML = `
            <div class="modal-content">
                <img id="modal-image" src="" alt="Full size image">
                <button class="modal-close">&times;</button>
                <button class="modal-prev">&lt;</button>
                <button class="modal-next">&gt;</button>
            </div>
        `;
        
        // Add event listeners
        modalElement.querySelector(".modal-close").addEventListener("click", closeModal);
        modalElement.querySelector(".modal-prev").addEventListener("click", showPrevImage);
        modalElement.querySelector(".modal-next").addEventListener("click", showNextImage);
        
        // Add keyboard navigation
        document.addEventListener("keydown", handleKeyDown);
        
        // Add modal to document
        document.body.appendChild(modalElement);
    }
    
    // Show modal and current image
    modalElement.style.display = "flex";
    showImage(index);
}

function showImage(index) {
    if (!currentImages || !modalElement) return;
    
    currentIndex = index;
    const imgElement = modalElement.querySelector("#modal-image");
    imgElement.src = currentImages[index];
}

function showPrevImage() {
    if (!currentImages) return;
    
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
}

function showNextImage() {
    if (!currentImages) return;
    
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
}

function closeModal() {
    if (modalElement) {
        modalElement.style.display = "none";
    }
}

function handleKeyDown(e) {
    if (!modalElement || modalElement.style.display === "none") return;
    
    switch (e.key) {
        case "ArrowLeft":
            showPrevImage();
            break;
        case "ArrowRight":
            showNextImage();
            break;
        case "Escape":
            closeModal();
            break;
    }
}
