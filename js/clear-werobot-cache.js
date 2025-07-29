/**
 * Clear WeRobot Gallery Cache Script
 * This script helps refresh WeRobot images by clearing specific cache entries
 */

(function() {
    console.log("Running WeRobot gallery cache clearing...");
    
    // Only clear once per session
    if (window.weRobotCacheCleared) {
        console.log("WeRobot cache already cleared this session, skipping");
        return;
    }
    
    // Check if cache API is available
    if ("caches" in window) {
        console.log("Cache API available, clearing WeRobot image caches");
        
        // Clear caches containing WeRobot images
        caches.keys().then(cacheNames => {
            const wipePromises = cacheNames
                .filter(name => name.includes("werobot") || name.includes("image"))
                .map(name => {
                    console.log(`Clearing cache: ${name}`);
                    return caches.open(name).then(cache => {
                        // Only remove WeRobot-related items
                        return cache.keys().then(requests => {
                            const deletePromises = requests
                                .filter(request => request.url.includes("werobot"))
                                .map(request => {
                                    console.log(`Removing from cache: ${request.url}`);
                                    return cache.delete(request);
                                });
                            return Promise.all(deletePromises);
                        });
                    });
                });
                
            return Promise.all(wipePromises)
                .then(() => {
                    console.log("WeRobot caches successfully cleared");
                    window.weRobotCacheCleared = true;
                })
                .catch(error => {
                    console.error("Error clearing WeRobot caches:", error);
                });
        });
    } else {
        console.log("Cache API not available, using version parameter for cache busting");
        window.weRobotCacheCleared = true;
    }
    
    // Set a flag to indicate cache clearing was attempted
    window.weRobotCacheCleared = true;
})();
