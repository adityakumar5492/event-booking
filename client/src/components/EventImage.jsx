import React, { useState } from 'react';

/**
 * Reusable image component for event cards / detail pages.
 * Shows a styled fallback when the image fails to load or is missing.
 *
 * Props:
 *  - src: string (image URL)
 *  - alt: string
 *  - className: string (applied to the <img> wrapper)
 *  - fallbackClassName: string (applied to the fallback container)
 *  - fallbackText?: string (defaults to alt or 'Event')
 */
const EventImage = ({
    src,
    alt = 'Event',
    className = '',
    fallbackClassName = '',
    fallbackText,
}) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const displayFallbackText = fallbackText || alt || 'Event';

    // If no src, or image already errored, show fallback
    if (!src || hasError) {
        return (
            <div
                className={
                    'w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 select-none ' +
                    fallbackClassName
                }
                title={hasError ? 'Image failed to load' : 'No image provided'}
            >
                <div className="flex flex-col items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 opacity-40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="text-sm font-semibold uppercase tracking-wider opacity-70">
                        {displayFallbackText}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-0">
                    <span className="text-gray-400 text-xs font-medium">Loading image…</span>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover relative z-10"
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                    console.warn(`[EventImage] Failed to load: ${src}`);
                }}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
            />
        </div>
    );
};

export default EventImage;

