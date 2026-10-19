// src/hooks/useModalDismiss.ts
// DRY custom hook to manage modal Escape key dismiss and body scroll lock

import { useEffect } from 'react';

interface UseModalDismissOptions {
  isOpen: boolean;
  onClose: () => void;
  onEscapeOverride?: () => boolean; // return true if handled, false to proceed with onClose
}

export const useModalDismiss = ({
  isOpen,
  onClose,
  onEscapeOverride,
}: UseModalDismissOptions) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onEscapeOverride && onEscapeOverride()) {
          return;
        }
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onEscapeOverride]);
};
