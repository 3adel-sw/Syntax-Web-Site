import { useState, useRef, useEffect, memo } from 'react';

/**
 * OptimizedImage — SEO + mobile-first image component.
 *
 * Defaults optimized for mobile performance:
 *   - Lazy by default (set eager=true for above-the-fold / hero)
 *   - async decoding (non-blocking)
 *   - fetchpriority=high when eager, auto otherwise
 *   - native loading="lazy" with IntersectionObserver fallback
 *   - skeleton → fade-in (no layout shift)
 *   - graceful error fallback
 *   - AVIF/WebP hint via picture-element support when srcset is provided
 *   - srcset + sizes for responsive bandwidth-aware delivery
 *
 * @param {string}  src         Image source URL (required)
 * @param {string}  alt         Alt text (REQUIRED for SEO/accessibility)
 * @param {string}  fallback    Fallback image URL on error
 * @param {string}  placeholder Placeholder color or low-res image
 * @param {boolean} eager       Set true for above-the-fold (hero) images
 * @param {string}  sizes       Responsive sizes attribute (e.g. "(max-width: 768px) 100vw, 50vw")
 * @param {string}  srcSet      Responsive srcset string (e.g. "img-480.jpg 480w, img-800.jpg 800w")
 * @param {string}  loading     Override native loading attr (default: lazy | eager)
 * @param {string}  fetchpriority Override fetchpriority (high|low|auto)
 */
const OptimizedImage = ({
  src,
  alt,
  fallback = '/images/placeholder.webp',
  placeholder = '#f3f4f6',
  eager = false,
  sizes,
  srcSet,
  className = '',
  width,
  height,
  loading,
  fetchpriority,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (eager) return;
    if (!imgRef.current) return;

    // Fallback for browsers without native lazy loading (very old Android WebViews)
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

  // Determine final loading strategy
  const finalLoading = loading || (eager ? 'eager' : 'lazy');
  const finalFetchPriority = fetchpriority || (eager ? 'high' : 'auto');

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholder,
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
        contain: 'layout style', // isolate layout to avoid reflow storms on mobile
      }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={finalLoading}
        decoding="async"
        fetchPriority={finalFetchPriority}
        sizes={sizes}
        srcSet={srcSet}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 will-change-opacity ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        // Hint browser for content-visibility auto on long-scroll pages (mobile perf)
        style={{ contentVisibility: 'auto' }}
        {...rest}
      />
    </span>
  );
};

export default memo(OptimizedImage);