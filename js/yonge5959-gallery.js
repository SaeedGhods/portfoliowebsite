/**
 * 5959 Yonge Street Condos Gallery
 * Displays photos of the luxury condominium development in Toronto
 */

// Define the 5959 Yonge Street gallery images
const yonge5959Images = [
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.11.27 PM.png'), // High-quality rendering 1
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.11.46 PM.png'), // High-quality rendering 2
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.11.54 PM.png'), // High-quality rendering 3
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.12.02 PM.png'), // High-quality rendering 4
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.12.22 PM.png'), // High-quality rendering 5
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.12.29 PM.png'), // High-quality rendering 6
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.12.49 PM.png'), // High-quality rendering 7
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.12.57 PM.png'), // High-quality rendering 8
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.13.08 PM.png'), // High-quality rendering 9
    getAssetUrl('yonge5959/Screenshot 2025-07-25 at 12.13.15 PM.png')  // High-quality rendering 10
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('5959 Yonge Street Gallery script loaded');
    
    const yonge5959Gallery = document.getElementById("yonge5959Gallery");
    
    if (yonge5959Gallery && !yonge5959Gallery.classList.contains("initialized")) {
        console.log("Initializing yonge5959Gallery with common gallery manager");
        
        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("yonge5959Gallery", yonge5959Images);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicYonge5959Gallery();
        }
    }
});

// Basic gallery initialization fallback
function initBasicYonge5959Gallery() {
    const gallery = document.getElementById("yonge5959Gallery");
    if (!gallery) return;
    
    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';
    
    yonge5959Images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `5959 Yonge Street Condos ${index + 1}`;
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
    console.log(`Yonge 5959 Gallery initialized with ${yonge5959Images.length} images`);
} 