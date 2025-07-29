/**
 * Main JavaScript for Saeed Ghods Portfolio Website
 * This file contains all the core functionality for the website including:
 * - Timeline item expansion
 * - Content display
 * - Tab switching
 * - PDF viewer
 * - Profile interactions
 */

// DOM utility functions
const DOM = {
    // Get element by ID with error handling
    getById: (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
        }
        return element;
    },
    
    // Query selector with error handling
    query: (selector, parent = document) => {
        const element = parent.querySelector(selector);
        if (!element) {
            console.warn(`Element with selector "${selector}" not found`);
        }
        return element;
    },
    
    // Query selector all with error handling
    queryAll: (selector, parent = document) => {
        return parent.querySelectorAll(selector);
    }
};

// Timeline functionality
const Timeline = {
    // Toggle expandable sections
    toggleExpandable: (header) => {
        const expandable = header.nextElementSibling?.nextElementSibling;
        if (expandable) {
            expandable.classList.toggle("expanded");
        }
    },
    
    // Initialize timeline functionality
    init: () => {
        // Update click handlers for all clickable events
        DOM.queryAll(".clickable-event").forEach(event => {
            const contentId = event.getAttribute("data-content");
            if (contentId) {
                event.onclick = (e) => {
                    e.stopPropagation();
                    Content.showContent(contentId);
                };
            }
        });
        
        // Profile click handler
        const profileImage = DOM.query(".profile-image");
        const timelines = DOM.queryAll(".timeline");
        
        // Initially hide all timelines
        timelines.forEach(timeline => {
            timeline.classList.remove("active");
        });
        
        if (profileImage) {
            profileImage.addEventListener("click", () => {
                timelines.forEach(timeline => {
                    timeline.classList.add("active");
                });
            });
        }
    }
};

// Content display functionality
const Content = {
    // Show content for a specific ID
    showContent: (contentId) => {
        // Get the selected content
        const selectedContent = DOM.getById(contentId);
        
        if (selectedContent && selectedContent.style.display === "block") {
            // If already visible, hide it
            selectedContent.style.display = "none";
            return;
        }
        
        // Hide all event content first
        DOM.queryAll(".event-content").forEach(content => {
            content.style.display = "none";
        });

        // Show the selected content
        if (selectedContent) {
            selectedContent.style.display = "block";
            
            // Initialize specific galleries with a small delay to ensure container is visible
            if (contentId === "asia") {
                setTimeout(() => {
                    const loadStudyAbroadGallery = window.loadStudyAbroadGallery;
                    if (typeof loadStudyAbroadGallery === "function") {
                        loadStudyAbroadGallery();
                    }
                }, 100);
            }
            
            if (contentId === "glass-pavilion") {
                setTimeout(() => {
                    const loadAllGlassOrigamiImages = window.loadAllGlassOrigamiImages;
                    if (typeof loadAllGlassOrigamiImages === "function") {
                        loadAllGlassOrigamiImages();
                    }
                }, 100);
            }
            
            if (contentId === "lifeguard-station") {
                setTimeout(() => {
                    const loadAllLifeguardStationImages = window.loadAllLifeguardStationImages;
                    if (typeof loadAllLifeguardStationImages === "function") {
                        loadAllLifeguardStationImages();
                    }
                }, 100);
            }
        }
        
        // Update the content display
        const contentDisplay = DOM.query(".content-display");
        if (contentDisplay) {
            contentDisplay.style.display = "block";
        }
    }
};

// Tab switching functionality
const Tabs = {
    // Switch between tabs
    switchTab: (event, tabId) => {
        event.stopPropagation();
        
        // Get the parent container of tabs
        const tabsContainer = event.target.closest(".event-content") || event.target.closest(".documentation-section");
        
        if (!tabsContainer) {
            console.warn("Tab container not found");
            return;
        }
        
        // Hide all tab contents
        const tabContents = DOM.queryAll(".tab-content", tabsContainer);
        tabContents.forEach(content => {
            content.classList.remove("active");
        });
        
        // Deactivate all tab buttons
        const tabButtons = DOM.queryAll(".tab-button", tabsContainer);
        tabButtons.forEach(button => {
            button.classList.remove("active");
        });
        
        // Show the selected tab content and activate the button
        const selectedTab = DOM.query("#" + tabId, tabsContainer);
        if (selectedTab) {
            selectedTab.classList.add("active");
        }
        event.target.classList.add("active");
    },
    
    // Switch between portfolio versions
    switchPortfolioVersion: (event, versionId) => {
        event.stopPropagation();
        
        // Show the full view
        const viewer = DOM.getById("portfolio-viewer");
        if (viewer) {
            viewer.style.display = "block";
        }
        
        // Update iframe source and link
        const frame = DOM.getById("portfolio-frame");
        const link = DOM.getById("portfolio-link");
        const path = `portfolio/THESIS/docs/${versionId === "portfolio-02" ? "2016-02-28 502B PORTFOLIO 02.pdf" : "2016-01-13 502B PORTFOLIO 03.pdf"}`;
        
        if (frame) frame.src = path;
        if (link) link.href = path;
        
        // Update cards visual state
        const cards = DOM.queryAll(".version-card");
        cards.forEach(card => {
            card.style.opacity = "0.7";
            card.style.transform = "none";
        });
        event.currentTarget.style.opacity = "1";
        event.currentTarget.style.transform = "translateY(-2px)";
    }
};

// PDF viewer functionality
const PDFViewer = {
    pdfDoc: null,
    pageNum: 1,
    
    // Open PDF viewer
    openPdfViewer: (pdfUrl, event) => {
        // Prevent the click event from bubbling up to project handlers
        event.stopPropagation();
        
        const modal = DOM.getById("pdfModal");
        
        if (!modal) {
            console.error("PDF Modal not found");
            return;
        }
        
        // Load the PDF if PDF.js is available
        if (typeof pdfjsLib !== "undefined") {
            pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
                PDFViewer.pdfDoc = pdf;
                PDFViewer.pageNum = 1;
                PDFViewer.renderPage(PDFViewer.pageNum);
            }).catch(function(error) {
                console.error("Error loading PDF:", error);
            });
        } else {
            console.error("PDF.js library not loaded");
        }
        
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    },
    
    // Render PDF page
    renderPage: (num) => {
        if (!PDFViewer.pdfDoc) {
            console.error("No PDF document loaded");
            return;
        }
        
        PDFViewer.pdfDoc.getPage(num).then(function(page) {
            const canvas = DOM.getById("pdf-canvas");
            if (!canvas) {
                console.error("PDF canvas not found");
                return;
            }
            
            const ctx = canvas.getContext("2d");
            
            const viewport = page.getViewport({scale: 1.5});
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
            
            const pageNum = DOM.getById("page-num");
            const pageCount = DOM.getById("page-count");
            
            if (pageNum) pageNum.textContent = PDFViewer.pageNum;
            if (pageCount) pageCount.textContent = PDFViewer.pdfDoc.numPages;
        }).catch(function(error) {
            console.error("Error rendering PDF page:", error);
        });
    },
    
    // Navigate to previous page
    prevPage: () => {
        if (!PDFViewer.pdfDoc || PDFViewer.pageNum <= 1) return;
        PDFViewer.pageNum--;
        PDFViewer.renderPage(PDFViewer.pageNum);
    },
    
    // Navigate to next page
    nextPage: () => {
        if (!PDFViewer.pdfDoc || PDFViewer.pageNum >= PDFViewer.pdfDoc.numPages) return;
        PDFViewer.pageNum++;
        PDFViewer.renderPage(PDFViewer.pageNum);
    },
    
    // Close PDF viewer
    closePdfViewer: () => {
        const modal = DOM.getById("pdfModal");
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
};

// Animation functionality
const Animation = {
    // Initialize selfie animation
    initSelfieAnimation: () => {
        const bpm = 69.420;
        const msPerBeat = (60 / bpm) * 1000;
        const selfiesContainer = DOM.query(".selfies-container");
        let currentSelfie = 0;
        
        if (selfiesContainer) {
            setInterval(() => {
                const selfieImages = DOM.queryAll(".selfie-image", selfiesContainer);
                if (selfieImages.length > 0) {
                    selfieImages[currentSelfie].classList.remove("active");
                    currentSelfie = (currentSelfie + 1) % selfieImages.length;
                    selfieImages[currentSelfie].classList.add("active");
                }
            }, msPerBeat);
        }
    }
};

// Fix for gallery hover effects
const GalleryFixes = {
    applyHoverFix: () => {
        const style = document.createElement("style");
        style.textContent = `
            .gallery-item:hover img {
                filter: saturate(1) !important;
                transform: none !important;
            }
            .gallery-item img {
                transform: none !important;
                border: none !important;
            }
            .gallery-container {
                gap: 0 !important;
                border: none !important;
            }
            .gallery-item {
                border: none !important;
                margin: 0 !important;
            }
        `;
        document.head.appendChild(style);
    }
};



// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize timeline functionality
    Timeline.init();
    
    // Initialize selfie animation
    Animation.initSelfieAnimation();
    
    // Apply gallery hover fixes
    GalleryFixes.applyHoverFix();
    

    
    // Expose global functions
    window.toggleExpandable = Timeline.toggleExpandable;
    window.showContent = Content.showContent;
    window.switchTab = Tabs.switchTab;
    window.switchPortfolioVersion = Tabs.switchPortfolioVersion;
    window.openPdfViewer = PDFViewer.openPdfViewer;
    window.prevPage = PDFViewer.prevPage;
    window.nextPage = PDFViewer.nextPage;
    window.closePdfViewer = PDFViewer.closePdfViewer;
});


