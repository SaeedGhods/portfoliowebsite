/**
 * 5959 Yonge Street Commercial Building Expansion Gallery
 * Displays photos of the 50,000 SQ FT commercial new-build expansion project
 */

// Define the 5959 Yonge Street Commercial gallery images
const yongeImages = [
    // Images will be added as the project progresses
    // getAssetUrl('yonge-commercial/rendering1.jpg'),
    // getAssetUrl('yonge-commercial/rendering2.jpg'),
    // getAssetUrl('yonge-commercial/construction1.jpg'),
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('5959 Yonge Street Commercial Gallery script loaded');

    const yongeGallery = document.getElementById("yongeGallery");

    if (yongeGallery && !yongeGallery.classList.contains("initialized")) {
        console.log("Initializing yongeGallery with common gallery manager");

        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("yongeGallery", yongeImages);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicYongeGallery();
        }
    }
});

// Gallery initialization function for when images are available
function initYongeGallery() {
    const gallery = document.getElementById("yongeGallery");

    if (yongeImages.length === 0) {
        // No images available yet - show a placeholder message
        gallery.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic;">Images coming soon as construction progresses</div>';
        gallery.classList.add("initialized");
        return;
    }

    if (gallery && !gallery.classList.contains("initialized")) {
        console.log("Initializing yongeGallery with common gallery manager");

        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("yongeGallery", yongeImages);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicYongeGallery();
        }
    }
}

// Basic gallery initialization fallback
function initBasicYongeGallery() {
    const gallery = document.getElementById("yongeGallery");
    if (!gallery) return;

    if (yongeImages.length === 0) {
        // No images available yet
        gallery.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic;">Images coming soon as construction progresses</div>';
        gallery.classList.add("initialized");
        return;
    }

    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';

    yongeImages.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `5959 Yonge Street Commercial ${index + 1}`;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.transition = 'transform 0.3s ease';

        galleryItem.appendChild(img);

        // Add hover effect
        galleryItem.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });

        galleryItem.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });

        // Add click event to open modal (if modal system exists)
        galleryItem.addEventListener('click', () => {
            if (typeof openModal === 'function') {
                openModal(imageSrc, index + 1);
            }
        });

        gallery.appendChild(galleryItem);
    });

    gallery.classList.add("initialized");
    console.log(`Yonge Commercial Gallery initialized with ${yongeImages.length} images`);
}