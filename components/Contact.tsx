import React from 'react'
import AppointmentScheduler from './AppointmentScheduler'

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="section-padding bg-neutral-50">
      <div id="agendar-cita"></div>
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Agenda tu <span className="text-gradient">cita ahora</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Selecciona la fecha, hora y tipo de sesión que mejor se adapte a tus necesidades. 
            El proceso es simple, rápido y completamente seguro.
          </p>
        </div>

        <AppointmentScheduler />

        {/* Información adicional */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 text-xl">📞</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Contacto Directo</h3>
            <p className="text-neutral-600 text-sm mb-2">+57 310 698 3385</p>
            <p className="text-neutral-600 text-sm">sandramar.v@hotmail.com</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary-600 text-xl">📍</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Ubicación</h3>
            <p className="text-neutral-600 text-sm">
              Carrera 13 Nº 122 – 34<br />
              Santa Bárbara, Bogotá
            </p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-accent-600 text-xl">🕒</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Horarios</h3>
            <p className="text-neutral-600 text-sm mb-1">Lun - Vie: 8:00 AM - 6:00 PM</p>
            <p className="text-neutral-600 text-sm">Sáb: 9:00 AM - 3:00 PM</p>
          </div>
        </div>

        {/* Nota importante */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Nota Importante</h4>
          <p className="text-blue-800 text-sm">
            Una vez agendada tu cita, recibirás una confirmación por email. 
            Te contactaré 24 horas antes para confirmar la sesión y enviarte 
            las indicaciones específicas si es necesario.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact 