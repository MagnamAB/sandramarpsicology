import React from 'react'
import { getText } from '../lib/texts'

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container-responsive">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{getText('logo-text', 'Sandra Vargas')} {getText('logo-subtext', 'Psicóloga Clínica')}</h3>
          <p className="text-neutral-600 mb-6">
            Psicóloga clínica con <strong>enfoque integrativo</strong> que combina{' '}
            <strong>Gestalt, sistémico y transpersonal</strong>.{' '}
            Acompañamiento terapéutico a personas, familias y grupos con más de 37 años de experiencia.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-neutral-400">
            <span>📞 +57 310 698 3385</span>
            <span>📧 sandramar.v@hotmail.com</span>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-neutral-500">
            {getText('footer-copyright', '© 2025 Sandra Vargas Psicóloga. Todos los derechos reservados. Psicóloga especializada en terapia individual y de pareja con 37 años de experiencia en Bogotá.')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 