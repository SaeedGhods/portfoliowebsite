/**
 * Hydroponic Innovations PDF Toggle Functionality
 * Maintains strict 5-column grid layout for gallery as required
 */

// Hydroponic Media Type Toggle Function
function toggleHydroponicMediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();
    
    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });
    
    // Add active class to clicked button
    event.target.classList.add("active");
    
    // Get the hydroponic gallery container
    const galleryContainer = document.getElementById("hydroponicGallery");
    
    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".hydroponic-pdf-buttons-container");
    
    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";
    
    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";
        
        // Initialize the gallery if it's not already initialized
        if (typeof initHydroponicGallery === "function") {
            initHydroponicGallery();
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
        
        // Create PDF buttons using the actual PDF files in the directory
        const pdfDocuments = [
            {
                path: getAssetUrl("hydroponic/PDF/20180606HYDROPONICV12INSPIRATIONBUILD.pdf"),
                name: "HYDROPONIC V1.2 BUILD"
            },
            {
                path: getAssetUrl("hydroponic/PDF/20210328HYDROPONICDIAGRAM.pdf"),
                name: "SYSTEM DIAGRAM"
            },
            {
                path: getAssetUrl("hydroponic/PDF/20210920HYDROPONICPATENTDIAGRAMS.pdf"),
                name: "PATENT DIAGRAMS"
            },
            {
                path: getAssetUrl("hydroponic/PDF/20210920HYDROPONICSPECIFICATIONS.pdf"),
                name: "SPECIFICATIONS"
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
                openHydroponicPdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal - matches USC section exactly
function openHydroponicPdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'pdf-modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';
        
        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeHydroponicPdfModal;
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigateHydroponicPdf('prev');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigateHydroponicPdf('next');
    
    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'pdf-iframe';
    
    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'pdf-file-info';
    
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
    window.currentHydroponicPdfIndex = getCurrentHydroponicPdfIndex(filePath);
    
    // Update file info
    updateHydroponicPdfFileInfo();
    
    // Add keyboard listeners
    document.addEventListener('keydown', handleHydroponicPdfKeyboard);
    
    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeHydroponicPdfModal() {
    const modal = document.getElementById('pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleHydroponicPdfKeyboard);
        }, 300);
    }
}

function navigateHydroponicPdf(direction) {
    const currentIndex = window.currentHydroponicPdfIndex;
    const files = getHydroponicPdfFiles();
    
    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newFile = files[newIndex];
    window.currentHydroponicPdfIndex = newIndex;
    
    // Update iframe source
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }
    
    // Update file info
    updateHydroponicPdfFileInfo();
}

function getCurrentHydroponicPdfIndex(filePath) {
    const files = getHydroponicPdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function getHydroponicPdfFiles() {
    return [
        {
            path: getAssetUrl("hydroponic/PDF/20180606HYDROPONICV12INSPIRATIONBUILD.pdf"),
            name: "HYDROPONIC V1.2 BUILD"
        },
        {
            path: getAssetUrl("hydroponic/PDF/20210328HYDROPONICDIAGRAM.pdf"),
            name: "SYSTEM DIAGRAM"
        },
        {
            path: getAssetUrl("hydroponic/PDF/20210920HYDROPONICPATENTDIAGRAMS.pdf"),
            name: "PATENT DIAGRAMS"
        },
        {
            path: getAssetUrl("hydroponic/PDF/20210920HYDROPONICSPECIFICATIONS.pdf"),
            name: "SPECIFICATIONS"
        }
    ];
}

function updateHydroponicPdfFileInfo() {
    const index = window.currentHydroponicPdfIndex;
    const files = getHydroponicPdfFiles();
    const currentFile = files[index];
    
    const fileInfo = document.getElementById('pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handleHydroponicPdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeHydroponicPdfModal();
            break;
        case 'ArrowUp':
            navigateHydroponicPdf('prev');
            break;
        case 'ArrowDown':
            navigateHydroponicPdf('next');
            break;
    }
}

// Legacy function for backward compatibility
function openPdfViewer(pdfPath, event) {
    if (event) event.stopPropagation();
    openHydroponicPdfModal(pdfPath);
}
