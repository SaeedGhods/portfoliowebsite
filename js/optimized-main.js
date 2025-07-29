/**
 * Optimized Main JavaScript for Saeed Ghods Portfolio Website
 * This file consolidates functionality from multiple JavaScript files
 * while maintaining the same UI/UX and layout.
 */

// DOM utility functions
const DOM = {
    getById: (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
        }
        return element;
    },
    
    query: (selector, parent = document) => {
        const element = parent.querySelector(selector);
        if (!element) {
            console.warn(`Element with selector "${selector}" not found`);
        }
        return element;
    },
    
    queryAll: (selector, parent = document) => {
        return parent.querySelectorAll(selector);
    },
    
    // Create element with attributes and event listeners
    createElement: (tag, attributes = {}, events = {}) => {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === "className") {
                element.className = value;
            } else if (key === "innerHTML") {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Add event listeners
        Object.entries(events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
        
        return element;
    }
};

// Timeline functionality
const Timeline = {
    toggleExpandable: (header) => {
        const expandable = header.nextElementSibling?.nextElementSibling;
        if (expandable) {
            expandable.classList.toggle("expanded");
        }
    },
    
    init: () => {
        // Update click handlers for all clickable events
        DOM.queryAll(".clickable-event").forEach(event => {
            const contentId = event.getAttribute("data-content");
            event.addEventListener("click", (e) => {
                e.preventDefault();
                Content.showContent(contentId);
            });
        });
        
        // Add click handlers for timeline headers
        DOM.queryAll(".timeline-header").forEach(header => {
            if (!header.hasAttribute("onclick")) {
                header.addEventListener("click", () => Timeline.toggleExpandable(header));
            }
        });
    }
};

// Content display functionality
const Content = {
    showContent: (contentId) => {
        // Hide all content sections
        DOM.queryAll(".event-content").forEach(content => {
            content.style.display = "none";
        });
        
        // Deactivate all events
        DOM.queryAll(".clickable-event").forEach(event => {
            event.classList.remove("active");
        });
        
        // Show the selected content
        const contentElement = DOM.getById(contentId);
        if (contentElement) {
            contentElement.style.display = "block";
            
            // Activate the clicked event
            const eventElement = DOM.query(`[data-content="${contentId}"]`);
            if (eventElement) {
                eventElement.classList.add("active");
            }
            
            // Scroll to the content
            contentElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
};

// Tab switching functionality
const Tabs = {
    switchTab: (event, tabId) => {
        // Prevent default link behavior
        if (event) event.preventDefault();
        
        // Hide all tab content
        DOM.queryAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });
        
        // Deactivate all tab links
        DOM.queryAll(".tab-link").forEach(link => {
            link.classList.remove("active");
        });
        
        // Show the selected tab
        const tabElement = DOM.getById(tabId);
        if (tabElement) {
            tabElement.style.display = "block";
            
            // Activate the clicked tab link
            const linkElement = event ? event.target : DOM.query(`[href="#${tabId}"]`);
            if (linkElement) {
                linkElement.classList.add("active");
            }
        }
    },
    
    switchPortfolioVersion: (event, versionId) => {
        // Prevent default link behavior
        if (event) event.preventDefault();
        
        // Hide all version content
        DOM.queryAll(".version-content").forEach(version => {
            version.style.display = "none";
        });
        
        // Deactivate all version cards
        DOM.queryAll(".version-card").forEach(card => {
            card.classList.remove("active");
        });
        
        // Show the selected version
        const versionElement = DOM.getById(versionId);
        if (versionElement) {
            versionElement.style.display = "block";
            
            // Activate the clicked version card
            const cardElement = event ? event.target.closest(".version-card") : DOM.query(`[data-version="${versionId}"]`);
            if (cardElement) {
                cardElement.classList.add("active");
            }
        }
    }
};

// PDF viewer functionality
const PDFViewer = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.5,
    
    openPdfViewer: (pdfUrl, event) => {
        // Prevent default link behavior
        if (event) event.preventDefault();
        
        // Show the modal
        const pdfModal = DOM.getById("pdfModal");
        if (pdfModal) {
            pdfModal.style.display = "flex";
        }
        
        // Load the PDF
        pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc => {
            PDFViewer.pdfDoc = pdfDoc;
            PDFViewer.pageNum = 1;
            PDFViewer.renderPage(PDFViewer.pageNum);
            
            // Update page count
            const pageCount = DOM.getById("page-count");
            if (pageCount) {
                pageCount.textContent = pdfDoc.numPages;
            }
        }).catch(error => {
            console.error("Error loading PDF:", error);
        });
    },
    
    renderPage: (num) => {
        PDFViewer.pageRendering = true;
        
        // Update page number
        const pageNum = DOM.getById("page-num");
        if (pageNum) {
            pageNum.textContent = num;
        }
        
        // Get the page
        PDFViewer.pdfDoc.getPage(num).then(page => {
            const canvas = DOM.getById("pdf-canvas");
            if (!canvas) return;
            
            const ctx = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: PDFViewer.scale });
            
            // Set canvas dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // Render the page
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            
            const renderTask = page.render(renderContext);
            
            // Wait for rendering to finish
            renderTask.promise.then(() => {
                PDFViewer.pageRendering = false;
                
                // Check if there's a pending page
                if (PDFViewer.pageNumPending !== null) {
                    PDFViewer.renderPage(PDFViewer.pageNumPending);
                    PDFViewer.pageNumPending = null;
                }
            });
        });
    },
    
    prevPage: () => {
        if (PDFViewer.pageNum <= 1) return;
        PDFViewer.pageNum--;
        PDFViewer.renderPage(PDFViewer.pageNum);
    },
    
    nextPage: () => {
        if (PDFViewer.pageNum >= PDFViewer.pdfDoc.numPages) return;
        PDFViewer.pageNum++;
        PDFViewer.renderPage(PDFViewer.pageNum);
    },
    
    closePdfViewer: () => {
        const pdfModal = DOM.getById("pdfModal");
        if (pdfModal) {
            pdfModal.style.display = "none";
        }
        
        // Reset PDF viewer
        PDFViewer.pdfDoc = null;
        PDFViewer.pageNum = 1;
    }
};

// Animation functionality
const Animation = {
    initSelfieAnimation: () => {
        const bpm = 69.420;
        const selfiesContainer = DOM.query(".selfies-container");
        if (!selfiesContainer) return;
        
        // Calculate animation duration based on BPM
        const beatDuration = 60 / bpm;
        const animationDuration = beatDuration * 4;
        
        // Set animation duration
        selfiesContainer.style.setProperty("--animation-duration", `${animationDuration}s`);
        
        // Start animation
        setTimeout(() => {
            selfiesContainer.classList.add("animate");
        }, 1000);
    }
};

// Gallery functionality - Optimized from common-gallery.js
class GalleryManager {
    constructor() {
        // Create modal elements once for all galleries
        this.createModal();
        
        // Track loaded galleries to avoid re-initialization
        this.initializedGalleries = new Set();
        
        // Track current modal state
        this.currentImages = null;
        this.currentIndex = 0;
        this.isModalActive = false;
        
        // Bind keyboard event listeners
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        
        // Track loading state
        this.loadingGalleries = new Set();
    }
    
    createModal() {
        // Create modal container
        this.modal = DOM.createElement("div", { className: "gallery-modal" });
        
        // Create modal content
        const modalContent = DOM.createElement("div", { className: "gallery-modal-content" });
        
        // Create close button
        const closeBtn = DOM.createElement("div", 
            { className: "gallery-modal-close", innerHTML: "&times;" }, 
            { click: () => this.closeModal() }
        );
        
        // Create image element
        this.modalImg = DOM.createElement("img", { className: "gallery-modal-img" });
        
        // Create navigation buttons
        this.prevBtn = DOM.createElement("div", 
            { className: "gallery-modal-nav gallery-modal-prev", innerHTML: "&#10094;" }, 
            { click: () => this.showPrevImage() }
        );
        
        this.nextBtn = DOM.createElement("div", 
            { className: "gallery-modal-nav gallery-modal-next", innerHTML: "&#10095;" }, 
            { click: () => this.showNextImage() }
        );
        
        // Create image counter
        this.counter = DOM.createElement("div", { className: "gallery-modal-counter" });
        
        // Assemble modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(this.modalImg);
        modalContent.appendChild(this.prevBtn);
        modalContent.appendChild(this.nextBtn);
        modalContent.appendChild(this.counter);
        this.modal.appendChild(modalContent);
        
        // Add modal to document
        document.body.appendChild(this.modal);
    }
    
    handleKeyDown(e) {
        if (!this.isModalActive) return;
        
        switch (e.key) {
            case "Escape":
                this.closeModal();
                break;
            case "ArrowLeft":
                this.showPrevImage();
                break;
            case "ArrowRight":
                this.showNextImage();
                break;
        }
    }
    
    initGallery(galleryId, images) {
        // Skip if already initialized
        if (this.initializedGalleries.has(galleryId)) return;
        
        const galleryContainer = DOM.getById(galleryId);
        if (!galleryContainer) {
            console.warn(`Gallery container with ID "${galleryId}" not found`);
            return;
        }
        
        // Mark gallery as loading
        this.loadingGalleries.add(galleryId);
        
        // Create loading indicator
        const loadingIndicator = DOM.createElement("div", { 
            className: "gallery-loading-indicator",
            innerHTML: "<div class=\"gallery-loading-spinner\"></div><p>Loading Gallery...</p>"
        });
        
        galleryContainer.appendChild(loadingIndicator);
        
        // Track loaded images
        let loadedCount = 0;
        const totalImages = images.length;
        
        // Create gallery items
        images.forEach((image, index) => {
            // Create gallery item
            const galleryItem = DOM.createElement("div", { className: "gallery-item" });
            
            // Create image element
            const img = DOM.createElement("img", { 
                src: image.src,
                alt: image.alt || `Gallery image ${index + 1}`
            });
            
            // Create image number
            const imageNumber = DOM.createElement("div", { 
                className: "image-number",
                innerHTML: `${index + 1}`
            });
            
            // Add event listeners
            galleryItem.addEventListener("click", () => {
                this.openModal(images, index);
            });
            
            // Handle image load
            img.addEventListener("load", () => {
                loadedCount++;
                
                // Check if all images are loaded
                if (loadedCount === totalImages) {
                    // Remove loading indicator
                    loadingIndicator.remove();
                    
                    // Show gallery
                    galleryContainer.style.opacity = "1";
                    
                    // Mark gallery as loaded
                    this.loadingGalleries.delete(galleryId);
                }
            });
            
            // Handle image error
            img.addEventListener("error", () => {
                // Replace with placeholder
                img.src = getAssetUrl("placeholder.jpg");
                img.alt = "Image failed to load";
                
                loadedCount++;
                
                // Check if all images are loaded
                if (loadedCount === totalImages) {
                    // Remove loading indicator
                    loadingIndicator.remove();
                    
                    // Show gallery
                    galleryContainer.style.opacity = "1";
                    
                    // Mark gallery as loaded
                    this.loadingGalleries.delete(galleryId);
                }
            });
            
            // Assemble gallery item
            galleryItem.appendChild(img);
            galleryItem.appendChild(imageNumber);
            galleryContainer.appendChild(galleryItem);
        });
        
        // Mark gallery as initialized
        this.initializedGalleries.add(galleryId);
    }
    
    openModal(images, index) {
        this.currentImages = images;
        this.currentIndex = index;
        
        // Show modal
        this.modal.style.display = "flex";
        this.isModalActive = true;
        
        // Show image
        this.showImage(index);
    }
    
    showImage(index) {
        if (!this.currentImages) return;
        
        // Update current index
        this.currentIndex = index;
        
        // Update image
        const image = this.currentImages[index];
        this.modalImg.src = image.src;
        this.modalImg.alt = image.alt || `Gallery image ${index + 1}`;
        
        // Update counter
        this.counter.textContent = `${index + 1} / ${this.currentImages.length}`;
    }
    
    showPrevImage() {
        if (!this.currentImages) return;
        
        // Calculate previous index
        const prevIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
        
        // Show previous image
        this.showImage(prevIndex);
    }
    
    showNextImage() {
        if (!this.currentImages) return;
        
        // Calculate next index
        const nextIndex = (this.currentIndex + 1) % this.currentImages.length;
        
        // Show next image
        this.showImage(nextIndex);
    }
    
    closeModal() {
        // Hide modal
        this.modal.style.display = "none";
        this.isModalActive = false;
    }
}

// Create a single instance to be used by all galleries
const galleryManager = new GalleryManager();

// Cache busting functionality
const CacheBuster = {
    apply: () => {
        // Add timestamp to all image URLs
        const timestamp = new Date().getTime();
        
        // Apply to all images
        DOM.queryAll("img").forEach(img => {
            // Skip images that already have a timestamp or are data URLs
            if (img.src.includes("?t=") || img.src.startsWith("data:")) return;
            
            // Add timestamp
            img.src = `${img.src}?t=${timestamp}`;
        });
        
        // Apply to all CSS backgrounds
        DOM.queryAll("[style*=\"background-image\"]").forEach(element => {
            const style = element.getAttribute("style");
            if (!style) return;
            
            // Skip elements that already have a timestamp or are data URLs
            if (style.includes("?t=") || style.includes("data:")) return;
            
            // Add timestamp
            const newStyle = style.replace(/url\(['"]?([^'"]+)['"]?\)/g, `url($1?t=${timestamp})`);
            element.setAttribute("style", newStyle);
        });
    }
};

// Fix for gallery hover effects
const GalleryFixes = {
    applyHoverFix: () => {
        // Ensure all gallery items maintain the 5-column grid layout
        DOM.queryAll(".gallery-container").forEach(container => {
            container.style.gridTemplateColumns = "repeat(5, 1fr) !important";
            container.style.width = "62.5%";
        });
        
        // Ensure images don't scale on hover
        const style = document.createElement("style");
        style.textContent = `
            .gallery-item {
                transform: none !important;
                scale: 1 !important;
                transition: none !important;
            }
            
            .gallery-item img,
            .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
            }
            
            .gallery-item:hover,
            .gallery-item:hover img,
            .gallery-item:hover .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
            }
        `;
        
        document.head.appendChild(style);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize timeline functionality
    Timeline.init();
    
    // Initialize tab functionality
    const defaultTab = DOM.query(".tab-link");
    if (defaultTab) {
        Tabs.switchTab(null, defaultTab.getAttribute("href").substring(1));
    }
    
    // Initialize portfolio version
    const defaultVersion = DOM.query(".version-card");
    if (defaultVersion) {
        Tabs.switchPortfolioVersion(null, defaultVersion.getAttribute("data-version"));
    }
    
    // Initialize animation
    Animation.initSelfieAnimation();
    
    // Apply gallery fixes
    GalleryFixes.applyHoverFix();
    
    // Apply cache busting
    CacheBuster.apply();
    
    // Initialize reload button
    const reloadButton = DOM.getById("reload-button");
    if (reloadButton) {
        reloadButton.addEventListener("click", () => {
            // Clear cache
            localStorage.clear();
            sessionStorage.clear();
            
            // Reload page
            window.location.reload(true);
        });
    }
});

// Expose global functions for HTML onclick attributes
window.toggleExpandable = Timeline.toggleExpandable;
window.showContent = Content.showContent;
window.switchTab = Tabs.switchTab;
window.switchPortfolioVersion = Tabs.switchPortfolioVersion;
window.openPdfViewer = PDFViewer.openPdfViewer;
window.prevPage = PDFViewer.prevPage;
window.nextPage = PDFViewer.nextPage;
window.closePdfViewer = PDFViewer.closePdfViewer;

// Expose the gallery manager to the global scope for other scripts to use
window.galleryManager = galleryManager;
