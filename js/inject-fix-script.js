/**
 * Inject Fix WeRobot Gallery Script
 * This script injects the fix-werobot-gallery.js script into the document
 */
(function() {
    console.log("Injecting WeRobot gallery fix script");
    
    // Create script element
    const script = document.createElement("script");
    script.src = "js/fix-werobot-gallery.js?v=" + new Date().getTime(); // Add cache-busting
    script.async = true;
    
    // Append to document
    document.head.appendChild(script);
    
    console.log("WeRobot gallery fix script injected");
})();
