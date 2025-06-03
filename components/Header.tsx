import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa'
import { generateWhatsAppLink } from '../lib/api'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setIsMenuOpen(false)
      
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const headerOffset = 80 // altura del header en px
        const elementPosition = targetElement.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Blog', href: '#blog' },
    { name: 'Agendar Cita', href: '#agendar-cita' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-responsive flex items-center justify-between py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          aria-label="Dra. Sandra Vargas - Inicio"
        >
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/logo-dra-sandra-vargas.png"
              alt="Logo Dra. Sandra Margarita Vargas - Psicóloga"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">
              Dra. Sandra Vargas
            </h1>
            <p className="text-sm text-neutral-600">Psicóloga Clínica</p>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              onClick={(e) => handleAnchorClick(e, item.href)}
            >
              {item.name}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA Buttons Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={generateWhatsAppLink("Hola Dra. Sandra, me gustaría obtener más información sobre sus servicios de psicoterapia. ¿Podríamos coordinar una consulta?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2 text-sm"
            aria-label="Contactar por WhatsApp a la Dra. Sandra Vargas"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <Link
            href="#agendar-cita"
            className="btn-primary flex items-center space-x-2 text-sm"
            onClick={(e) => handleAnchorClick(e, '#agendar-cita')}
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Agendar Cita</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6 text-neutral-700" />
          ) : (
            <FaBars className="w-6 h-6 text-neutral-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200"
          >
            <div className="container-responsive py-6">
              {/* Mobile Navigation */}
              <div className="space-y-4 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-neutral-700 hover:text-primary-600 font-medium py-2 transition-colors"
                    onClick={(e) => handleAnchorClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3">
                <a
                  href={generateWhatsAppLink("Hola Dra. Sandra, me gustaría obtener más información sobre sus servicios de psicoterapia. ¿Podríamos coordinar una consulta?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-2 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaWhatsapp className="w-4 h-4 text-green-500" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="#agendar-cita"
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                  onClick={(e) => handleAnchorClick(e, '#agendar-cita')}
                >
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>Agendar Cita</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 