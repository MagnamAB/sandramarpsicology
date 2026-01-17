import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaCookieBite, FaTimes, FaCheck } from 'react-icons/fa'

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Verificar si ya se dio consentimiento
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      // Mostrar banner después de un pequeño delay
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    }))
    // Desactivar Google Analytics si el usuario no acepta
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <FaCookieBite className="w-6 h-6" />
                <h3 className="font-bold text-lg">Aviso de Cookies</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-neutral-700 mb-4">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico 
                del sitio y procesar pagos de forma segura. Puedes aceptar todas las cookies o solo las 
                esenciales para el funcionamiento del sitio.
              </p>

              {/* Detalles expandibles */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-neutral-50 rounded-lg p-4 mb-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">Cookies Esenciales</p>
                          <p className="text-sm text-neutral-600">
                            Necesarias para el funcionamiento del sitio y el proceso de pago. No pueden desactivarse.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">Cookies de Análisis (Google Analytics)</p>
                          <p className="text-sm text-neutral-600">
                            Nos ayudan a entender cómo usas el sitio para mejorarlo. Puedes rechazarlas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <button
                  onClick={acceptAll}
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Aceptar todas
                </button>
                
                <button
                  onClick={acceptEssential}
                  className="w-full sm:w-auto bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Solo esenciales
                </button>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm underline"
                >
                  {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
                </button>
              </div>

              {/* Links */}
              <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-4 text-sm">
                <Link href="/politica-cookies" className="text-primary-600 hover:underline">
                  Política de Cookies
                </Link>
                <Link href="/politica-privacidad" className="text-primary-600 hover:underline">
                  Política de Privacidad
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
