import React, { useState, useRef } from 'react';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
        
        {/* Header Text */}
        <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
          Transforming homes with love
        </h2>
        <p style={{ fontSize: '15px', color: '#666666', marginBottom: '30px' }}>
          Get a glimpse of our exceptional home designs.
        </p>

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
            height: '450px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            cursor: 'ew-resize',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            userSelect: 'none'
          }}
        >
          {/* Background / After View (Video) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Foreground / Before View (Clipped) */}
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
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
              alt="Before" 
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '1000px', height: '100%', objectFit: 'cover', maxWidth: 'none' }} 
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

          {/* Scratch Badge */}
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
            <span>✨ Scratch to see the transformation</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BeforeAfter;