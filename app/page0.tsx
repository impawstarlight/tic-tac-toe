'use client';
import { useState, useEffect } from 'react';

function useViewport() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Handler
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Initialize
    handleResize();

    // Listen to resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default function Page() {
  const width = useViewport();

  return (
    <div className="p-4">
      <h1>Hello Tic Tac Toe</h1>
      <p>Viewport width: {width}px</p>
    </div>
  );
}
