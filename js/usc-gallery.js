// USC Gallery Script
(function() {
    console.log("USC Gallery script executing");
    
    // Configuration
    const TOTAL_IMAGES = {
        "1.0": 1,    // 1 image in 1.0 folder
        "2.5": 38,   // 38 images in 2.5 folder (JPEG copy folder)
        "3.5": 3,    // 3 images in 3.5 folder
        "4.0": 253,  // 253 images in 4.0 folder
        "4.5": 2,    // 2 images in 4.5 folder (+ 7 from Instagram)
        "5.0": 0,    // 0 images in 5.0 folder (+ 4 from Instagram)
        "5.5": 18,   // 18 images in 5.5 folder (+ 17 from Instagram)
        "default": 0
    };
    
    // Instagram folder mapping
    const INSTAGRAM_FOLDERS = ["4.5", "5.0", "5.5"];
    
    // Instagram image mappings
    const INSTAGRAM_IMAGES = {
        "4.5": [256, 257, 258, 260, 263, 268, 271],
        "5.0": [264, 267, 269, 272],
        "5.5": [275, 276, 277, 278, 279, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 292]
    };
    
    // Special image mappings for 2.5 folder (JPEG copy folder)
    const FOLDER_2_5_IMAGES = [
        "2012-12-10 202A SELFIE.JPG",
        "2013-03-17_1123 SELFIE.jpeg",
        "2013-05-09 202B GLASS ORAGAMI 08A.png",
        "2013-05-09 202B GLASS ORAGAMI 08B.png",
        "2013-05-09 DINNER PHOTO.JPG",
        "2013-05-09-202B-GLASS-ORAGAMI-00.JPG",
        "2013-05-09-202B-GLASS-ORAGAMI-01.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-02.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-03.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-04.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-05.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-06.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-07.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-09.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-10.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-11.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-12.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-13.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-14.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-15.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-16.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-17.jpeg",
        "2013-05-09-202B-GLASS-ORAGAMI-52.JPG",
        "2013-05-09-202B-GLASS-ORAGAMI-53.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-54.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-55.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-56.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-57.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-58.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-59.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-60.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-61.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-62.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-63.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-64.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-65.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-66.jpg",
        "2013-05-09-202B-GLASS-ORAGAMI-67.jpg"
    ];
    
    // Function to initialize the gallery for a specific folder
    function initializeUscGallery(folderName) {
        console.log("Initializing USC gallery for folder:", folderName);
        
        // Get the gallery container
        const galleryContainer = document.querySelector("#usc-gallery-container");
        console.log("Gallery container found:", galleryContainer);
        
        if (!galleryContainer) {
            console.error("USC Gallery container not found");
            return;
        }
        
        // Check if gallery already has items
        if (galleryContainer.children.length > 0) {
            console.log("USC Gallery already has items, clearing them");
            galleryContainer.innerHTML = "";
        }
        
        // Set data-folder attribute for CSS targeting
        galleryContainer.setAttribute("data-folder", folderName);

        // CRITICAL: Enforce 5-column grid layout for ALL galleries as per requirements
        galleryContainer.style.gridTemplateColumns = "repeat(5, 1fr) !important";
        galleryContainer.style.width = "62.5%";
        galleryContainer.style.gap = "0 !important";
        
        // Check if this folder should use Instagram photos
        const useInstagramFolder = INSTAGRAM_FOLDERS.includes(folderName);
        
        // Special handling for 5.5 folder (graduation photo)
        if (folderName === "5.5") {
            console.log("Adding graduation photo to 5.5 folder");
            // Add the graduation photo first
            createSpecialGalleryItem(galleryContainer, folderName, "graduation photo");
            
            // Then add the Instagram photos
            const totalImages = TOTAL_IMAGES[folderName] || TOTAL_IMAGES.default;
            console.log(`Loading all ${totalImages} images for folder ${folderName} from INSTAGRAM folder`);
            
            for (let i = 1; i <= totalImages; i++) {
                createGalleryItem(galleryContainer, folderName, i, true);
            }
        } else if (useInstagramFolder) {
            // Use Instagram folder for 4.5 and 5.0
            const totalImages = TOTAL_IMAGES[folderName] || TOTAL_IMAGES.default;
            console.log(`Loading all ${totalImages} images for folder ${folderName} from INSTAGRAM folder`);
            
            // Load all images at once from Instagram folder
            for (let i = 1; i <= totalImages; i++) {
                createGalleryItem(galleryContainer, folderName, i, true);
            }
        } else {
            // Regular folder (4.0 and others)
            // Determine total images for this folder
            const totalImages = TOTAL_IMAGES[folderName] || TOTAL_IMAGES.default;
            console.log(`Loading all ${totalImages} images for folder ${folderName}`);
            
            // Load all images at once
            for (let i = 1; i <= totalImages; i++) {
                createGalleryItem(galleryContainer, folderName, i, false);
            }
        }
        
        console.log("USC Gallery initialization complete for folder", folderName);
    }
    
    // Function to create a special gallery item with a custom filename
    function createSpecialGalleryItem(galleryContainer, folderName, filename) {
        const imagePath = getAssetUrl(`uscschoolofarchitecture/${folderName}/JPEG/${filename}.jpg`);
        console.log(`Creating special gallery item for image: ${imagePath}`);
        
        // Create gallery item
        const galleryItem = document.createElement("div");
        galleryItem.className = "usc-gallery-item";
        
        // Create image container for aspect ratio
        const imageContainer = document.createElement("div");
        imageContainer.className = "usc-image-container";
        galleryItem.appendChild(imageContainer);
        
        // Create image
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `USC Architecture ${filename.replace(/\\/g, "")}`;
        img.className = "usc-gallery-image";
        img.loading = "lazy"; // Use native lazy loading
        imageContainer.appendChild(img);
        
        // Create image number/label
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = "0";
        galleryItem.appendChild(imageNumber);
        
        // Add error handling
        img.onerror = function() {
            console.error("Failed to load USC image:", img.src);
            img.src = getAssetUrl("placeholder-image.jpg");
            img.alt = "Image not found";
        };
        
        // Add to gallery
        galleryContainer.appendChild(galleryItem);
        
        // Add click event for modal
        galleryItem.addEventListener("click", function() {
            openSpecialUscModal(folderName, filename);
        });
        
        return galleryItem;
    }
    
    // Function to create a gallery item
    function createGalleryItem(galleryContainer, folderName, imageIndex, useInstagramFolder = false) {
        let imagePath;
        
        if (useInstagramFolder) {
            // Use INSTAGRAM folder for specified sections
            const imageIndexInFolder = INSTAGRAM_IMAGES[folderName][imageIndex - 1];
            if (!imageIndexInFolder) {
                console.error(`Invalid image index ${imageIndex} for folder ${folderName}`);
                return;
            }
            imagePath = getAssetUrl(`INSTAGRAM/${folderName}/image_${imageIndexInFolder}.jpg`);
            console.log(`Creating gallery item with Instagram path: ${imagePath}`);
        } else if (folderName === "2.5") {
            // Special handling for 2.5 folder - use JPEG copy folder with actual filenames
            const filename = FOLDER_2_5_IMAGES[imageIndex - 1];
            if (!filename) {
                console.error(`Invalid image index ${imageIndex} for folder 2.5`);
                return;
            }
            imagePath = getAssetUrl(`uscschoolofarchitecture/2.5/JPEG copy/${filename}`);
            console.log(`Creating gallery item with 2.5 path: ${imagePath}`);
        } else {
            // Use regular USC folder
            imagePath = getAssetUrl(`uscschoolofarchitecture/${folderName}/JPEG/image_${String(imageIndex).padStart(3, "0")}.jpg`);
            console.log(`Creating gallery item with USC path: ${imagePath}`);
        }
        
        // Create gallery item
        const galleryItem = document.createElement("div");
        galleryItem.className = "usc-gallery-item";
        
        // Create image container for aspect ratio
        const imageContainer = document.createElement("div");
        imageContainer.className = "usc-image-container";
        galleryItem.appendChild(imageContainer);
        
        // Create image
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = `USC Architecture Image ${imageIndex}`;
        img.className = "usc-gallery-image";
        img.loading = "lazy"; // Use native lazy loading
        imageContainer.appendChild(img);
        
        // Create image number
        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = imageIndex;
        galleryItem.appendChild(imageNumber);
        
        // Add error handling
        img.onerror = function() {
            console.error("Failed to load USC image:", img.src);
            img.src = getAssetUrl("placeholder-image.jpg");
            img.alt = "Image not found";
        };
        
        // Add to gallery
        galleryContainer.appendChild(galleryItem);
        
        // Add click event for modal
        galleryItem.addEventListener("click", function() {
            openUscModal(folderName, imageIndex, useInstagramFolder);
        });
        
        return galleryItem;
    }
    
    // Function to open the modal for special images
    function openSpecialUscModal(folderName, filename) {
        console.log("Opening USC modal for folder", folderName, "special image", filename);
        
        // Get the modal
        const modal = document.getElementById("modal");
        if (!modal) {
            console.error("Modal not found");
            return;
        }
        
        // Set the modal image
        const modalImg = document.querySelector("#modal img");
        if (!modalImg) {
            console.error("Modal image not found");
            return;
        }
        
        // Set the image source
        modalImg.src = getAssetUrl(`uscschoolofarchitecture/${folderName}/JPEG/${filename}.jpg`);
        
        // Show the modal
        modal.style.display = "flex";
        
        // Set special attributes for navigation
        modal.setAttribute("data-special-image", filename);
        modal.setAttribute("data-folder", folderName);
        modal.setAttribute("data-use-instagram", "false");
        
        // Add keyboard navigation
        document.addEventListener("keydown", handleKeyDown);
    }
    
    // Function to open the modal
    function openUscModal(folderName, imageIndex, useInstagramFolder = false) {
        console.log("Opening USC modal for folder", folderName, "image", imageIndex, "using Instagram folder:", useInstagramFolder);
        
        // Get the modal
        const modal = document.getElementById("modal");
        if (!modal) {
            console.error("Modal not found");
            return;
        }
        
        // Set the modal image
        const modalImg = document.querySelector("#modal img");
        if (!modalImg) {
            console.error("Modal image not found");
            return;
        }
        
        // Set the image source
        let imagePath;
        
        if (useInstagramFolder) {
            const imageIndexInFolder = INSTAGRAM_IMAGES[folderName][imageIndex - 1];
            imagePath = getAssetUrl(`INSTAGRAM/${folderName}/image_${String(imageIndexInFolder).padStart(3, "0")}.jpg`);
        } else {
            imagePath = getAssetUrl(`uscschoolofarchitecture/${folderName}/JPEG/image_${String(imageIndex).padStart(3, "0")}.jpg`);
        }
        
        modalImg.src = imagePath;
        
        // Show the modal
        modal.style.display = "flex";
        
        // Set the current image index
        modal.setAttribute("data-current-index", imageIndex);
        modal.setAttribute("data-folder", folderName);
        modal.setAttribute("data-use-instagram", useInstagramFolder ? "true" : "false");
        modal.removeAttribute("data-special-image");
        
        // Add keyboard navigation
        document.addEventListener("keydown", handleKeyDown);
    }
    
    // Function to navigate the modal
    function navigateUscModal(direction) {
        const modal = document.getElementById("modal");
        if (!modal) return;
        
        const folderName = modal.getAttribute("data-folder");
        const useInstagramFolder = modal.getAttribute("data-use-instagram") === "true";
        
        // Check if we're viewing a special image
        if (modal.hasAttribute("data-special-image")) {
            // If navigating from a special image, go to the first or last regular image
            if (direction > 0) {
                openUscModal(folderName, 1, INSTAGRAM_FOLDERS.includes(folderName));
            } else {
                const maxIndex = TOTAL_IMAGES[folderName] || TOTAL_IMAGES.default;
                openUscModal(folderName, maxIndex, INSTAGRAM_FOLDERS.includes(folderName));
            }
            return;
        }
        
        let currentIndex = parseInt(modal.getAttribute("data-current-index"));
        
        // Determine max index based on folder
        const maxIndex = TOTAL_IMAGES[folderName] || TOTAL_IMAGES.default;
        
        // Calculate new index
        let newIndex = currentIndex + direction;
        
        // Handle special case for 5.5 folder
        if (folderName === "5.5") {
            if (newIndex < 1) {
                // If going back from image 1, show the graduation photo
                openSpecialUscModal(folderName, "graduation photo");
                return;
            } else if (newIndex > maxIndex) {
                // If going forward from the last image, show the graduation photo
                openSpecialUscModal(folderName, "graduation photo");
                return;
            }
        } else {
            // Handle wrapping for other folders
            if (newIndex < 1) newIndex = maxIndex;
            if (newIndex > maxIndex) newIndex = 1;
        }
        
        // Update modal image
        const modalImg = document.querySelector("#modal img");
        if (!modalImg) return;
        
        // Set the image source
        let imagePath;
        
        if (useInstagramFolder) {
            const imageIndexInFolder = INSTAGRAM_IMAGES[folderName][newIndex - 1];
            imagePath = getAssetUrl(`INSTAGRAM/${folderName}/image_${String(imageIndexInFolder).padStart(3, "0")}.jpg`);
        } else {
            imagePath = getAssetUrl(`uscschoolofarchitecture/${folderName}/JPEG/image_${String(newIndex).padStart(3, "0")}.jpg`);
        }
        
        modalImg.src = imagePath;
        
        // Update current index
        modal.setAttribute("data-current-index", newIndex);
    }
    
    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (e.key === "ArrowLeft") {
            navigateUscModal(-1);
        } else if (e.key === "ArrowRight") {
            navigateUscModal(1);
        } else if (e.key === "Escape") {
            const modal = document.getElementById("modal");
            if (modal) modal.style.display = "none";
            document.removeEventListener("keydown", handleKeyDown);
        }
    }
    
    // Expose the functions globally so they can be called from the main script
    window.initializeUscGallery = initializeUscGallery;
    window.openUscModal = openUscModal;
    window.navigateUscModal = navigateUscModal;
})();
