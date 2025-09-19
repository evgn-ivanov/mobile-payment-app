import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  className 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 200 
          }}
          className={cn(
            "fixed inset-0 bg-white z-50 overflow-hidden",
            className
          )}
        >
          {/* Fullscreen content with safe areas */}
          <div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
