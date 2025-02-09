import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 8
      }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      exit={{ 
        opacity: 0,
        y: 8
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth acceleration/deceleration
        staggerChildren: 0.1 // Add stagger effect to children
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}; 