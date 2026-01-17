import React from 'react'
import Link from 'next/link'
import { getText } from '../lib/texts'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLock, FaCreditCard } from 'react-icons/fa'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container-responsive py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna 1: Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {getText('logo-text', 'Sandra Vargas')}
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              Psicóloga Clínica con enfoque integrativo. 
              Más de 38 años de experiencia en terapia individual y de pareja.
            </p>
            <div className="space-y-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <FaPhone className="w-4 h-4 text-primary-400" />
                +57 310 698 3385
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4 text-primary-400" />
                sandramar.v@hotmail.com
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-primary-400" />
                Carrera 13 Nº 122-34, Bogotá
              </p>
            </div>
          </div>

          {/* Columna 2: Enlaces Legales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Información Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/politica-privacidad" className="text-neutral-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="text-neutral-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="text-neutral-400 hover:text-white transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
            
            {/* Sello de seguridad */}
            <div className="mt-6 flex items-center gap-2 text-neutral-500 text-xs">
              <FaLock className="w-4 h-4" />
              <span>Sitio web seguro (SSL)</span>
            </div>
          </div>

          {/* Columna 3: Pagos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Pagos Seguros</h4>
            <p className="text-neutral-400 text-sm mb-3">
              Procesados por Wompi, pasarela certificada por la Superintendencia Financiera de Colombia.
            </p>
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <FaCreditCard className="w-4 h-4" />
              <span>Visa • Mastercard • PSE • Nequi</span>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="mt-6">
              <a
                href="https://wa.me/573106983385"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                Escríbeme por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-responsive py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <p>
              © {currentYear} Sandra Margarita Vargas - Psicóloga Clínica. 
              Todos los derechos reservados.
            </p>
            <p>
              Tarjeta Profesional de Psicología: 51641450
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 