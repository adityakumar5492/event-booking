/**
 * Validates if a URL is likely a direct image link.
 * @param {string} url
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateImageUrl(url) {
    if (!url || typeof url !== 'string') {
        return { valid: false, reason: 'URL is empty or not a string' };
    }

    let parsed;
    try {
        parsed = new URL(url);
    } catch {
        return { valid: false, reason: 'Invalid URL format' };
    }

    // Reject non-HTTPS in production (optional but recommended)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return { valid: false, reason: 'URL must use http or https protocol' };
    }

    const lowerPath = parsed.pathname.toLowerCase();
    const knownImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.bmp'];
    const hasImageExtension = knownImageExtensions.some(ext => lowerPath.endsWith(ext));

    // Known direct-image hosts that don't always have extensions
    const knownImageHosts = [
        'images.unsplash.com',
        'images.pexels.com',
        'cdn.pixabay.com',
        'res.cloudinary.com',
        'firebasestorage.googleapis.com',
        's3.amazonaws.com',
        'images.ctfassets.net',
        'avatars.githubusercontent.com',
        'raw.githubusercontent.com',
        'i.imgur.com',
        'imgur.com',
    ];
    const isKnownHost = knownImageHosts.some(host => parsed.hostname.toLowerCase().includes(host));

    if (!hasImageExtension && !isKnownHost) {
        return {
            valid: false,
            reason: 'URL does not end with a known image extension (e.g., .jpg, .png) and is not from a recognized image host. It may be a webpage link, not a direct image link.',
        };
    }

    return { valid: true };
}

/**
 * Checks if a URL looks like a Google Drive / Dropbox / OneDrive sharing link
 * which usually does NOT serve the image directly.
 */
export function isIndirectImageUrl(url) {
    if (!url) return false;
    const indirectPatterns = [
        /drive\.google\.com\/file\/d\//,
        /dropbox\.com\/scl\/fi\//,
        /onedrive\.live\.com/,
        /docs\.google\.com/,
    ];
    return indirectPatterns.some(p => p.test(url));
}

