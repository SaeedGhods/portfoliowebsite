/**
 * 800 Broadway San Diego Gallery
 * Displays photos of the 40-story residential tower
 */

// Define the 800 Broadway gallery images
const broadway800Images = [
    'https://pbs.twimg.com/media/ExWukW2WEAQtCrs.jpg', // Street-level exterior at dusk with podium, retail, cafe
    'https://pbs.twimg.com/media/ExWukW2WQAUzY3-.jpg'  // Full tower exterior from low angle at twilight
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('800 Broadway Gallery script loaded');
    
    const broadway800Gallery = document.getElementById("broadway800Gallery");
    
    if (broadway800Gallery && !broadway800Gallery.classList.contains("initialized")) {
        console.log("Initializing broadway800Gallery with common gallery manager");
        
        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("broadway800Gallery", broadway800Images);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicBroadway800Gallery();
        }
    }
});

// Basic gallery initialization fallback
function initBasicBroadway800Gallery() {
    const gallery = document.getElementById("broadway800Gallery");
    if (!gallery) return;
    
    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';
    
    broadway800Images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `800 Broadway San Diego ${index + 1}`;
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
    console.log(`Broadway 800 Gallery initialized with ${broadway800Images.length} images`);
} 