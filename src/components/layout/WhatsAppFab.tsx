import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppFabProps {
  phone?: string;
  message?: string;
}

export default function WhatsAppFab({ phone = '', message = '' }: WhatsAppFabProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-shadow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  );
}
