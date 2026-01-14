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
     * @param {object} options - Image optimization options (width, quality, format)
     * @returns {string} - Full URL to the asset with Vercel optimization
     */
    getAssetUrl(assetPath, options = {}) {
        // Remove leading slash if present
        const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;

        // Get the base S3 URL
        const s3Url = `${this.s3BaseUrl}/${cleanPath}`;

        // For localhost development, return direct S3 URL (no Vercel optimization)
        if (this.isLocalhost) {
            return s3Url;
        }

        // For production, use Vercel Image Optimization
        const baseUrl = window.location.origin; // Gets the current domain
        const encodedS3Url = encodeURIComponent(s3Url);

        // Default optimization settings
        const defaults = {
            w: 800,    // Default width (good balance for galleries)
            q: 80,     // Quality (good balance between size and quality)
            f: 'auto'  // Auto format (WebP/AVIF when supported)
        };

        // Merge with provided options
        const settings = { ...defaults, ...options };

        // Build Vercel optimization URL
        const params = new URLSearchParams({
            url: encodedS3Url,
            w: settings.w.toString(),
            q: settings.q.toString(),
            f: settings.f
        });

        return `${baseUrl}/_vercel/image?${params.toString()}`;
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