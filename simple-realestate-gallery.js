/**
 * Simple Real Estate Gallery Script
 * Adds images directly to the Real Estate section
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the Real Estate License section by its header text
    const headers = document.querySelectorAll('.timeline-header');
    let realEstateSection = null;
    
    for (const header of headers) {
        if (header.textContent.includes('Real Estate License and Selling Larger Family House')) {
            // Found the header, now get the parent timeline-item
            realEstateSection = header.closest('.timeline-item');
            console.log('Found Real Estate License section by header:', header);
            break;
        }
    }
    
    if (!realEstateSection) {
        console.error('Real Estate License section not found by header text');
        // Fallback: try to find it by looking at all timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        for (let i = 0; i < timelineItems.length; i++) {
            console.log(`Checking timeline item ${i}:`, timelineItems[i].textContent.substring(0, 50) + '...');
            if (timelineItems[i].textContent.includes('Real Estate License')) {
                realEstateSection = timelineItems[i];
                console.log('Found Real Estate License section by content in fallback search');
                break;
            }
        }
        
        if (!realEstateSection) {
            console.error('Real Estate License section not found even in fallback search');
            return;
        }
    }
    
    // Find the expandable div within the section
    const expandableDiv = realEstateSection.querySelector('.expandable');
    if (!expandableDiv) {
        console.error('Expandable div not found in Real Estate License section');
        return;
    }
    console.log('Found expandable div:', expandableDiv);
    
    // Create a simple gallery container
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'simple-gallery realestate-gallery';
    galleryContainer.style.display = 'grid';
    galleryContainer.style.gridTemplateColumns = 'repeat(5, 1fr) !important';
    galleryContainer.style.gap = '0 !important';
    galleryContainer.style.width = '62.5%';
    galleryContainer.style.marginLeft = '0';
    galleryContainer.style.marginRight = 'auto';
    galleryContainer.style.marginTop = '20px';
    
    // Add the gallery container after the paragraph
    const paragraph = expandableDiv.querySelector('p');
    if (paragraph) {
        paragraph.insertAdjacentElement('afterend', galleryContainer);
        console.log('Added simple gallery after paragraph');
    } else {
        expandableDiv.appendChild(galleryContainer);
        console.log('Added simple gallery to expandable div (no paragraph found)');
    }
    
    // Define the image paths for folders (hiding first 10 photos from 29hp folder)
    const imageSets = [
        // 17t folder (10 images) - only showing these images now
        {
            folder: getAssetUrl('realestate/JPEG/17t/'),
            count: 10,
            zeroPadded: true
        }
    ];
    
    // Track the overall image number for the gallery
    let imageNumber = 1;
    
    // Add images from both sets
    imageSets.forEach(imageSet => {
        for (let i = 1; i <= imageSet.count; i++) {
            const paddedNumber = imageSet.zeroPadded ? i.toString().padStart(2, '0') : i.toString();
            const imagePath = `${imageSet.folder}${paddedNumber}.jpg`;
            console.log(`Creating image element for: ${imagePath}`);
            
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';
            imageWrapper.style.position = 'relative';
            imageWrapper.style.overflow = 'hidden';
            imageWrapper.style.aspectRatio = '1';
            imageWrapper.style.transform = 'none !important';
            imageWrapper.style.scale = '1 !important';
            imageWrapper.style.transition = 'none !important';
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Real Estate Image ${imageNumber}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.filter = 'saturate(0.22)';
            img.style.transition = 'filter 0.3s ease';
            img.style.transform = 'none !important';
            img.style.scale = '1 !important';
            
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
            const imageNumberElement = document.createElement('div');
            imageNumberElement.textContent = imageNumber;
            imageNumberElement.style.position = 'absolute';
            imageNumberElement.style.bottom = '5px';
            imageNumberElement.style.right = '10px';
            imageNumberElement.style.color = 'white';
            imageNumberElement.style.fontSize = '12px';
            imageNumberElement.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.8)';
            imageNumberElement.style.zIndex = '10';
            imageNumberElement.style.transition = 'opacity 0.3s ease';
            
            // Hide number on hover
            imageWrapper.addEventListener('mouseenter', function() {
                imageNumberElement.style.opacity = '0';
            });
            
            imageWrapper.addEventListener('mouseleave', function() {
                imageNumberElement.style.opacity = '1';
            });
            
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(imageNumberElement);
            galleryContainer.appendChild(imageWrapper);
            
            console.log(`Added image ${imageNumber} to gallery: ${imagePath}`);
            imageNumber++;
        }
    });
    
    // Make sure the Real Estate section is expanded
    if (!realEstateSection.classList.contains('expanded')) {
        realEstateSection.classList.add('expanded');
        console.log('Expanded Real Estate License section');
    }
    
    // Add a global style to ensure consistent styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .realestate-gallery {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            width: 62.5% !important;
            gap: 0 !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    console.log('Simple gallery setup complete with 10 images (first 10 photos hidden)');
});
