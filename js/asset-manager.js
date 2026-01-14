/**
 * Asset Manager - Automatically handles asset loading based on environment
 * Uses local assets for localhost development, S3 for production
 */

class AssetManager {
    constructor() {
        this.isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.s3BaseUrl = 'https://saeedghods-portfolio-assets.s3.us-east-2.amazonaws.com/assets';
        this.localBaseUrl = 'assets';
        
        console.log(`Asset Manager initialized - Always using S3 assets for consistency`);
    }
    
    /**
     * Get the correct asset URL based on environment
     * @param {string} assetPath - Path relative to assets folder (e.g., 'hydroponic/JPEG/01.jpg')
     * @returns {string} - Full URL to the asset
     */
    getAssetUrl(assetPath) {
        // Remove leading slash if present
        const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;

        // Always use S3 for both localhost and production
        return `${this.s3BaseUrl}/${cleanPath}`;
    }
    
    /**
     * Preload an image and return a promise
     * @param {string} assetPath - Path to the image asset
     * @returns {Promise} - Resolves when image loads, rejects on error
     */
    preloadImage(assetPath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load: ${assetPath}`));
            img.src = this.getAssetUrl(assetPath);
        });
    }
    
    /**
     * Replace all S3 URLs in a string with environment-appropriate URLs
     * @param {string} content - String containing S3 URLs
     * @returns {string} - String with replaced URLs
     */
    replaceS3Urls(content) {
        // Keep S3 URLs everywhere for consistency
        return content;
    }
}

// Create global instance
window.assetManager = new AssetManager();

// Helper function for backward compatibility
function getAssetUrl(path) {
    return window.assetManager.getAssetUrl(path);
} 