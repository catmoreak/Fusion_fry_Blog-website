import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const shadowRef = React.useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const checkTouch = () => setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 3D tilt effect handlers (minimal, elegant)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isTouch) return;
    const el = imgRef.current;
    const shadow = shadowRef.current;
    if (!el || !shadow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Minimal tilt
    const maxTilt = 5;
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * -maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
    el.style.filter = 'brightness(1.08)';
    // Softer shadow
    shadow.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 18px 0 rgba(0,0,0,0.10)`;
  };

  const resetTilt = () => {
    const el = imgRef.current;
    const shadow = shadowRef.current;
    if (el) {
      el.style.transition = 'transform 0.4s cubic-bezier(.22,1,.36,1), filter 0.4s cubic-bezier(.22,1,.36,1)';
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      el.style.filter = 'brightness(1)';
      setTimeout(() => {
        if (el) el.style.transition = 'transform 0.2s cubic-bezier(.25,.8,.25,1), filter 0.2s cubic-bezier(.25,.8,.25,1)';
      }, 400);
    }
    if (shadow) {
      shadow.style.transition = 'box-shadow 0.4s cubic-bezier(.22,1,.36,1)';
      shadow.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.07)';
      setTimeout(() => {
        if (shadow) shadow.style.transition = 'box-shadow 0.2s cubic-bezier(.25,.8,.25,1)';
      }, 400);
    }
  };

  // Touch disables effect
  const handleTouchStart = () => setIsTouch(true);
  const handleTouchEnd = resetTilt;

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '900px' }}
    >
      <div
        ref={shadowRef}
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{ zIndex: 1, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)', transition: 'box-shadow 0.2s cubic-bezier(.25,.8,.25,1)' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" style={{ zIndex: 2 }} />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 will-change-transform rounded-lg`}
        style={{ transition: 'transform 0.2s cubic-bezier(.25,.8,.25,1), filter 0.2s cubic-bezier(.25,.8,.25,1)', zIndex: 3, position: 'relative', display: 'block' }}
      />
    </div>
  );
};