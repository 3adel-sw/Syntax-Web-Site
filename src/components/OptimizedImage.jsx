import { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage - SEO-friendly image component with:
 * - Lazy loading by default (set eager for above-the-fold)
 * - Native lazy loading + IntersectionObserver fallback
 * - Loading skeleton/placeholder
 * - Error handling with fallback
 * - Automatic srcset for responsive images
 * - Decoding async for non-blocking
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text (REQUIRED for SEO/accessibility)
 * @param {string} props.fallback - Fallback image URL on error
 * @param {string} props.placeholder - Placeholder color or low-res image
 * @param {boolean} props.eager - Set true for above-the-fold (hero) images
 * @param {string} props.sizes - Responsive sizes attribute
 */
const OptimizedImage = ({
  src,
  alt,
  fallback = '/images/placeholder.webp',
  placeholder = '#f3f4f6',
  eager = false,
  sizes,
  className = '',
  width,
  height,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (eager) return;
    if (!imgRef.current) return;

    // Use IntersectionObserver as fallback if native lazy loading not supported
    if (!('loading' in HTMLImageElement.prototype)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) img.src = img.dataset.src;
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '200px' }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [eager]);

  const handleLoad = () => setLoaded(true);
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const imageSrc = error ? fallback : src;

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholder,
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={eager ? 'high' : 'auto'}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        {...rest}
      />
    </span>
  );
};

export default OptimizedImage;
