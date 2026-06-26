import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Focus trap implementation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          // Shift + Tab: wrap to last element
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab: wrap to first element
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Focus the first focusable element or the modal container itself
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex="0"]'
          );
          if (focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 50);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={cn(
              "relative w-full rounded-2xl bg-[#111113] border border-white/[0.08] shadow-2xl z-10 overflow-hidden flex flex-col my-8 outline-none",
              sizes[size],
              className
            )}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              {title ? (
                <h3 className="text-base font-semibold text-[#FAFAFA] tracking-tight">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
