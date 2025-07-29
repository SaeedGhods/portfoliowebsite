/**
 * Tesla Model 3 Gallery
 * Displays photos of the Tesla Model 3 Performance purchase
 */

// Define the Tesla Model 3 gallery images (renamed and curated selection)
const teslaModel3Images = [
    getAssetUrl('tesla-model3/1.jpg'), // Tesla Model 3 photo 1
    getAssetUrl('tesla-model3/2.jpg'), // Tesla Model 3 photo 2
    getAssetUrl('tesla-model3/3.jpg'), // Tesla Model 3 photo 3
    getAssetUrl('tesla-model3/4.jpg'), // Tesla Model 3 photo 4
    getAssetUrl('tesla-model3/5.jpg'), // Tesla Model 3 photo 5
    getAssetUrl('tesla-model3/6.jpg'), // Tesla Model 3 photo 6
    getAssetUrl('tesla-model3/7.jpg'), // Tesla Model 3 photo 7
    getAssetUrl('tesla-model3/8.jpg'), // Tesla Model 3 photo 8
    getAssetUrl('tesla-model3/9.jpg'), // Tesla Model 3 photo 9
    getAssetUrl('tesla-model3/10.jpg') // Tesla Model 3 photo 10
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tesla Model 3 Gallery script loaded');
    
    const teslaModel3Gallery = document.getElementById("teslaModel3Gallery");
    
    if (teslaModel3Gallery && !teslaModel3Gallery.classList.contains("initialized")) {
        console.log("Initializing teslaModel3Gallery with common gallery manager");
        
        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("teslaModel3Gallery", teslaModel3Images);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicTeslaModel3Gallery();
        }
    }
});

// Basic gallery initialization fallback
function initBasicTeslaModel3Gallery() {
    const gallery = document.getElementById("teslaModel3Gallery");
    if (!gallery) return;
    
    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';
    
    teslaModel3Images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Tesla Model 3 ${index + 1}`;
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
    console.log(`Tesla Model 3 Gallery initialized with ${teslaModel3Images.length} images`);
} 