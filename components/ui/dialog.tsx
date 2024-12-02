import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${open ? 'block' : 'hidden'}`}
      onClick={() => onOpenChange(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className="relative bg-[#161b22] border-gray-700 text-white max-w-md rounded-lg p-6"
      >
        {children}
      </div>
    </motion.div>
  );
};

Dialog.Content = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

Dialog.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col p-4 border-b border-gray-600">
    {children}
  </div>
);

Dialog.Title = ({ children }: { children: React.ReactNode }) => (
  <div className="text-lg font-semibold text-white">{children}</div>
);

Dialog.Close = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-3 right-3 text-gray-400 hover:text-white"
  >
    <X className="h-4 w-4" />
  </button>
);

export { Dialog };
