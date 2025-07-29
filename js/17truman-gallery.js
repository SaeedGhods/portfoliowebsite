/**
 * 17 Truman Gallery Script
 * Version: 2025-03-12 01:01
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("17 Truman Gallery script loaded");
    
    // Create the images array with the correct paths
    const images = [];
    for (let i = 1; i <= 35; i++) {
        const paddedNumber = i.toString().padStart(2, "0");
        images.push(getAssetUrl(`17truman/JPEG/20250312_${paddedNumber}.jpeg`));
    }
    
    // Initialize the gallery with the required 5-column grid layout
    if (window.galleryManager) {
        window.galleryManager.initializeGallery("realEstateGallery", images, {
            gridColumns: 5,
            containerWidth: "62.5%",
            hoverEffect: true
        });
    } else {
        console.error("Gallery manager not found");
    }
});
