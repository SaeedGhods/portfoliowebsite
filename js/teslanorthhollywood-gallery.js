// Immediately execute the function with cache busting
(function() {
    // Force cache clearing for Tesla North Hollywood gallery
    console.log("Tesla North Hollywood Gallery script - CACHE BUSTER - v=" + Date.now());

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
    
    console.log("Gallery script executing immediately - version 2025-03-16 19:30");
    
    // Function to initialize the gallery
    function initTeslaNorthHollywoodGallery() {
        console.log("Initializing gallery");
        const galleryContainer = document.getElementById("teslaNorthHollywoodGallery");
        console.log("Gallery container:", galleryContainer);
        
        if (!galleryContainer) {
            console.log("Gallery container not found, will retry in 500ms");
            setTimeout(initTeslaNorthHollywoodGallery, 500);
            return;
        }
        
        // Check if gallery is already populated
        if (galleryContainer.children.length > 0) {
            console.log("Gallery already has items, not adding more");
            return;
        }

        // CRITICAL: Ensure the gallery container has the correct class and styles
        // This is a strict requirement per user memories
        galleryContainer.className = "gallery-container";
        galleryContainer.style.display = "grid";
        galleryContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
        galleryContainer.style.width = "62.5%";
        galleryContainer.style.gap = "0";

        const images = [
            getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 00.JPG"),
            getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 01.JPG"),
            getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 09.JPG"),
            getAssetUrl("teslanorthhollywood/2024-12-18_1700 NORTH HOLLYWOOD WES 13.JPG")
        ];

        console.log("Creating gallery with", images.length, "images and 1 video");
        
        // Create gallery items for images
        images.forEach((src, index) => {
            console.log("Creating gallery item for:", src);
            const galleryItem = document.createElement("div");
            galleryItem.className = "gallery-item";
            
            const img = document.createElement("img");
            // Add cache busting parameter to image URLs
            img.src = src + "?v=" + Date.now();
            img.alt = `Tesla North Hollywood Image ${index + 1}`;
            img.className = "project-gallery-image";
            img.loading = "lazy";
            
            // Add hover effect
            galleryItem.addEventListener("mouseenter", function() {
                img.style.filter = "saturate(1)";
            });
            
            galleryItem.addEventListener("mouseleave", function() {
                img.style.filter = "saturate(0.22)";
            });
            
            // Add error handling
            img.onerror = function() {
                console.error("Failed to load image:", src);
                // Try loading without cache busting as fallback
                img.src = src;
            };
            
            // Add load confirmation
            img.onload = function() {
                console.log("Successfully loaded image:", src);
            };
            
            const imageNumber = document.createElement("div");
            imageNumber.className = "image-number";
            imageNumber.textContent = index + 1;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(imageNumber);
            galleryContainer.appendChild(galleryItem);
            console.log("Added gallery item for image", index + 1);
            
            // Add click event to open modal
            galleryItem.addEventListener("click", function() {
                if (window.galleryManager) {
                    window.galleryManager.openModal(images, index);
                } else {
                    console.error("Gallery manager not found");
                }
            });
        });
        
        // Add YouTube video tile
        console.log("Adding YouTube video tile - " + Date.now());
        
        // Create a gallery item for the video that matches the image styling
        const videoItem = document.createElement("div");
        videoItem.className = "gallery-item video-tile";
        videoItem.style.position = "relative";
        videoItem.style.width = "100%";
        videoItem.style.paddingBottom = "100%";
        videoItem.style.overflow = "hidden";
        videoItem.style.cursor = "pointer";
        
        // Create the thumbnail image with cache busting
        const thumbnail = document.createElement("img");
        thumbnail.src = getAssetUrl("teslanorthhollywood/thumbnail.jpg?v=") + Date.now();
        thumbnail.alt = "Tesla North Hollywood Video";
        thumbnail.style.position = "absolute";
        thumbnail.style.top = "0";
        thumbnail.style.left = "0";
        thumbnail.style.width = "100%";
        thumbnail.style.height = "100%";
        thumbnail.style.objectFit = "cover";
        thumbnail.style.filter = "saturate(0.22)";
        thumbnail.style.transition = "filter 0.3s ease";
        thumbnail.loading = "lazy";
        
        // Fallback if YouTube thumbnail fails to load
        thumbnail.onerror = function() {
            console.error("Failed to load custom thumbnail, trying YouTube thumbnail");
            thumbnail.src = "https://img.youtube.com/vi/bf9sEwANkyY/maxresdefault.jpg?v=" + Date.now();
        };
        
        // Create a play button overlay
        const playButton = document.createElement("div");
        playButton.style.position = "absolute";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.width = "50px";
        playButton.style.height = "50px";
        playButton.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        playButton.style.borderRadius = "50%";
        playButton.style.display = "flex";
        playButton.style.alignItems = "center";
        playButton.style.justifyContent = "center";
        playButton.style.zIndex = "2";
        
        // Add play icon
        const playIcon = document.createElement("i");
        playIcon.className = "fas fa-play";
        playIcon.style.color = "white";
        playIcon.style.fontSize = "20px";
        playIcon.style.marginLeft = "4px"; // Center the play icon visually
        
        // Add video number (continuing from images)
        const videoNumber = document.createElement("div");
        videoNumber.className = "image-number";
        videoNumber.textContent = images.length + 1;
        videoNumber.style.position = "absolute";
        videoNumber.style.bottom = "5px";
        videoNumber.style.left = "10px";
        videoNumber.style.color = "white";
        videoNumber.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.7)";
        
        // Add hover effects
        videoItem.addEventListener("mouseenter", function() {
            thumbnail.style.filter = "saturate(1)";
            videoNumber.style.opacity = "0";
        });
        
        videoItem.addEventListener("mouseleave", function() {
            thumbnail.style.filter = "saturate(0.22)";
            videoNumber.style.opacity = "1";
        });
        
        // Add click event to open YouTube video
        videoItem.addEventListener("click", function() {
            console.log("Video tile clicked, opening YouTube video");
            
            // Create a modal for the video
            const videoModal = document.createElement("div");
            videoModal.style.position = "fixed";
            videoModal.style.top = "0";
            videoModal.style.left = "0";
            videoModal.style.width = "100%";
            videoModal.style.height = "100%";
            videoModal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            videoModal.style.display = "flex";
            videoModal.style.alignItems = "center";
            videoModal.style.justifyContent = "center";
            videoModal.style.zIndex = "9999";
            
            // Create iframe for YouTube video
            const iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/bf9sEwANkyY?start=2222&autoplay=1&v=" + Date.now();
            iframe.style.width = "80%";
            iframe.style.height = "80%";
            iframe.style.maxWidth = "1200px";
            iframe.style.maxHeight = "675px";
            iframe.style.border = "none";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            // Close button
            const closeButton = document.createElement("div");
            closeButton.innerHTML = "&times;";
            closeButton.style.position = "absolute";
            closeButton.style.top = "20px";
            closeButton.style.right = "30px";
            closeButton.style.color = "white";
            closeButton.style.fontSize = "40px";
            closeButton.style.cursor = "pointer";
            closeButton.style.zIndex = "10000";
            
            closeButton.addEventListener("click", function() {
                document.body.removeChild(videoModal);
            });
            
            // Close modal when clicking outside the video
            videoModal.addEventListener("click", function(e) {
                if (e.target === videoModal) {
                    document.body.removeChild(videoModal);
                }
            });
            
            videoModal.appendChild(iframe);
            videoModal.appendChild(closeButton);
            document.body.appendChild(videoModal);
        });
        
        // Assemble the video item
        playButton.appendChild(playIcon);
        videoItem.appendChild(thumbnail);
        videoItem.appendChild(playButton);
        videoItem.appendChild(videoNumber);
        galleryContainer.appendChild(videoItem);
        
        console.log("Added video tile to gallery");
        
        // Make the gallery visible
        galleryContainer.style.opacity = "1";
        
        console.log("Gallery initialization complete");
    }
    
    // Try to initialize immediately
    initTeslaNorthHollywoodGallery();
    
    // Also try when DOM is loaded (as a fallback)
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTeslaNorthHollywoodGallery);
    }
    
    // Final fallback with a delay
    setTimeout(initTeslaNorthHollywoodGallery, 1000);
})();

// Function to open an image modal
function openImageModal(imagePath, index, images) {
    const modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    
    const modalImg = document.createElement("img");
    modalImg.src = imagePath;
    modalImg.style.maxWidth = "90%";
    modalImg.style.maxHeight = "90%";
    modalImg.style.objectFit = "contain";
    modalImg.loading = "lazy";
    
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "30px";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    
    closeBtn.addEventListener("click", function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// Function to open a video modal
function openVideoModal(videoId, startTime) {
    const modal = document.createElement("div");
    modal.className = "video-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&v=${Date.now()}`;
    iframe.style.width = "80%";
    iframe.style.height = "80%";
    iframe.style.maxWidth = "1200px";
    iframe.style.maxHeight = "675px";
    iframe.style.border = "none";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "30px";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    
    closeBtn.addEventListener("click", function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    modal.appendChild(iframe);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// Initialize the gallery when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing Tesla North Hollywood Gallery");
    initTeslaNorthHollywoodGallery();
});

// Also initialize on window load to ensure all resources are loaded
window.addEventListener("load", function() {
    console.log("Window loaded, ensuring Tesla North Hollywood Gallery is initialized");
    initTeslaNorthHollywoodGallery();
});
