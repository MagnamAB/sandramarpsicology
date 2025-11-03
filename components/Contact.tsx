import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp, FaEnvelope, FaCalendarAlt } from 'react-icons/fa'
import AppointmentScheduler from './AppointmentScheduler'
import { generateWhatsAppLink } from '../lib/api'
import { getText } from '../lib/texts'

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="section-padding bg-neutral-50">
      <div id="agendar-cita"></div>
      <div className="container-responsive">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-primary-600">Agendar Cita</span> <span className="text-gradient">Psicóloga Bogotá</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            <strong>Agenda tu cita con psicóloga en Bogotá</strong> de forma fácil y rápida. Ofrezco{' '}
            <strong>atención presencial en Santa Bárbara, Bogotá</strong> y <strong>consulta psicológica online</strong>{' '}
            para consultantes internacionales. Selecciona la modalidad que prefieras.
          </motion.p>
        </div>

        <AppointmentScheduler />

        {/* Información de contacto optimizada para SEO local */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="card text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <FaPhone className="text-primary-600 text-xl" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-3">Contacto Psicóloga Bogotá</h3>
            <div className="space-y-2">
              <p className="text-neutral-600 text-sm font-medium">+57 310 698 3385</p>
            <p className="text-neutral-600 text-sm">sandramar.v@hotmail.com</p>
              <a
                href={generateWhatsAppLink("Hola Sandra, me interesa agendar una cita para terapia psicológica en Bogotá")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mt-2"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp Directo
              </a>
            </div>
          </div>

          <div className="card text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
              <FaMapMarkerAlt className="text-secondary-600 text-xl" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-3">Consultorio en Bogotá</h3>
            <div className="space-y-2">
            <p className="text-neutral-600 text-sm">
              Carrera 13 Nº 122 – 34<br />
              Santa Bárbara, Bogotá
            </p>
              <p className="text-neutral-600 text-sm">
                <strong>Zona Norte de Bogotá</strong><br />
                Parqueadero privado disponible
              </p>
            </div>
          </div>

          <div className="card text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 transition-colors">
              <FaClock className="text-accent-600 text-xl" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-3">Horario de Atención</h3>
            <div className="space-y-2">
              <p className="text-neutral-600 text-sm font-medium">Lun, Mié, Jue, Vie: 7:30 AM - 7:30 PM</p>
              <p className="text-neutral-600 text-sm font-medium">Mar, Sáb: 7:30 AM - 12:00 PM</p>
              <p className="text-neutral-600 text-sm">
                <strong>Horarios de citas:</strong><br />
                • Individual (75 min): Última cita 6:15 PM<br />
                • Pareja (120 min): Última cita 5:30 PM<br />
                • Mar/Sáb: Citas deben terminar antes 12:00 PM
              </p>
              <p className="text-neutral-600 text-sm">
                <strong>Consultas internacionales:</strong> Horarios flexibles
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modalidades de atención */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="card">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary-600" />
              Atención Presencial en Bogotá
            </h3>
            <ul className="space-y-2 text-neutral-600">
              <li>• <strong>Terapia individual adultos en consultorio</strong></li>
              <li>• <strong>Terapia de pareja presencial en Bogotá</strong></li>
              <li>• Ubicado en Santa Bárbara, zona norte de Bogotá</li>
              <li>• Ambiente cómodo y privado</li>
              <li>• Parqueadero privado disponible</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <FaCalendarAlt className="text-secondary-600" />
              Terapia Online Internacional
            </h3>
            <ul className="space-y-2 text-neutral-600">
              <li>• <strong>Consulta psicológica online individual en español</strong></li>
              <li>• <strong>Terapia de pareja internacional virtual</strong></li>
              <li>• Horarios adaptados a tu zona horaria</li>
              <li>• Plataforma segura Zoom</li>
              <li>• Atención a hispanohablantes de todo el mundo</li>
              <li>• Misma calidad que la atención presencial</li>
            </ul>
          </div>
        </motion.div>

        {/* Nota importante optimizada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary-50 border border-primary-200 rounded-xl p-8 text-center"
        >
          <h4 className="font-bold text-primary-900 mb-4 text-lg">
            ✨ Proceso de Agendamiento de Cita
          </h4>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-semibold text-primary-800 mb-2">1. Agenda tu Cita</h5>
              <p className="text-primary-700">
                Selecciona fecha, hora y modalidad (presencial en Bogotá u online internacional)
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-primary-800 mb-2">2. Confirmación</h5>
              <p className="text-primary-700">
                Recibirás confirmación por email y WhatsApp con todos los detalles
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-primary-800 mb-2">3. Sesión</h5>
              <p className="text-primary-700">
                Te contacto 24h antes para confirmar y enviar indicaciones específicas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h4 className="text-xl font-bold text-neutral-900 mb-4">
            ¿Prefieres contactar directamente?
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={generateWhatsAppLink("Hola Sandra, me gustaría agendar una cita para consulta psicológica. ¿Cuál sería la mejor modalidad para mi caso?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
            <a
              href="mailto:sandramar.v@hotmail.com?subject=Consulta para agendar cita psicóloga Bogotá"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <FaEnvelope className="w-5 h-5" />
              Enviar Email
            </a>
        </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 