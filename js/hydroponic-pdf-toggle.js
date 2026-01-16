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

// Yonge Street Media Type Toggle Function
function toggleYongeMediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Get the yonge gallery container
    const galleryContainer = document.getElementById("yongeGallery");

    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".yonge-pdf-buttons-container");

    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";

    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";

        // Initialize the gallery if it's not already initialized
        if (typeof initYongeGallery === "function") {
            initYongeGallery();
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
                path: getAssetUrl("keyprojects/1_SAEED+GHODS+PROFESSIONAL+5959+YONGE+EXPANSION.PDF"),
                name: "5959 YONGE EXPANSION"
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
                openYongePdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal for Yonge Street - matches USC section exactly
function openYongePdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'yonge-pdf-modal-overlay';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';

        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeYongePdfModal;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigateYongePdf('prev');

    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigateYongePdf('next');

    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'yonge-pdf-iframe';

    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'yonge-pdf-file-info';

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
    window.currentYongePdfIndex = getCurrentYongePdfIndex(filePath);

    // Update file info
    updateYongePdfFileInfo();

    // Add keyboard listeners
    document.addEventListener('keydown', handleYongePdfKeyboard);

    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeYongePdfModal() {
    const modal = document.getElementById('yonge-pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleYongePdfKeyboard);
        }, 300);
    }
}

function navigateYongePdf(direction) {
    const currentIndex = window.currentYongePdfIndex;
    const files = getYongePdfFiles();

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }

    const newFile = files[newIndex];
    window.currentYongePdfIndex = newIndex;

    // Update iframe source
    const iframe = document.getElementById('yonge-pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }

    // Update file info
    updateYongePdfFileInfo();
}

function getCurrentYongePdfIndex(filePath) {
    const files = getYongePdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function getYongePdfFiles() {
    return [
        {
            path: getAssetUrl("keyprojects/1_SAEED+GHODS+PROFESSIONAL+5959+YONGE+EXPANSION.PDF"),
            name: "5959 YONGE EXPANSION"
        }
    ];
}

function updateYongePdfFileInfo() {
    const index = window.currentYongePdfIndex;
    const files = getYongePdfFiles();
    const currentFile = files[index];

    const fileInfo = document.getElementById('yonge-pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handleYongePdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeYongePdfModal();
            break;
        case 'ArrowUp':
            navigateYongePdf('prev');
            break;
        case 'ArrowDown':
            navigateYongePdf('next');
            break;
    }
}

// English Lane Media Type Toggle Function
function toggleEnglishLaneMediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Get the english lane gallery container
    const galleryContainer = document.getElementById("englishLaneGallery");

    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".englishlane-pdf-buttons-container");

    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";

    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";

        // Initialize the gallery if it's not already initialized
        if (typeof initEnglishLaneGallery === "function") {
            initEnglishLaneGallery();
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
                path: getAssetUrl("keyprojects/2_SAEED+GHODS+PROFESSIONAL+ENGLISH+LANE+PHASE+2.PDF"),
                name: "ENGLISH LANE PHASE 2"
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
                openEnglishLanePdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal for English Lane - matches USC section exactly
function openEnglishLanePdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'englishlane-pdf-modal-overlay';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';

        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeEnglishLanePdfModal;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigateEnglishLanePdf('prev');

    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigateEnglishLanePdf('next');

    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'englishlane-pdf-iframe';

    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'englishlane-pdf-file-info';

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
    window.currentEnglishLanePdfIndex = getCurrentEnglishLanePdfIndex(filePath);

    // Update file info
    updateEnglishLanePdfFileInfo();

    // Add keyboard listeners
    document.addEventListener('keydown', handleEnglishLanePdfKeyboard);

    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeEnglishLanePdfModal() {
    const modal = document.getElementById('englishlane-pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEnglishLanePdfKeyboard);
        }, 300);
    }
}

function navigateEnglishLanePdf(direction) {
    const currentIndex = window.currentEnglishLanePdfIndex;
    const files = getEnglishLanePdfFiles();

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }

    const newFile = files[newIndex];
    window.currentEnglishLanePdfIndex = newIndex;

    // Update iframe source
    const iframe = document.getElementById('englishlane-pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }

    // Update file info
    updateEnglishLanePdfFileInfo();
}

function getCurrentEnglishLanePdfIndex(filePath) {
    const files = getEnglishLanePdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function getEnglishLanePdfFiles() {
    return [
        {
            path: getAssetUrl("keyprojects/2_SAEED+GHODS+PROFESSIONAL+ENGLISH+LANE+PHASE+2.PDF"),
            name: "ENGLISH LANE PHASE 2"
        }
    ];
}

function updateEnglishLanePdfFileInfo() {
    const index = window.currentEnglishLanePdfIndex;
    const files = getEnglishLanePdfFiles();
    const currentFile = files[index];

    const fileInfo = document.getElementById('englishlane-pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handleEnglishLanePdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeEnglishLanePdfModal();
            break;
        case 'ArrowUp':
            navigateEnglishLanePdf('prev');
            break;
        case 'ArrowDown':
            navigateEnglishLanePdf('next');
            break;
    }
}

// 800 Broadway Media Type Toggle Function
function toggle800BroadwayMediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Get the broadway gallery container
    const galleryContainer = document.getElementById("broadway800Gallery");

    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".broadway-pdf-buttons-container");

    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";

    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";

        // Initialize the gallery if it's not already initialized
        if (typeof initBroadway800Gallery === "function") {
            initBroadway800Gallery();
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
                path: getAssetUrl("keyprojects/SAEED+GHODS+PROFESSIONAL+800+BROADWAY.PDF"),
                name: "800 BROADWAY"
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
                open800BroadwayPdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal for 800 Broadway - matches USC section exactly
function open800BroadwayPdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'broadway-pdf-modal-overlay';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';

        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = close800BroadwayPdfModal;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigate800BroadwayPdf('prev');

    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigate800BroadwayPdf('next');

    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'broadway-pdf-iframe';

    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'broadway-pdf-file-info';

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
    window.current800BroadwayPdfIndex = getCurrent800BroadwayPdfIndex(filePath);

    // Update file info
    update800BroadwayPdfFileInfo();

    // Add keyboard listeners
    document.addEventListener('keydown', handle800BroadwayPdfKeyboard);

    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function close800BroadwayPdfModal() {
    const modal = document.getElementById('broadway-pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handle800BroadwayPdfKeyboard);
        }, 300);
    }
}

function navigate800BroadwayPdf(direction) {
    const currentIndex = window.current800BroadwayPdfIndex;
    const files = get800BroadwayPdfFiles();

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }

    const newFile = files[newIndex];
    window.current800BroadwayPdfIndex = newIndex;

    // Update iframe source
    const iframe = document.getElementById('broadway-pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }

    // Update file info
    update800BroadwayPdfFileInfo();
}

function getCurrent800BroadwayPdfIndex(filePath) {
    const files = get800BroadwayPdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function get800BroadwayPdfFiles() {
    return [
        {
            path: getAssetUrl("keyprojects/SAEED+GHODS+PROFESSIONAL+800+BROADWAY.PDF"),
            name: "800 BROADWAY"
        }
    ];
}

function update800BroadwayPdfFileInfo() {
    const index = window.current800BroadwayPdfIndex;
    const files = get800BroadwayPdfFiles();
    const currentFile = files[index];

    const fileInfo = document.getElementById('broadway-pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handle800BroadwayPdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            close800BroadwayPdfModal();
            break;
        case 'ArrowUp':
            navigate800BroadwayPdf('prev');
            break;
        case 'ArrowDown':
            navigate800BroadwayPdf('next');
            break;
    }
}

// 5959 Yonge Street Media Type Toggle Function
function toggleYonge5959MediaType(event, mediaType) {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();

    // Remove active class from all media type buttons in this section
    const mediaButtons = event.target.closest(".media-type-buttons").querySelectorAll(".media-type-button");
    mediaButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Get the yonge5959 gallery container
    const galleryContainer = document.getElementById("yonge5959Gallery");

    // Get the PDF buttons container
    const pdfButtonsContainer = document.querySelector(".yonge5959-pdf-buttons-container");

    // Clear the PDF buttons container
    pdfButtonsContainer.innerHTML = "";

    if (mediaType === "jpeg") {
        // Show the gallery for JPEG view
        galleryContainer.style.display = "grid";
        pdfButtonsContainer.style.display = "none";

        // Initialize the gallery if it's not already initialized
        if (typeof initYonge5959Gallery === "function") {
            initYonge5959Gallery();
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
                path: getAssetUrl("keyprojects/SAEED+GHODS+PROFESSIONAL+5959+YONGE+ST+PLANS+HIGHRISE.PDF"),
                name: "5959 YONGE CONDO PLANS"
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
                openYonge5959PdfModal(doc.path);
            };
            pdfButtonsContainer.appendChild(pdfButton);
        });
    }
}

// Function to open PDF modal for 5959 Yonge Street - matches USC section exactly
function openYonge5959PdfModal(filePath) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pdf-modal-overlay';
    modalOverlay.id = 'yonge5959-pdf-modal-overlay';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';

        // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'pdf-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeYonge5959PdfModal;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'pdf-nav-button pdf-prev-button';
    prevButton.innerHTML = '&#9650;';
    prevButton.onclick = () => navigateYonge5959Pdf('prev');

    const nextButton = document.createElement('button');
    nextButton.className = 'pdf-nav-button pdf-next-button';
    nextButton.innerHTML = '&#9660;';
    nextButton.onclick = () => navigateYonge5959Pdf('next');

    // Create PDF iframe
    const pdfIframe = document.createElement('iframe');
    pdfIframe.className = 'pdf-iframe';
    pdfIframe.src = filePath;
    pdfIframe.id = 'yonge5959-pdf-iframe';

    // Create file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'pdf-file-info';
    fileInfo.id = 'yonge5959-pdf-file-info';

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
    window.currentYonge5959PdfIndex = getCurrentYonge5959PdfIndex(filePath);

    // Update file info
    updateYonge5959PdfFileInfo();

    // Add keyboard listeners
    document.addEventListener('keydown', handleYonge5959PdfKeyboard);

    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeYonge5959PdfModal() {
    const modal = document.getElementById('yonge5959-pdf-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleYonge5959PdfKeyboard);
        }, 300);
    }
}

function navigateYonge5959Pdf(direction) {
    const currentIndex = window.currentYonge5959PdfIndex;
    const files = getYonge5959PdfFiles();

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
    } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
    }

    const newFile = files[newIndex];
    window.currentYonge5959PdfIndex = newIndex;

    // Update iframe source
    const iframe = document.getElementById('yonge5959-pdf-iframe');
    if (iframe) {
        iframe.src = newFile.path;
    }

    // Update file info
    updateYonge5959PdfFileInfo();
}

function getCurrentYonge5959PdfIndex(filePath) {
    const files = getYonge5959PdfFiles();
    return files.findIndex(file => file.path === filePath);
}

function getYonge5959PdfFiles() {
    return [
        {
            path: getAssetUrl("keyprojects/SAEED+GHODS+PROFESSIONAL+5959+YONGE+ST+PLANS+HIGHRISE.PDF"),
            name: "5959 YONGE CONDO PLANS"
        }
    ];
}

function updateYonge5959PdfFileInfo() {
    const index = window.currentYonge5959PdfIndex;
    const files = getYonge5959PdfFiles();
    const currentFile = files[index];

    const fileInfo = document.getElementById('yonge5959-pdf-file-info');
    if (fileInfo && currentFile) {
        fileInfo.innerHTML = `
            <span class="pdf-file-name">${currentFile.name}</span>
            <span class="pdf-file-counter">${index + 1} of ${files.length}</span>
        `;
    }
}

function handleYonge5959PdfKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeYonge5959PdfModal();
            break;
        case 'ArrowUp':
            navigateYonge5959Pdf('prev');
            break;
        case 'ArrowDown':
            navigateYonge5959Pdf('next');
            break;
    }
}

// Legacy function for backward compatibility
function openPdfViewer(pdfPath, event) {
    if (event) event.stopPropagation();
    openHydroponicPdfModal(pdfPath);
}
