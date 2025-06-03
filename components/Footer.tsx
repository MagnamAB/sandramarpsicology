import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container-responsive">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Dra. Sandra Margarita Vargas</h3>
          <p className="text-neutral-300 mb-6">
            Psicóloga Clínica • 37+ años transformando vidas
          </p>
          <div className="flex justify-center space-x-6 text-sm text-neutral-400">
            <span>📞 +57 310 698 3385</span>
            <span>📧 sandramar.v@hotmail.com</span>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-neutral-500">
            © 2025 Dra. Sandra Vargas. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 