/**
 * 29 High Point Road Gallery
 * Displays photos of the personal family home designed and developed by Ghods Builders Inc.
 */

// Define the 29 High Point Road gallery images with Vercel optimization
const highPointRoadImages = [
    getAssetUrl('realestate/JPEG/29hp/01.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/02.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/03.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/04.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/05.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/06.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/07.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/08.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/09.jpg', { w: 500, q: 85 }),
    getAssetUrl('realestate/JPEG/29hp/10.jpg', { w: 500, q: 85 })
];

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('29 High Point Road Gallery script loaded');

    const highPointRoadGallery = document.getElementById("highPointRoadGallery");

    if (highPointRoadGallery && !highPointRoadGallery.classList.contains("initialized")) {
        console.log("Initializing highPointRoadGallery with common gallery manager");

        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("highPointRoadGallery", highPointRoadImages);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicHighPointRoadGallery();
        }
    }
});

// High Point Road Media Type Toggle Function
function toggleHighPointRoadMediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Get the high point road gallery container
    const galleryContainer = document.getElementById("highPointRoadGallery");

    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".highpoinroad-pdf-buttons-container");

    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";

    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";

        // Initialize the gallery if it's not already initialized
        if (typeof initHighPointRoadGallery === "function") {
            initHighPointRoadGallery();
        }
    } else if (mediaType === "pdf") {
        // Hide the gallery for PDF view
        galleryContainer.style.display = "none";

        // Style the PDF buttons container to match the USC section exactly
        pdfButtonsContainer.style.display = "flex";
        pdfButtonsContainer.style.flexDirection = "column";
        pdfButtonsContainer.style.alignItems = "center";
        pdfButtonsContainer.style.marginBottom = "20px";
        pdfButtonsContainer.style.marginTop = "10px";
        pdfButtonsContainer.style.width = "100%";

        // Create PDF buttons using the actual PDF files
        const pdfDocuments = [
            {
                path: getAssetUrl("realestate/JPEG/29hp/29HPPLANS.pdf"),
                name: "29 HIGH POINT ROAD PLANS"
            }
        ];

        // Add each PDF button
        pdfDocuments.forEach(doc => {
            const pdfButton = document.createElement("button");
            pdfButton.className = "pdf-view-button";
            pdfButton.textContent = doc.name;

            // Style to match the USC section
            pdfButton.style.width = "34.16%";
            pdfButton.style.position = "relative";
            pdfButton.style.left = "-3%";
            pdfButton.style.marginBottom = "10px";
            pdfButton.style.padding = "10px 15px";
            pdfButton.style.backgroundColor = "rgba(0, 58, 108, 0.1)";
            pdfButton.style.border = "1px solid rgba(0, 58, 108, 0.1)";
            pdfButton.style.borderRadius = "0";
            pdfButton.style.cursor = "pointer";
            pdfButton.style.transition = "all 0.3s ease";
            pdfButton.style.fontSize = "14px";
            pdfButton.style.fontWeight = "500";
            pdfButton.style.color = "#ffffff";
            pdfButton.style.textAlign = "center";

            pdfButton.onclick = function(event) {
                openHighPointRoadPdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal for High Point Road - matches USC section exactly
function openHighPointRoadPdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'highpoinroad-pdf-modal-overlay';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';

        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeHighPointRoadPdfModal;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigateHighPointRoadPdf('prev');

    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigateHighPointRoadPdf('next');

    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'highpoinroad-pdf-iframe';

    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'highpoinroad-pdf-file-info';

    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(prevButton);
    modalContent.appendChild(nextButton);
    modalContent.appendChild(pdfIframe);
    modalContent.appendChild(fileInfo);
    modalOverlay.appendChild(modalContent);

    // Add to page
    document.body.appendChild(modalOverlay);

    // Store current file info
    window.currentHighPointRoadPdfIndex = getCurrentHighPointRoadPdfIndex(filePath);

    // Update file info
    updateHighPointRoadPdfFileInfo();

    // Add keyboard listeners
    document.addEventListener('keydown', handleHighPointRoadPdfKeyboard);

    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeHighPointRoadPdfModal() {
    const modal = document.getElementById('highpoinroad-pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleHighPointRoadPdfKeyboard);
        }, 300);
    }
}

function navigateHighPointRoadPdf(direction) {
    const currentIndex = window.currentHighPointRoadPdfIndex;
    const files = getHighPointRoadPdfFiles();

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }

    const newFile = files[newIndex];
    window.currentHighPointRoadPdfIndex = newIndex;

    // Update iframe source
    const iframe = document.getElementById('highpoinroad-pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }

    // Update file info
    updateHighPointRoadPdfFileInfo();
}

function getCurrentHighPointRoadPdfIndex(filePath) {
    const files = getHighPointRoadPdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function getHighPointRoadPdfFiles() {
    return [
        {
            path: getAssetUrl("realestate/JPEG/29hp/29HPPLANS.pdf"),
            name: "29 HIGH POINT ROAD PLANS"
        }
    ];
}

function updateHighPointRoadPdfFileInfo() {
    const index = window.currentHighPointRoadPdfIndex;
    const files = getHighPointRoadPdfFiles();
    const currentFile = files[index];

    const fileInfo = document.getElementById('highpoinroad-pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handleHighPointRoadPdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeHighPointRoadPdfModal();
            break;
        case 'ArrowUp':
            navigateHighPointRoadPdf('prev');
            break;
        case 'ArrowDown':
            navigateHighPointRoadPdf('next');
            break;
    }
}

// Gallery initialization function
function initHighPointRoadGallery() {
    const gallery = document.getElementById("highPointRoadGallery");

    if (gallery && !gallery.classList.contains("initialized")) {
        console.log("Initializing highPointRoadGallery with common gallery manager");

        // Use the common gallery manager if available
        if (typeof galleryManager !== 'undefined' && galleryManager.initializeGallery) {
            galleryManager.initializeGallery("highPointRoadGallery", highPointRoadImages);
        } else {
            console.log("Common gallery manager not found, initializing basic gallery");
            initBasicHighPointRoadGallery();
        }
    }
}

// Basic gallery initialization fallback
function initBasicHighPointRoadGallery() {
    const gallery = document.getElementById("highPointRoadGallery");
    if (!gallery) return;

    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(5, 1fr)';
    gallery.style.gap = '10px';
    gallery.style.marginTop = '20px';

    highPointRoadImages.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.position = 'relative';
        galleryItem.style.paddingBottom = '75%';
        galleryItem.style.overflow = 'hidden';
        galleryItem.style.cursor = 'pointer';
        galleryItem.style.borderRadius = '8px';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `29 High Point Road ${index + 1}`;
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
    console.log(`High Point Road Gallery initialized with ${highPointRoadImages.length} images`);
}