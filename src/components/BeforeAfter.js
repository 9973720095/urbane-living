import React, { useState, useRef, useEffect } from 'react';
import { beforeAfter } from '../data/home';
import SectionHeading from './SectionHeading';

// Before / after slider. Images + text come from data/home.js (beforeAfter),
// so the compressed Cloudinary URLs (q_auto,f_auto,w_1400) are used here.
const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [boxWidth, setBoxWidth] = useState(1000);
  const containerRef = useRef(null);

  // Keep both images the same width as the box (also after resize / rotate)
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setBoxWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const moveTo = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (isDragging) moveTo(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) moveTo(e.touches[0].clientX);
  };

  const imgStyle = { width: `${boxWidth}px`, height: '100%', objectFit: 'cover', maxWidth: 'none' };

  return (
    <section aria-labelledby="ba-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1000px]">

        <SectionHeading
          id="ba-title"
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          highlight={beforeAfter.highlight}
          subtitle={beforeAfter.subtitle}
        />

        {/* Interactive Before/After Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(300px, 62vw, 480px)',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'ew-resize',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            userSelect: 'none'
          }}
        >
          {/* Background / After view */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <img
              src={beforeAfter.after}
              alt="Dining area after interior design by Urbane Living"
              loading="lazy"
              decoding="async"
              draggable="false"
              style={imgStyle}
            />
          </div>

          {/* Foreground / Before view (clipped) */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${sliderPosition}%`,
            height: '100%',
            zIndex: 2,
            overflow: 'hidden',
            borderRight: '3px solid #ffffff'
          }}>
            <img
              src={beforeAfter.before}
              alt="Dining area before the interior work"
              loading="lazy"
              decoding="async"
              draggable="false"
              style={imgStyle}
            />
            <span style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}>
              Before
            </span>
          </div>

          {/* Hint badge */}
          <div style={{
            position: 'absolute',
            bottom: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 20px',
            borderRadius: '30px',
            zIndex: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            fontSize: '13px',
            fontWeight: 600,
            color: '#333'
          }}>
            <span>✨Slide to see the transformation</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeforeAfter;