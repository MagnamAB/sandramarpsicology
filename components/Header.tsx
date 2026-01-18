import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaWhatsapp, FaCalendarAlt, FaChevronDown, FaUser, FaHeart, FaUsers } from 'react-icons/fa'
import { generateWhatsAppLink } from '../lib/api'
import { trackWhatsAppClick, trackScheduleClick } from '../lib/analytics'
import { useAppointmentModal } from '../contexts/AppointmentModalContext'

interface DropdownItem {
  name: string
  href: string
  sectionHref?: string
  description?: string
  isModalidad?: boolean
}

interface NavItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
  isModal?: boolean
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [pathname, setPathname] = useState('/')
  const { openModal } = useAppointmentModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
    
    // Si es un anchor de la página de inicio (/#...)
    if (href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.substring(2) // Quitar "/#"
      
      // Si ya estamos en la página de inicio, hacer scroll directo
      if (window.location.pathname === '/') {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          const headerOffset = 80
          const elementPosition = targetElement.offsetTop
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else {
        // Si estamos en otra página, navegar a inicio y luego hacer scroll
        window.location.href = href
      }
    }
    // Para anchors simples (#...) - solo si estamos en la página de inicio
    else if (href.startsWith('#')) {
      e.preventDefault()
      if (window.location.pathname === '/') {
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const headerOffset = 80
          const elementPosition = targetElement.offsetTop
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else {
        // Si no estamos en la página de inicio, navegar allí
        window.location.href = '/' + href
      }
    }
    // Para rutas de páginas (/blog, /testimonios, etc.) - navegación normal
    // Next.js maneja esto automáticamente
  }

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Usar la misma lógica que handleAnchorClick
    handleAnchorClick(e, href)
  }

  const navItems: NavItem[] = [
    { name: 'Inicio', href: '/#inicio' },
    { name: 'Sobre Mí', href: '/#sobre-mi' },
    { 
      name: 'Servicios', 
      href: '/#servicios',
      dropdown: [
        { 
          name: 'Terapia Individual Adultos', 
          href: '/terapia-individual-adultos',
          sectionHref: '/#servicios',
          description: 'Enfoque Integrativo • Autoconocimiento • Ansiedad'
        },
        { 
          name: 'Terapia de Pareja', 
          href: '/terapia-de-pareja',
          sectionHref: '/#servicios',
          description: 'Sistémico • Comunicación • Vínculo'
        },
        { 
          name: 'Online Global', 
          href: '/#servicios',
          isModalidad: true
        },
        { 
          name: 'Consultorio Bogotá', 
          href: '/#servicios',
          isModalidad: true
        },
      ]
    },
    { name: 'Experiencia', href: '/#experiencia' },
    // Recursos temporalmente oculto - descomentar cuando esté listo
    // { 
    //   name: 'Recursos', 
    //   href: '/blog',
    //   dropdown: [
    //     { name: 'Blog', href: '/blog' },
    //     { name: 'Testimonios', href: '/testimonios' },
    //     { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
    //   ]
    // },
    { name: 'Agendar Cita', href: '#agendar', isModal: true },
  ]

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-responsive flex items-center justify-between py-4">
        {/* Logo */}
        <Link 
          href="/"
          className="flex items-center space-x-3 group"
          aria-label="Sandra Vargas - Inicio"
        >
          <Image
            src="/images/logo-dra-sandra-vargas.png" 
            alt="Logo Sandra Margarita Vargas - Psicóloga"
            width={50}
            height={50}
            className="transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-neutral-900 group-hover:text-primary-600 transition-colors">
              Sandra Margarita Vargas
            </span>
            <span className="text-xs text-neutral-600">Psicóloga Clínica</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div className="relative group">
                  <Link 
                    href={item.href}
                    className="nav-link flex items-center gap-1"
                    onClick={(e) => {
                      handleNavigationClick(e, item.href)
                    }}
                  >
                    {item.name}
                    <FaChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </Link>
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70]">
                    <div className="p-6">
                      {item.name === 'Servicios' ? (
                        <>
                          <div className="text-sm font-semibold text-neutral-500 mb-4">SERVICIOS ESPECIALIZADOS</div>
                          <div className="space-y-3">
                            <div>
                              <Link 
                                href="/terapia-individual-adultos"
                                className="block p-3 rounded-lg hover:bg-primary-50 transition-colors group/item"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <FaUser className="w-4 h-4 text-primary-600" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-neutral-900 group-hover/item:text-primary-600">Terapia Individual Adultos</div>
                                    <div className="text-xs text-neutral-500">Enfoque Integrativo • Autoconocimiento • Ansiedad</div>
                                  </div>
                                </div>
                              </Link>
                              <Link 
                                href="/#servicios"
                                className="block text-xs text-primary-600 hover:text-primary-700 pl-14 pb-2"
                                onClick={(e) => handleNavigationClick(e, '/#servicios')}
                              >
                                Ver en página principal →
                              </Link>
                            </div>
                            <div>
                              <Link 
                                href="/terapia-de-pareja"
                                className="block p-3 rounded-lg hover:bg-secondary-50 transition-colors group/item"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                                    <FaHeart className="w-4 h-4 text-secondary-600" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-neutral-900 group-hover/item:text-secondary-600">Terapia de Pareja</div>
                                    <div className="text-xs text-neutral-500">Sistémico • Comunicación • Vínculo</div>
                                  </div>
                                </div>
                              </Link>
                              <Link 
                                href="/#servicios"
                                className="block text-xs text-secondary-600 hover:text-secondary-700 pl-14 pb-2"
                                onClick={(e) => handleNavigationClick(e, '/#servicios')}
                              >
                                Ver en página principal →
                              </Link>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-neutral-100">
                            <div className="text-xs text-neutral-500 mb-2">MODALIDADES</div>
                            <div className="flex gap-2">
                              <Link 
                                href="/#servicios"
                                onClick={(e) => handleNavigationClick(e, '/#servicios')}
                                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full hover:bg-primary-100 transition-colors"
                              >
                                Online Global
                              </Link>
                              <Link 
                                href="/#servicios"
                                onClick={(e) => handleNavigationClick(e, '/#servicios')}
                                className="px-2 py-1 bg-secondary-50 text-secondary-700 text-xs rounded-full hover:bg-secondary-100 transition-colors"
                              >
                                Consultorio Bogotá
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        // Dropdown simple para Recursos
                        <div className="space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                              className="block p-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-primary-600"
                              onClick={(e) => handleNavigationClick(e, subItem.href)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              ) : item.isModal ? (
                <button
                  onClick={() => {
                    openModal()
                    trackScheduleClick('header_nav_desktop')
                  }}
                  className="nav-link"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href || (item.href === '/' && pathname === '/') ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    handleNavigationClick(e, item.href)
                  }}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={generateWhatsAppLink("Hola Sandra, me gustaría obtener más información sobre sus servicios de psicoterapia. ¿Podríamos coordinar una consulta?")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            aria-label="Contactar por WhatsApp a Sandra Vargas"
            onClick={() => trackWhatsAppClick('header_desktop')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <FaWhatsapp className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-semibold">Escribir</span>
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse relative z-10"></div>
          </a>
          <button
            onClick={() => {
              openModal()
              trackScheduleClick('header_desktop')
            }}
            className="btn-primary flex items-center space-x-2 text-sm"
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Agendar Cita</span>
          </button>
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
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="flex-1 text-neutral-700 hover:text-primary-600 font-medium py-2 transition-colors"
                            onClick={(e) => {
                              setIsMenuOpen(false)
                              handleNavigationClick(e, item.href)
                            }}
                          >
                            {item.name}
                          </Link>
                        <button
                            className="text-neutral-700 hover:text-primary-600 font-medium py-2 transition-colors ml-2"
                          onClick={() => handleDropdownToggle(item.name)}
                        >
                          <FaChevronDown 
                            className={`w-3 h-3 transform transition-transform ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        </div>
                        
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-3 overflow-hidden"
                            >
                              {item.name === 'Servicios' ? (
                                <>
                                  <div className="text-xs font-semibold text-neutral-500 mt-3 mb-2">SERVICIOS ESPECIALIZADOS</div>
                                  {item.dropdown.filter(subItem => !subItem.isModalidad).map((subItem) => (
                                    <div key={subItem.name} className="space-y-1">
                                      <Link
                                        href={subItem.href}
                                        className="block text-sm text-neutral-900 hover:text-primary-600 font-medium py-1 transition-colors"
                                        onClick={(e) => handleNavigationClick(e, subItem.href)}
                                      >
                                        {subItem.name}
                                      </Link>
                                      {subItem.description && (
                                        <div className="text-xs text-neutral-400 ml-2">{subItem.description}</div>
                                      )}
                                      {subItem.sectionHref && (
                                        <Link
                                          href={subItem.sectionHref}
                                          className="block text-xs text-primary-600 hover:text-primary-700 ml-2 mb-2"
                                          onClick={(e) => {
                                            if (subItem.sectionHref) {
                                              handleNavigationClick(e, subItem.sectionHref)
                                            }
                                          }}
                                        >
                                          Ver en página principal →
                                        </Link>
                                      )}
                                    </div>
                                  ))}
                                  <div className="text-xs font-semibold text-neutral-500 mt-4 mb-2">MODALIDADES</div>
                                  <div className="flex flex-wrap gap-2">
                                    {item.dropdown.filter(subItem => subItem.isModalidad).map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full hover:bg-primary-100 transition-colors"
                                        onClick={(e) => handleNavigationClick(e, subItem.href)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                // Renderizado para otros dropdowns (Recursos)
                                item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block text-sm text-neutral-600 hover:text-primary-600 py-1 transition-colors"
                                    onClick={(e) => handleNavigationClick(e, subItem.href)}
                                >
                                  {subItem.name}
                                </Link>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : item.isModal ? (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          openModal()
                          trackScheduleClick('header_nav_mobile')
                        }}
                        className="block text-neutral-700 hover:text-primary-600 font-medium py-2 transition-colors w-full text-left"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-neutral-700 hover:text-primary-600 font-medium py-2 transition-colors"
                        onClick={(e) => {
                          setIsMenuOpen(false)
                          handleNavigationClick(e, item.href)
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3">
                <a
                  href={generateWhatsAppLink("Hola Sandra, me gustaría obtener más información sobre sus servicios de psicoterapia. ¿Podríamos coordinar una consulta?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-3"
                  onClick={() => trackWhatsAppClick('header_mobile')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <FaWhatsapp className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Escribir por WhatsApp</span>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse relative z-10"></div>
                </a>
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    openModal()
                    trackScheduleClick('header_mobile')
                  }}
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                >
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>Agendar Cita</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 