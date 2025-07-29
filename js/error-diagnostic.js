/**
 * Web Portfolio Diagnostic Tool
 * 
 * This script checks for common errors and layout issues with the portfolio website,
 * particularly focused on ensuring all galleries maintain the 5-column layout
 * and consistent styling across the portfolio.
 */

(function() {
    console.log("%c Gallery Diagnostic Tool - Running Diagnostics", "background: #333; color: #bada55; font-size: 16px; padding: 5px;");

    // Array to store all errors and warnings
    const issues = [];
    
    // Create visual indicator of diagnostic mode
    function createDiagnosticIndicator() {
        const indicator = document.createElement("div");
        indicator.id = "diagnostic-indicator";
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: #bada55;
            font-family: monospace;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 9999;
            max-width: 300px;
            max-height: 400px;
            overflow: auto;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            font-size: 12px;
            line-height: 1.4;
        `;
        indicator.innerHTML = "<h3 style=\"margin: 0 0 10px 0; color: #ff6b6b;\">Diagnostic Mode Active</h3>" +
                            "<div id=\"diagnostic-issues\">Running checks...</div>" +
                            "<div style=\"margin-top: 10px; font-size: 10px;\">Click to expand/collapse</div>";
        
        // Toggle expanded state on click
        indicator.addEventListener("click", function(e) {
            if (e.target.tagName !== "BUTTON") {
                this.classList.toggle("expanded");
                if (this.classList.contains("expanded")) {
                    this.style.maxHeight = "80vh";
                    this.style.maxWidth = "500px";
                } else {
                    this.style.maxHeight = "400px";
                    this.style.maxWidth = "300px";
                }
            }
        });
        
        document.body.appendChild(indicator);
        return indicator;
    }
    
    // Add issue to the diagnostic panel
    function addIssue(type, message, element = null) {
        const issue = { type, message, element };
        issues.push(issue);
        
        if (type === "error") {
            console.error("%c ERROR: " + message, "color: #ff6b6b;", element);
        } else if (type === "warning") {
            console.warn("%c WARNING: " + message, "color: #ffd966;", element);
        } else {
            console.info("%c INFO: " + message, "color: #66c2ff;", element);
        }
        
        updateDiagnosticPanel();
    }
    
    // Update the diagnostic panel with current issues
    function updateDiagnosticPanel() {
        const panel = document.getElementById("diagnostic-issues");
        if (!panel) return;
        
        if (issues.length === 0) {
            panel.innerHTML = "<p style=\"color: #66c2ff;\">No issues detected!</p>";
            return;
        }
        
        let html = "";
        
        // Count issues by type
        const errorCount = issues.filter(i => i.type === "error").length;
        const warningCount = issues.filter(i => i.type === "warning").length;
        const infoCount = issues.filter(i => i.type === "info").length;
        
        html += `<div style="margin-bottom: 10px;">
                    <span style="color: #ff6b6b; font-weight: bold;">Errors: ${errorCount}</span> | 
                    <span style="color: #ffd966; font-weight: bold;">Warnings: ${warningCount}</span> | 
                    <span style="color: #66c2ff; font-weight: bold;">Info: ${infoCount}</span>
                </div>`;
        
        // Add fix all button if there are errors/warnings
        if (errorCount > 0 || warningCount > 0) {
            html += `<button id="fix-all-button" style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                margin-bottom: 10px;
                font-size: 12px;
            ">Fix All Issues</button>`;
        }
        
        // List all issues
        html += "<ul style=\"padding-left: 20px; margin-top: 10px;\">";
        
        issues.forEach((issue, index) => {
            const color = issue.type === "error" ? "#ff6b6b" : (issue.type === "warning" ? "#ffd966" : "#66c2ff");
            const prefix = issue.type.toUpperCase();
            
            html += `<li style="margin-bottom: 5px; color: ${color};">
                        <strong>[${prefix}]</strong> ${issue.message}
                        ${issue.element ? `<button class="inspect-button" data-index="${index}" style="
                            background: #007BFF;
                            color: white;
                            border: none;
                            padding: 2px 5px;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-left: 5px;
                            font-size: 10px;
                        ">Inspect</button>` : ""}
                        ${issue.fixable ? `<button class="fix-button" data-index="${index}" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 2px 5px;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-left: 5px;
                            font-size: 10px;
                        ">Fix</button>` : ""}
                    </li>`;
        });
        
        html += "</ul>";
        panel.innerHTML = html;
        
        // Add event listeners to buttons
        setTimeout(() => {
            const inspectButtons = document.querySelectorAll(".inspect-button");
            inspectButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.stopPropagation();
                    const index = parseInt(this.getAttribute("data-index"));
                    const issue = issues[index];
                    if (issue && issue.element) {
                        console.log("Inspecting element:", issue.element);
                        issue.element.style.outline = "2px solid red";
                        issue.element.scrollIntoView({ behavior: "smooth", block: "center" });
                        setTimeout(() => {
                            issue.element.style.outline = "";
                        }, 3000);
                    }
                });
            });
            
            const fixButtons = document.querySelectorAll(".fix-button");
            fixButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.stopPropagation();
                    const index = parseInt(this.getAttribute("data-index"));
                    const issue = issues[index];
                    if (issue && issue.fix) {
                        issue.fix();
                        // Remove the fixed issue
                        issues.splice(index, 1);
                        updateDiagnosticPanel();
                    }
                });
            });
            
            const fixAllButton = document.getElementById("fix-all-button");
            if (fixAllButton) {
                fixAllButton.addEventListener("click", function(e) {
                    e.stopPropagation();
                    fixAllIssues();
                });
            }
        }, 100);
    }
    
    // Fix all fixable issues
    function fixAllIssues() {
        console.log("Attempting to fix all issues...");
        
        // Copy array because we'll be removing items
        const issuesCopy = [...issues];
        
        // Fix each issue that has a fix function
        issuesCopy.forEach(issue => {
            if (issue.fix) {
                issue.fix();
                // Remove the issue from the array
                const index = issues.indexOf(issue);
                if (index !== -1) {
                    issues.splice(index, 1);
                }
            }
        });
        
        // Update the panel
        updateDiagnosticPanel();
        
        // Add a info message about what was fixed
        const fixedCount = issuesCopy.filter(issue => issue.fix).length;
        if (fixedCount > 0) {
            addIssue("info", `Fixed ${fixedCount} issues automatically`);
        } else {
            addIssue("info", "No automatically fixable issues found");
        }
    }
    
    // Check gallery layouts for adherence to 5-column grid
    function checkGalleryLayouts() {
        console.log("Checking gallery layouts...");
        
        // Expected gallery IDs
        const expectedGalleries = [
            "teslaNorthHollywoodGallery",
            "gigaAustinGallery",
            "cybermaskGallery",
            "ventGallery",
            "wwrenoGallery",
            "weRobotGallery",
            "modelXFianceGallery",
            "hydroponicGallery",
            "familyHomeGallery"
        ];
        
        // Check if all expected galleries exist
        expectedGalleries.forEach(galleryId => {
            const gallery = document.getElementById(galleryId);
            
            if (!gallery) {
                addIssue("warning", `Gallery with ID '${galleryId}' not found on the page`);
                return;
            }
            
            // Check if gallery has the right class
            if (!gallery.classList.contains("gallery-container")) {
                addIssue("error", `Gallery '${galleryId}' is missing the 'gallery-container' class`, gallery, true);
                
                // Add ability to fix this issue
                issues[issues.length - 1].fix = function() {
                    gallery.className = "gallery-container";
                    addIssue("info", `Fixed: Added 'gallery-container' class to '${galleryId}'`);
                };
                issues[issues.length - 1].fixable = true;
            }
            
            // Check for grid-template-columns
            const computedStyle = window.getComputedStyle(gallery);
            const gridColumns = computedStyle.getPropertyValue("grid-template-columns");
            
            // Check if it's actually displayed as a grid
            const display = computedStyle.getPropertyValue("display");
            if (display !== "grid") {
                addIssue("error", `Gallery '${galleryId}' is not displayed as a grid (current: ${display})`, gallery, true);
                
                // Add ability to fix this issue
                issues[issues.length - 1].fix = function() {
                    gallery.style.display = "grid";
                    addIssue("info", `Fixed: Set display to 'grid' for '${galleryId}'`);
                };
                issues[issues.length - 1].fixable = true;
            }
            
            // Check if it has 5 columns
            if (!gridColumns.includes("repeat(5,") && !gridColumns.includes("repeat(5, ") && gridColumns.split(" ").length !== 5) {
                addIssue("error", `Gallery '${galleryId}' does not have 5 columns (current: ${gridColumns})`, gallery, true);
                
                // Add ability to fix this issue
                issues[issues.length - 1].fix = function() {
                    gallery.style.gridTemplateColumns = "repeat(5, 1fr)";
                    addIssue("info", `Fixed: Set grid to 5 columns for '${galleryId}'`);
                };
                issues[issues.length - 1].fixable = true;
            }
            
            // Check width
            const width = computedStyle.getPropertyValue("width");
            if (width !== "62.5%") {
                addIssue("warning", `Gallery '${galleryId}' does not have width: 62.5% (current: ${width})`, gallery, true);
                
                // Add ability to fix this issue
                issues[issues.length - 1].fix = function() {
                    gallery.style.width = "62.5%";
                    addIssue("info", `Fixed: Set width to 62.5% for '${galleryId}'`);
                };
                issues[issues.length - 1].fixable = true;
            }
            
            // Check if gallery has any items
            if (gallery.children.length === 0) {
                addIssue("warning", `Gallery '${galleryId}' is empty`, gallery);
            }
        });
        
        // Look for elements with gallery-container class that aren't in expected IDs
        const allGalleryContainers = document.querySelectorAll(".gallery-container");
        allGalleryContainers.forEach(container => {
            if (!expectedGalleries.includes(container.id)) {
                addIssue("info", `Found gallery container with ID '${container.id || "none"}' (not in expected list)`, container);
            }
        });
    }
    
    // Check for CSS issues related to hover effects
    function checkHoverEffects() {
        console.log("Checking hover effects...");
        
        // Look for all gallery items
        const galleryItems = document.querySelectorAll(".gallery-item");
        
        if (galleryItems.length === 0) {
            addIssue("warning", "No gallery items found on the page");
            return;
        }
        
        // Sample a few gallery items to check their hover styles
        const sampleItems = Array.from(galleryItems).slice(0, Math.min(5, galleryItems.length));
        
        sampleItems.forEach(item => {
            // Check if transform or scale is being used on hover
            const hoverStyle = document.createElement("style");
            document.head.appendChild(hoverStyle);
            
            // Test for transform property
            let hasTransform = false;
            let hasScale = false;
            
            try {
                // Add a test rule
                hoverStyle.sheet.insertRule(".gallery-item-test-hover { }", 0);
                
                // Apply hover state style to our test rule
                Object.values(document.styleSheets).forEach(stylesheet => {
                    try {
                        Array.from(stylesheet.cssRules).forEach(rule => {
                            if (rule.selectorText && 
                                (rule.selectorText.includes(".gallery-item:hover") || 
                                 rule.selectorText.includes(".gallery-item .gallery-item-img:hover") ||
                                 rule.selectorText.includes(".gallery-item img:hover"))) {
                                
                                const cssText = rule.cssText;
                                if (cssText.includes("transform:") && !cssText.includes("transform: none")) {
                                    hasTransform = true;
                                }
                                if (cssText.includes("scale(") && !cssText.includes("scale(1)")) {
                                    hasScale = true;
                                }
                            }
                        });
                    } catch (e) {
                        // Cross-origin stylesheet, skip
                    }
                });
            } catch (e) {
                console.error("Error checking hover styles:", e);
            } finally {
                // Clean up
                document.head.removeChild(hoverStyle);
            }
            
            if (hasTransform || hasScale) {
                addIssue("error", "Gallery items have transform or scale effects on hover which is not allowed", item, true);
                
                // Add ability to fix this issue
                issues[issues.length - 1].fix = function() {
                    const styleEl = document.createElement("style");
                    styleEl.textContent = `
                        .gallery-item,
                        .gallery-item img,
                        .gallery-item-img {
                            transform: none !important;
                            scale: 1 !important;
                            transition: none !important;
                        }
                        
                        .gallery-item:hover,
                        .gallery-item:hover img,
                        .gallery-item:hover .gallery-item-img {
                            transform: none !important;
                            scale: 1 !important;
                        }
                    `;
                    document.head.appendChild(styleEl);
                    addIssue("info", "Fixed: Removed transform and scale effects on gallery items");
                };
                issues[issues.length - 1].fixable = true;
                
                // Only need to check once
                return; // Exit the function instead of using break
            }
        });
    }
    
    // Check if mandatory scripts are loaded
    function checkScriptsLoaded() {
        console.log("Checking essential scripts...");
        
        // List of essential scripts
        const essentialScripts = [
            { name: "common-gallery.js", global: "galleryManager" },
            { name: "tesla-gallery.css", test: () => document.querySelector("link[href*=\"tesla-gallery.css\"]") !== null }
        ];
        
        essentialScripts.forEach(script => {
            if (script.global && typeof window[script.global] === "undefined") {
                addIssue("error", `Essential script '${script.name}' is not loaded (${script.global} not defined)`);
            } else if (script.test && !script.test()) {
                addIssue("error", `Essential stylesheet '${script.name}' is not loaded`);
            }
        });
    }
    
    // Inject our CSS fixes if needed
    function injectCssFixes() {
        console.log("Injecting preventative CSS fixes...");
        
        const styleEl = document.createElement("style");
        styleEl.id = "diagnostic-preventative-fixes";
        styleEl.textContent = `
            /* Ensure all galleries use a 5-column grid layout */
            .gallery-container,
            #teslaNorthHollywoodGallery,
            #gigaAustinGallery, 
            #cybermaskGallery,
            #wwrenoGallery,
            #weRobotGallery,
            #modelXFianceGallery,
            #ventGallery,
            #hydroponicGallery,
            #familyHomeGallery {
                display: grid !important;
                grid-template-columns: repeat(5, 1fr) !important;
                gap: 0 !important;
                width: 62.5% !important;
                margin: 20px 0 !important;
            }
            
            /* Fix for images scaling on hover */
            .gallery-item,
            .gallery-item img,
            .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
                transition: none !important;
            }
            
            .gallery-item:hover,
            .gallery-item:hover img,
            .gallery-item:hover .gallery-item-img {
                transform: none !important;
                scale: 1 !important;
            }
            
            /* Ensure only proper hover effects */
            .gallery-item img,
            .gallery-item-img {
                filter: saturate(0.22);
                transition: filter 0.3s ease;
            }
            
            .gallery-item:hover img,
            .gallery-item:hover .gallery-item-img {
                filter: saturate(1);
            }
            
            /* Fix specific gallery class issues */
            .cybermask-gallery {
                display: grid !important;
                grid-template-columns: repeat(5, 1fr) !important;
                gap: 0 !important;
                width: 62.5% !important;
                margin: 20px 0 !important;
            }
        `;
        document.head.appendChild(styleEl);
        
        addIssue("info", "Injected preventative CSS fixes to ensure proper gallery layouts");
    }
    
    // Catch JavaScript errors
    function captureJsErrors() {
        console.log("Setting up error capture...");
        
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        
        console.error = function(...args) {
            addIssue("error", args.join(" "));
            originalConsoleError.apply(console, args);
        };
        
        console.warn = function(...args) {
            addIssue("warning", args.join(" "));
            originalConsoleWarn.apply(console, args);
        };
        
        window.addEventListener("error", function(event) {
            addIssue("error", `JavaScript error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
            return false;
        });
        
        window.addEventListener("unhandledrejection", function(event) {
            addIssue("error", `Unhandled Promise rejection: ${event.reason}`);
            return false;
        });
    }
    
    // Monitor gallery creation to catch late-loaded galleries
    function monitorGalleryCreation() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    Array.from(mutation.addedNodes).forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if this is a gallery or contains a gallery
                            if (node.classList && node.classList.contains("gallery-container")) {
                                console.log("New gallery added:", node);
                                checkGalleryLayouts();
                            } else if (node.querySelector && node.querySelector(".gallery-container")) {
                                console.log("New content with gallery added");
                                checkGalleryLayouts();
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Fix any classes for cybermask gallery
    function fixCybermaskGallery() {
        const cybermaskGallery = document.getElementById("cybermaskGallery");
        if (cybermaskGallery && !cybermaskGallery.classList.contains("gallery-container")) {
            cybermaskGallery.classList.add("gallery-container");
            addIssue("info", "Fixed: Added gallery-container class to cybermaskGallery");
        }
    }
    
    // Initialize diagnostic tools when DOM is loaded
    function init() {
        // Create the diagnostic panel
        const indicator = createDiagnosticIndicator();
        
        // Inject preventative CSS fixes
        injectCssFixes();
        
        // Capture JS errors
        captureJsErrors();
        
        // Fix cybermask gallery class issue
        fixCybermaskGallery();
        
        // Wait a bit for all content to load before running checks
        setTimeout(function() {
            // Check gallery layouts
            checkGalleryLayouts();
            
            // Check hover effects
            checkHoverEffects();
            
            // Check if essential scripts are loaded
            checkScriptsLoaded();
            
            // Monitor for gallery creation
            monitorGalleryCreation();
            
            // Final summary
            if (issues.length === 0) {
                addIssue("info", "All checks passed! No issues detected.");
            } else {
                const errorCount = issues.filter(i => i.type === "error").length;
                const warningCount = issues.filter(i => i.type === "warning").length;
                
                addIssue("info", `Diagnostic complete: Found ${errorCount} errors and ${warningCount} warnings.`);
            }
        }, 1000);
    }
    
    // Run when DOM is loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
