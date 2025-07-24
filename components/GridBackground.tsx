import React, { useEffect, useRef } from 'react';

export const GridBackground: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (gridRef.current) {
        const x = event.clientX;
        const y = event.clientY;
        gridRef.current.style.setProperty('--mouse-x', `${x}px`);
        gridRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-slate-900">
       <div 
          ref={gridRef}
          className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            maskImage: `radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), white, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), white, transparent)`,
          }}
       />
    </div>
  );
};