/**
 * Simple Family Home Gallery Script
 * Adds images directly to the Selling Family Home section
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the Selling Family Home section by its header text
    const headers = document.querySelectorAll('.timeline-header');
    let familyHomeSection = null;
    
    for (const header of headers) {
        if (header.textContent.includes('Selling Family Home')) {
            // Found the header, now get the parent timeline-item
            familyHomeSection = header.closest('.timeline-item');
            console.log('Found Selling Family Home section by header:', header);
            break;
        }
    }
    
    if (!familyHomeSection) {
        console.error('Selling Family Home section not found by header text');
        return;
    }
    
    // Find the expandable div within the section
    const expandableDiv = familyHomeSection.querySelector('.expandable');
    if (!expandableDiv) {
        console.error('Expandable div not found in Selling Family Home section');
        return;
    }
    console.log('Found expandable div:', expandableDiv);
    
    // Create a simple gallery container
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'simple-gallery family-home-gallery';
    galleryContainer.style.cssText = `
        display: grid !important;
        grid-template-columns: repeat(5, 1fr) !important;
        gap: 0 !important;
        width: 62.5% !important;
        margin-left: 0 !important;
        margin-right: auto !important;
        margin-top: 20px !important;
    `;
    
    // Add the gallery container after the paragraph
    const paragraph = expandableDiv.querySelector('p');
    if (paragraph) {
        paragraph.insertAdjacentElement('afterend', galleryContainer);
        console.log('Added simple gallery after paragraph');
    } else {
        expandableDiv.appendChild(galleryContainer);
        console.log('Added simple gallery to expandable div (no paragraph found)');
    }
    
    // Add the 10 images from 2inspiration folder
    for (let i = 1; i <= 10; i++) {
        const paddedNumber = i.toString().padStart(2, '0');
        const imagePath = getAssetUrl(`realestate/JPEG/2inspiration/${paddedNumber}.jpg`);
        console.log(`Creating image element for: ${imagePath}`);
        
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';
        imageWrapper.style.cssText = `
            position: relative !important;
            overflow: hidden !important;
            aspect-ratio: 1 !important;
            transform: none !important;
            scale: 1 !important;
            transition: none !important;
        `;
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Family Home Image ${i}`;
        img.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            filter: saturate(0.22);
            transition: filter 0.3s ease;
            transform: none !important;
            scale: 1 !important;
        `;
        
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.justifyContent = 'center';
            this.style.alignItems = 'center';
            this.alt = 'Image failed to load';
            
            // Create error message
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'Image not found';
            errorMsg.style.color = '#999';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.padding = '10px';
            this.parentNode.appendChild(errorMsg);
        };
        
        img.onload = function() {
            console.log(`Successfully loaded image: ${imagePath}`);
        };
        
        // Add hover effect
        imageWrapper.addEventListener('mouseenter', function() {
            img.style.filter = 'saturate(1)';
        });
        
        imageWrapper.addEventListener('mouseleave', function() {
            img.style.filter = 'saturate(0.22)';
        });
        
        // Add image number
        const imageNumber = document.createElement('div');
        imageNumber.textContent = i;
        imageNumber.style.cssText = `
            position: absolute;
            bottom: 5px;
            right: 10px;
            color: white;
            font-size: 12px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
            z-index: 10;
            transition: opacity 0.3s ease;
        `;
        
        // Hide number on hover
        imageWrapper.addEventListener('mouseenter', function() {
            imageNumber.style.opacity = '0';
        });
        
        imageWrapper.addEventListener('mouseleave', function() {
            imageNumber.style.opacity = '1';
        });
        
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imageNumber);
        galleryContainer.appendChild(imageWrapper);
        
        console.log(`Added image ${i} to gallery`);
    }
    
    // Make sure the Family Home section is expanded
    if (!familyHomeSection.classList.contains('expanded')) {
        familyHomeSection.classList.add('expanded');
        console.log('Expanded Selling Family Home section');
    }
    
    // Add a global style to ensure 5-column layout
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .family-home-gallery {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            width: 62.5% !important;
            gap: 0 !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    console.log('Simple gallery setup complete');
});
