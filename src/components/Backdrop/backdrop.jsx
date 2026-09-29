import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const Backdrop = ({ children, onClick }) => {
  const onClose = useRef(onClick);
  onClose.current = onClick;
  // Captured during render: by effect time the dialog's autoFocus has already moved focus.
  const [opener] = useState(() => document.activeElement);

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose.current();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, []);

  return (
    <motion.div
      className='backdrop'
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
