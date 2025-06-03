import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { generateWhatsAppLink } from '../lib/api'

const WhatsAppBubble: React.FC = () => {
  const handleWhatsAppClick = () => {
    const whatsappUrl = generateWhatsAppLink()
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="floating-whatsapp group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-neutral-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
          ¡Escríbeme por WhatsApp!
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-neutral-800 border-t-4 border-b-4 border-t-transparent border-b-transparent" />
        </div>
      </div>
    </motion.button>
  )
}

export default WhatsAppBubble 