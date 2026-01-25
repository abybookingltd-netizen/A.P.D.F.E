import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}>
            {/* Loading Placeholder */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse z-10">
                    <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
                </div>
            )}

            {/* Error Fallback */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 z-10">
                    <span className="text-xs text-slate-400 font-medium uppercase">Image Unavailable</span>
                </div>
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                {...props}
            />
        </div>
    );
};
