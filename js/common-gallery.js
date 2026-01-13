/**
 * Common Gallery JavaScript
 * This script provides shared functionality for all galleries including:
 * - Loading indicators
 * - Image modal for full-size viewing
 * - Keyboard navigation support
 * - Error handling for failed image loads
 */

class GalleryManager {
    constructor() {
        // Create modal elements once for all galleries
        this.createModal();
        
        // Track loaded galleries to avoid re-initialization
        this.initializedGalleries = new Set();
        
        // Track current modal state
        this.currentImages = null;
        this.currentIndex = 0;
        this.isModalActive = false;
        
        // Bind keyboard event listeners
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        
        // Track loading state
        this.loadingGalleries = new Set();
    }
    
    /**
     * Create the modal elements for full-size image viewing
     */
    createModal() {
        try {
            // Create modal container
            this.modal = document.createElement("div");
            this.modal.className = "gallery-modal";
            
            // Create modal content
            const modalContent = document.createElement("div");
            modalContent.className = "gallery-modal-content";
            
            // Create close button
            const closeBtn = document.createElement("div");
            closeBtn.className = "gallery-modal-close";
            closeBtn.innerHTML = "&times;";
            closeBtn.addEventListener("click", () => this.closeModal());
            
            // Create image element
            this.modalImg = document.createElement("img");
            this.modalImg.className = "gallery-modal-img";
            
            // Add loading indicator for modal image
            this.modalLoading = document.createElement("div");
            this.modalLoading.className = "gallery-modal-loading";
            this.modalLoading.innerHTML = "<div class=\"gallery-spinner\"></div>";
            
            // Add error message for modal image
            this.modalError = document.createElement("div");
            this.modalError.className = "gallery-modal-error";
            this.modalError.textContent = "Failed to load image";
            this.modalError.style.display = "none";
            
            // Create navigation buttons
            const navContainer = document.createElement("div");
            navContainer.className = "gallery-modal-nav";
            
            this.prevBtn = document.createElement("div");
            this.prevBtn.className = "gallery-modal-prev";
            this.prevBtn.innerHTML = "&#10094;";
            this.prevBtn.addEventListener("click", () => this.showPrevImage());
            
            this.nextBtn = document.createElement("div");
            this.nextBtn.className = "gallery-modal-next";
            this.nextBtn.innerHTML = "&#10095;";
            this.nextBtn.addEventListener("click", () => this.showNextImage());
            
            // Add image counter
            this.imageCounter = document.createElement("div");
            this.imageCounter.className = "gallery-modal-counter";
            
            // Assemble modal
            navContainer.appendChild(this.prevBtn);
            navContainer.appendChild(this.nextBtn);
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(this.modalImg);
            modalContent.appendChild(this.modalLoading);
            modalContent.appendChild(this.modalError);
            modalContent.appendChild(navContainer);
            modalContent.appendChild(this.imageCounter);
            this.modal.appendChild(modalContent);
            
            // Add to document
            document.body.appendChild(this.modal);
            
            // Add touch swipe support for mobile
            this.addTouchSupport();
        } catch (error) {
            console.error("Error creating gallery modal:", error);
        }
    }
    
    /**
     * Add touch support for mobile devices
     */
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.modal.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.modal.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    /**
     * Handle swipe gestures
     */
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        if (!this.isModalActive) return;
        
        if (endX < startX - swipeThreshold) {
            // Swipe left - show next image
            this.showNextImage();
        } else if (endX > startX + swipeThreshold) {
            // Swipe right - show previous image
            this.showPrevImage();
        }
    }
    
    /**
     * Initialize a gallery with loading indicators and modal support
     * @param {string} galleryId - The ID of the gallery container
     * @param {Array} images - Array of image paths
     */
    initializeGallery(galleryId, images) {
        try {
            // Skip if already initialized or currently loading
            if (this.initializedGalleries.has(galleryId) || this.loadingGalleries.has(galleryId)) {
                console.log(`Gallery ${galleryId} already initialized or loading, skipping`);
                return;
            }
            
            // Mark as loading
            this.loadingGalleries.add(galleryId);
            
            console.log(`Initializing gallery ${galleryId} with ${images.length} images`);
            
            const galleryContainer = document.getElementById(galleryId);
            if (!galleryContainer) {
                console.warn(`Gallery container #${galleryId} not found`);
                this.loadingGalleries.delete(galleryId);
                return;
            }
            
            // Clear any existing content
            galleryContainer.innerHTML = "";
            
            // If no images, just mark as initialized and return
            if (!images || images.length === 0) {
                console.log(`Gallery ${galleryId} has no images, marking as initialized`);
                galleryContainer.style.opacity = "1";
                this.initializedGalleries.add(galleryId);
                this.loadingGalleries.delete(galleryId);
                return;
            }
            
            // Add loading indicator
            const loadingIndicator = document.createElement("div");
            loadingIndicator.className = "gallery-loading";
            loadingIndicator.innerHTML = "<div class=\"gallery-spinner\"></div>";
            galleryContainer.appendChild(loadingIndicator);
            
            // Track loaded images
            let loadedImages = 0;
            let errorImages = 0;
            const totalImages = images.length;
            
            console.log(`Creating ${totalImages} gallery items for ${galleryId}`);
            
            // Helper function to handle image loading completion
            const handleImageLoaded = () => {
                loadedImages++;
                console.log(`Image loaded for ${galleryId}: ${loadedImages}/${totalImages}`);
                checkAllImagesLoaded();
            };
            
            // Helper function to handle image loading errors
            const handleImageError = (src) => {
                errorImages++;
                console.error(`Failed to load image for ${galleryId}: ${src}`);
                checkAllImagesLoaded();
            };
            
            // Helper function to check if all images are loaded
            const checkAllImagesLoaded = () => {
                if (loadedImages + errorImages === totalImages) {
                    console.log(`All images processed for ${galleryId}, loaded: ${loadedImages}, errors: ${errorImages}`);
                    // Hide loading indicator when all images are loaded
                    loadingIndicator.classList.add("hidden");
                    setTimeout(() => {
                        loadingIndicator.remove();
                        // Add fade-in effect
                        galleryContainer.style.opacity = "1";
                    }, 500);
                    
                    // Mark as initialized and not loading
                    this.initializedGalleries.add(galleryId);
                    this.loadingGalleries.delete(galleryId);
                }
            };
            
            // Create gallery items
            images.forEach((src, index) => {
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item";
                
                const img = document.createElement("img");
                img.alt = `Gallery Image ${index + 1}`;
                img.loading = "lazy";
                
                // Add load event
                img.onload = handleImageLoaded;
                
                // Add error handling
                img.onerror = () => {
                    console.error(`Gallery thumbnail failed to load: ${src}`);
                    console.error(`Thumbnail naturalWidth: ${img.naturalWidth}, naturalHeight: ${img.naturalHeight}`);
                    console.error(`Browser: ${navigator.userAgent.split(' ').pop()}`);
                    console.error(`Possible causes: Image file missing at S3 path, wrong file extension, or network error`);
                    console.error(`Setting fallback to placeholder`);
                    img.src = getAssetUrl("placeholder-image.jpg"); // Fallback image
                    handleImageError(src);
                };
                
                // Set source after adding event listeners
                img.src = src;
                
                // Add image number
                const imageNumber = document.createElement("div");
                imageNumber.className = "image-number";
                imageNumber.textContent = index + 1;
                
                // Add click event for modal
                galleryItem.addEventListener("click", () => {
                    this.openModal(images, index);
                });
                
                // Assemble gallery item
                galleryItem.appendChild(img);
                galleryItem.appendChild(imageNumber);
                galleryContainer.appendChild(galleryItem);
            });
        } catch (error) {
            console.error(`Error initializing gallery ${galleryId}:`, error);
            this.loadingGalleries.delete(galleryId);
        }
    }
    
    /**
     * Open the modal with the selected image
     * @param {Array} images - Array of image paths
     * @param {number} index - Index of the image to show
     */
    openModal(images, index) {
        try {
            this.currentImages = images;
            this.currentIndex = index;
            this.isModalActive = true;
            
            // Show loading indicator
            this.modalLoading.style.display = "flex";
            this.modalError.style.display = "none";
            this.modalImg.style.display = "none";
            
            // Set image source
            this.modalImg.onload = () => {
                this.modalLoading.style.display = "none";
                this.modalImg.style.display = "block";
            };
            
            this.modalImg.onerror = () => {
                console.error(`Modal image failed to load: ${images[index]}`);
                console.error(`Modal image naturalWidth: ${this.modalImg.naturalWidth}, naturalHeight: ${this.modalImg.naturalHeight}`);
                this.modalLoading.style.display = "none";
                this.modalError.style.display = "flex";
            };
            
            this.modalImg.src = images[index];
            
            // Update counter
            this.updateImageCounter();
            
            // Show modal
            this.modal.classList.add("active");
            
            // Prevent scrolling on body
            document.body.style.overflow = "hidden";
        } catch (error) {
            console.error("Error opening modal:", error);
        }
    }
    
    /**
     * Update the image counter in the modal
     */
    updateImageCounter() {
        if (this.imageCounter && this.currentImages) {
            this.imageCounter.textContent = `${this.currentIndex + 1} / ${this.currentImages.length}`;
        }
    }
    
    /**
     * Close the modal
     */
    closeModal() {
        this.modal.classList.remove("active");
        document.body.style.overflow = "";
        this.isModalActive = false;
    }
    
    /**
     * Show the next image in the modal
     */
    showNextImage() {
        if (!this.currentImages || !this.isModalActive) return;
        
        // Show loading indicator
        this.modalLoading.style.display = "flex";
        this.modalError.style.display = "none";
        this.modalImg.style.display = "none";
        
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        
        // Set image source
        this.modalImg.onload = () => {
            this.modalLoading.style.display = "none";
            this.modalImg.style.display = "block";
        };
        
        this.modalImg.onerror = () => {
            this.modalLoading.style.display = "none";
            this.modalError.style.display = "flex";
        };
        
        this.modalImg.src = this.currentImages[this.currentIndex];
        this.updateImageCounter();
    }
    
    /**
     * Show the previous image in the modal
     */
    showPrevImage() {
        if (!this.currentImages || !this.isModalActive) return;
        
        // Show loading indicator
        this.modalLoading.style.display = "flex";
        this.modalError.style.display = "none";
        this.modalImg.style.display = "none";
        
        this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
        
        // Set image source
        this.modalImg.onload = () => {
            this.modalLoading.style.display = "none";
            this.modalImg.style.display = "block";
        };
        
        this.modalImg.onerror = () => {
            this.modalLoading.style.display = "none";
            this.modalError.style.display = "flex";
        };
        
        this.modalImg.src = this.currentImages[this.currentIndex];
        this.updateImageCounter();
    }
    
    /**
     * Handle keyboard events for modal navigation
     */
    handleKeyDown(e) {
        if (!this.isModalActive) return;
        
        switch (e.key) {
            case "Escape":
                this.closeModal();
                break;
            case "ArrowLeft":
                this.showPrevImage();
                break;
            case "ArrowRight":
                this.showNextImage();
                break;
        }
    }
}

// Create a single instance to be used by all galleries
const galleryManager = new GalleryManager();

// Tesla North Hollywood Gallery images
const teslaNorthHollywoodImages = [
    getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 00.JPG"),
    getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 01.JPG"),
    getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 09.JPG"),
    getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 13.JPG")
];

// Model X Fiancé Gallery images
const modelXFianceImages = [
    getAssetUrl("modelxfiance/IMG_5326.jpg")
];

// Giga Austin Gallery images
const gigaAustinImages = [
    // Commented out to avoid conflict with gigaaustin-gallery.js
    // These images are now loaded from gigaaustin-gallery.js with the 01.jpg to 19.jpg format
    /*
    getAssetUrl('gigaaustin/JPEG/202412070941.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071102.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071313.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071319.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071322.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071419.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071443.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412071903.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080240.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080500.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080511.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080641.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080654.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080656.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080701.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080932.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412080948.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081001.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081017.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081309.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081310.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081312.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412081723.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412090810.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091002.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091012.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091020.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091143.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091144.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091145.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091149.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412091155.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412092020.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412100621.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412100630.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412101015.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412101342.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412101346.jpg'),
    getAssetUrl('gigaaustin/JPEG/202412110742.jpg')
    */
];

// 19 Wedgewood Renovation Gallery images
const wwrenoImages = [];

// Hydroponic Gallery images
const hydroponicImages = [
    getAssetUrl("hydroponic/JPEG/01.jpg"),
    getAssetUrl("hydroponic/JPEG/02.jpg"),
    getAssetUrl("hydroponic/JPEG/03.jpg"),
    getAssetUrl("hydroponic/JPEG/04.jpg"),
    getAssetUrl("hydroponic/JPEG/05.jpg"),
    getAssetUrl("hydroponic/JPEG/06.jpg"),
    getAssetUrl("hydroponic/JPEG/07.jpg"),
    getAssetUrl("hydroponic/JPEG/08.jpg"),
    getAssetUrl("hydroponic/JPEG/09.jpg"),
    getAssetUrl("hydroponic/JPEG/10.jpg"),
    getAssetUrl("hydroponic/JPEG/11.jpg"),
    getAssetUrl("hydroponic/JPEG/12.jpg"),
    getAssetUrl("hydroponic/JPEG/13.jpg"),
    getAssetUrl("hydroponic/JPEG/14.jpg"),
    getAssetUrl("hydroponic/JPEG/15.jpg"),
    getAssetUrl("hydroponic/JPEG/16.jpg"),
    getAssetUrl("hydroponic/JPEG/17.jpg"),
    getAssetUrl("hydroponic/JPEG/18.jpg"),
    getAssetUrl("hydroponic/JPEG/19.jpg"),
    getAssetUrl("hydroponic/JPEG/20.jpg"),
    getAssetUrl("hydroponic/JPEG/21.jpg"),
    getAssetUrl("hydroponic/JPEG/22.jpg"),
    getAssetUrl("hydroponic/JPEG/23.jpg"),
    getAssetUrl("hydroponic/JPEG/24.jpg"),
    getAssetUrl("hydroponic/JPEG/25.jpg"),
    getAssetUrl("hydroponic/JPEG/26.jpg"),
    getAssetUrl("hydroponic/JPEG/27.jpg"),
    getAssetUrl("hydroponic/JPEG/28.jpg"),
    getAssetUrl("hydroponic/JPEG/29.jpg"),
    getAssetUrl("hydroponic/JPEG/30.jpg"),
    getAssetUrl("hydroponic/JPEG/31.jpg"),
    getAssetUrl("hydroponic/JPEG/32.jpg"),
    getAssetUrl("hydroponic/JPEG/33.jpg"),
    getAssetUrl("hydroponic/JPEG/34.jpg"),
    getAssetUrl("hydroponic/JPEG/35.jpg")
];

// Initialize galleries when DOM is loaded or immediately if already loaded
function initGalleries() {
    try {
        console.log("Initializing galleries...");
        
        // Check if gallery containers exist
        const teslaNorthHollywoodGallery = document.getElementById("teslaNorthHollywoodGallery");
        const modelXFianceGallery = document.getElementById("modelXFianceGallery");
        const gigaAustinGallery = document.getElementById("gigaAustinGallery");
        const wwrenoGallery = document.getElementById("wwrenoGallery");
        const ventGallery = document.getElementById("ventGallery");
        const weRobotGallery = document.getElementById("weRobotGallery");
        const trumanGallery = document.getElementById("trumanGallery");
        const hydroponicGallery = document.getElementById("hydroponicGallery");
        
        console.log("teslaNorthHollywoodGallery exists:", !!teslaNorthHollywoodGallery);
        console.log("modelXFianceGallery exists:", !!modelXFianceGallery);
        console.log("gigaAustinGallery exists:", !!gigaAustinGallery);
        console.log("wwrenoGallery exists:", !!wwrenoGallery);
        console.log("ventGallery exists:", !!ventGallery);
        console.log("weRobotGallery exists:", !!weRobotGallery);
        console.log("trumanGallery exists:", !!trumanGallery);
        console.log("hydroponicGallery exists:", !!hydroponicGallery);
        
        // Initialize galleries if they exist
        if (teslaNorthHollywoodGallery) {
            galleryManager.initializeGallery("teslaNorthHollywoodGallery", teslaNorthHollywoodImages);
        }
        
        if (modelXFianceGallery) {
            galleryManager.initializeGallery("modelXFianceGallery", modelXFianceImages);
        }
        
        // Skip Giga Austin Gallery initialization - now handled by gigaaustin-gallery.js
        /*
        if (gigaAustinGallery) {
            galleryManager.initializeGallery('gigaAustinGallery', gigaAustinImages);
        }
        */
        
        if (wwrenoGallery) {
            galleryManager.initializeGallery("wwrenoGallery", wwrenoImages);
        }
        
        // Note: VENT gallery is initialized by its own script (vent-gallery.js)
        // This is just a backup in case that script fails
        if (ventGallery && !ventGallery.classList.contains("initialized")) {
            console.log("Initializing VENT gallery from common-gallery.js");
            // The actual images are defined in vent-gallery.js
            // This is just a fallback
        }
        
        // Note: These galleries have their own initialization scripts
        // This is just a backup in case those scripts fail
        if (weRobotGallery && !weRobotGallery.classList.contains("initialized")) {
            console.log("Checking weRobotGallery initialization");
            // Ensure 5-column grid layout
            weRobotGallery.style.gridTemplateColumns = "repeat(5, 1fr) !important";
        }
        
        if (trumanGallery && !trumanGallery.classList.contains("initialized")) {
            console.log("Checking trumanGallery initialization");
            // Ensure 5-column grid layout
            trumanGallery.style.gridTemplateColumns = "repeat(5, 1fr) !important";
        }
        
        // Skip hydroponic gallery initialization - handled by hydroponic-gallery.js
        // if (hydroponicGallery && !hydroponicGallery.classList.contains("initialized")) {
        //     console.log("Initializing hydroponicGallery with common gallery manager");
        //     galleryManager.initializeGallery("hydroponicGallery", hydroponicImages);
        // }
        
        console.log("Galleries initialized");
    } catch (error) {
        console.error("Error initializing galleries:", error);
    }
}

// Expose the gallery manager to the global scope for other scripts to use
window.galleryManager = galleryManager;

// Initialize galleries when DOM is loaded or immediately if already loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGalleries);
} else {
    initGalleries();
}
