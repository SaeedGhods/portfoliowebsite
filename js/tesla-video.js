// Add YouTube video to Tesla North Hollywood gallery
document.addEventListener("DOMContentLoaded", function() {
    // Wait for the gallery to be initialized
    setTimeout(function() {
        const galleryContainer = document.getElementById("teslaNorthHollywoodGallery");
        if (!galleryContainer) return;
        
        // Create video gallery item
        const videoItem = document.createElement("div");
        videoItem.className = "gallery-item";
        
        // Create thumbnail container
        const thumbnailContainer = document.createElement("div");
        thumbnailContainer.style.position = "relative";
        thumbnailContainer.style.width = "100%";
        thumbnailContainer.style.height = "100%";
        
        // Create thumbnail image
        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = "https://img.youtube.com/vi/bf9sEwANkyY/maxresdefault.jpg";
        thumbnailImg.alt = "Tesla North Hollywood Video";
        thumbnailImg.className = "project-gallery-image";
        thumbnailImg.style.filter = "saturate(0.22)";
        thumbnailImg.style.transition = "filter 0.3s ease";
        thumbnailImg.style.transform = "scale(1.02)";
        thumbnailImg.style.objectFit = "cover";
        
        // Create play button
        const playButton = document.createElement("div");
        playButton.style.position = "absolute";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.width = "60px";
        playButton.style.height = "60px";
        playButton.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        playButton.style.borderRadius = "50%";
        playButton.style.display = "flex";
        playButton.style.justifyContent = "center";
        playButton.style.alignItems = "center";
        playButton.style.zIndex = "2";
        playButton.innerHTML = "<svg viewBox=\"0 0 24 24\" style=\"width: 30px; height: 30px;\"><path fill=\"#fff\" d=\"M8 5v14l11-7z\"></path></svg>";
        
        // Create image number
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = "5";
        
        // Add hover effects
        videoItem.addEventListener("mouseenter", function() {
            thumbnailImg.style.filter = "saturate(1)";
        });
        
        videoItem.addEventListener("mouseleave", function() {
            thumbnailImg.style.filter = "saturate(0.22)";
        });
        
        // Add click event to open video modal
        videoItem.addEventListener("click", function() {
            openVideoModal();
        });
        
        // Append elements
        thumbnailContainer.appendChild(thumbnailImg);
        thumbnailContainer.appendChild(playButton);
        videoItem.appendChild(thumbnailContainer);
        videoItem.appendChild(imageNumber);
        
        // Add to gallery
        galleryContainer.appendChild(videoItem);
        
        // Create video modal
        const videoModal = document.createElement("div");
        videoModal.id = "videoModal";
        videoModal.style.display = "none";
        videoModal.style.position = "fixed";
        videoModal.style.top = "0";
        videoModal.style.left = "0";
        videoModal.style.width = "100%";
        videoModal.style.height = "100%";
        videoModal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        videoModal.style.zIndex = "1000";
        videoModal.style.display = "none";
        videoModal.style.justifyContent = "center";
        videoModal.style.alignItems = "center";
        
        const modalContent = document.createElement("div");
        modalContent.style.position = "relative";
        modalContent.style.width = "80%";
        modalContent.style.maxWidth = "1200px";
        
        const iframe = document.createElement("iframe");
        iframe.id = "youtubeIframe";
        iframe.width = "100%";
        iframe.height = "675";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        const closeButton = document.createElement("div");
        closeButton.innerHTML = "&times;";
        closeButton.style.position = "absolute";
        closeButton.style.top = "-40px";
        closeButton.style.right = "0";
        closeButton.style.color = "white";
        closeButton.style.fontSize = "40px";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = function() {
            closeVideoModal();
        };
        
        modalContent.appendChild(iframe);
        modalContent.appendChild(closeButton);
        videoModal.appendChild(modalContent);
        document.body.appendChild(videoModal);
        
        // Define modal functions globally
        window.openVideoModal = function() {
            const modal = document.getElementById("videoModal");
            const iframe = document.getElementById("youtubeIframe");
            iframe.src = "https://www.youtube.com/embed/bf9sEwANkyY?autoplay=1&start=2222";
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        };
        
        window.closeVideoModal = function() {
            const modal = document.getElementById("videoModal");
            const iframe = document.getElementById("youtubeIframe");
            iframe.src = "";
            modal.style.display = "none";
            document.body.style.overflow = "";
        };
    }, 2000); // Wait for gallery to be initialized
});
