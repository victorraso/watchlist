import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed top-0 left-0 z-1000 size-full bg-orange-500/30 backdrop-blur-xs"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="z-1001 flex h-full w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>,
    document.body,
  );
}
