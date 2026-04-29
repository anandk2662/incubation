import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (message && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${
            type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-100'
          }`}
        >
          {type === 'success' ? <CheckCircle2 size={20} className="text-emerald-400" /> : <XCircle size={20} className="text-rose-400" />}
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className={`ml-2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 ${
              type === 'success' ? 'hover:bg-emerald-500/20' : 'hover:bg-rose-500/20'
            }`}
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
