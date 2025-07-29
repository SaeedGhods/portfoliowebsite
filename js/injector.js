/**
 * Auto-Injector Script for Diagnostic Tools
 * This script automatically injects the diagnostic-loader.js script 
 * when loaded via the diagnostic.html page
 */

// Check if we're supposed to load diagnostics
if (sessionStorage.getItem("loadDiagnostics") === "true") {
    console.log("Diagnostic mode active - injecting diagnostic tools");
    
    // Inject the diagnostic loader
    const script = document.createElement("script");
    script.src = "js/diagnostic-loader.js?" + Date.now(); // Add cache busting
    script.async = true;
    document.head.appendChild(script);
    
    // Add visual indicator that diagnostic mode is active
    const indicator = document.createElement("div");
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: rgba(255, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 9999;
        cursor: pointer;
    `;
    indicator.textContent = "Diagnostic Mode";
    indicator.title = "Click to disable diagnostic mode";
    indicator.onclick = function() {
        sessionStorage.removeItem("loadDiagnostics");
        window.location.reload();
    };
    
    // Add indicator when DOM is loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            document.body.appendChild(indicator);
        });
    } else {
        document.body.appendChild(indicator);
    }
}
