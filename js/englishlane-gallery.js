/**
 * English Lane Phase 2 Gallery
 * Displays photos of the luxury townhouse development in Don Mills, Toronto
 */

// Define the English Lane Phase 2 gallery images
const englishLaneImages = [
    getAssetUrl('englishlane/FRONT.webp'), // Front exterior view of townhomes
    getAssetUrl('englishlane/REAR.webp'), // Rear view of townhomes
    getAssetUrl('englishlane/KITCHEN.jpeg'), // Modern kitchen interior
    getAssetUrl('englishlane/BEDROOM.jpeg'), // Bedroom interior design
    getAssetUrl('englishlane/BATHROOM.jpeg') // Bathroom interior finish
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('English Lane Phase 2 Gallery script loaded');
    
    const englishLaneGallery = document.getElementById("englishLaneGallery");
    
    if (englishLaneGallery && !englishLaneGallery.classList.contains("initialized")) {
        console.log("Initializing englishLaneGallery with common gallery manager");
        
        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("englishLaneGallery", englishLaneImages);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicEnglishLaneGallery();
        }
    }
});

// Basic gallery initialization fallback
function initBasicEnglishLaneGallery() {
    const gallery = document.getElementById("englishLaneGallery");
    if (!gallery) return;
    
    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';
    
    englishLaneImages.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `English Lane Phase 2 ${index + 1}`;
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
    console.log(`English Lane Gallery initialized with ${englishLaneImages.length} images`);
} 