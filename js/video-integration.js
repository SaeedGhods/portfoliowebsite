// Video Integration Script - Adds YouTube video to Tesla North Hollywood gallery
// Version: 2025-03-16 19:38

document.addEventListener("DOMContentLoaded", function() {
    console.log("Video integration script loaded - v=" + Date.now());
    
    // Function to add YouTube video to Tesla North Hollywood gallery
    function addYouTubeVideo() {
        // Get the Tesla North Hollywood gallery container
        const galleryContainer = document.getElementById("teslaNorthHollywoodGallery");
        if (!galleryContainer) {
            console.error("Tesla North Hollywood gallery container not found, will retry in 500ms");
            setTimeout(addYouTubeVideo, 500);
            return;
        }
        
        // Check if video tile already exists
        if (document.querySelector(".video-tile-added")) {
            console.log("Video tile already added, skipping");
            return;
        }
        
        console.log("Adding YouTube video tile to Tesla North Hollywood gallery");
        
        // Create a gallery item for the video that matches the image styling
        const videoItem = document.createElement("div");
        videoItem.className = "gallery-item video-tile-added";
        videoItem.style.position = "relative";
        videoItem.style.width = "100%";
        videoItem.style.paddingBottom = "100%";
        videoItem.style.overflow = "hidden";
        videoItem.style.cursor = "pointer";
        
        // Create the thumbnail image with cache busting
        const thumbnail = document.createElement("img");
        // Use a custom high-quality thumbnail image of Tesla North Hollywood store
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
        
        // Fallback if custom thumbnail fails to load
        thumbnail.onerror = function() {
            console.error("Failed to load custom thumbnail, trying YouTube thumbnail");
            thumbnail.src = "https://img.youtube.com/vi/bf9sEwANkyY/maxresdefault.jpg?v=" + Date.now();
            
            // Second fallback if YouTube thumbnail also fails
            thumbnail.onerror = function() {
                console.error("Failed to load YouTube thumbnail, trying alternate URL");
                thumbnail.src = "https://img.youtube.com/vi/bf9sEwANkyY/hqdefault.jpg?v=" + Date.now();
            };
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
        videoNumber.textContent = "5"; // Assuming there are 4 images already
        videoNumber.style.position = "absolute";
        videoNumber.style.bottom = "5px";
        videoNumber.style.left = "10px";
        videoNumber.style.color = "white";
        videoNumber.style.padding = "2px 6px";
        videoNumber.style.fontSize = "12px";
        videoNumber.style.zIndex = "2";
        videoNumber.style.transition = "opacity 0.3s ease";
        videoNumber.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.7)";
        videoNumber.style.background = "none";
        
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
        
        // Add the video item to the gallery
        galleryContainer.appendChild(videoItem);
        
        console.log("YouTube video tile added to Tesla North Hollywood gallery");
    }
    
    // Try to add the video immediately
    addYouTubeVideo();
    
    // Also try with a delay to ensure the gallery is fully loaded
    setTimeout(addYouTubeVideo, 1000);
    setTimeout(addYouTubeVideo, 2000);
    setTimeout(addYouTubeVideo, 3000);
});
