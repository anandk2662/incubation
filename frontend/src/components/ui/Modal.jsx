import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  const sizes = {
    sm: 'max-w-[420px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[800px]',
    xl: 'max-w-[1000px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] flex items-end sm:items-center sm:justify-center" role="dialog" aria-modal="true">
          <motion.div
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="relative z-10 w-full flex justify-center p-4 sm:p-6">
            <motion.div
              className={`bg-bg-surface border border-border-hover rounded-xl shadow-lg overflow-hidden w-full max-h-[90vh] flex flex-col ${sizes[size] || sizes.md}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between p-5 sm:px-6 sm:py-4 border-b border-border-primary shrink-0">
                {title && <h2 className="text-lg font-bold tracking-tight text-text-primary">{title}</h2>}
                <button 
                  className="flex items-center justify-center w-8 h-8 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-bg-hover transition-colors shrink-0" 
                  onClick={onClose} 
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
