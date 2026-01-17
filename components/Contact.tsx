import React from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp, FaEnvelope, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'
import { generateWhatsAppLink } from '../lib/api'
import { getText } from '../lib/texts'
import { useAppointmentModal } from '../contexts/AppointmentModalContext'

const Contact: React.FC = () => {
  const { openModal } = useAppointmentModal()

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

        {/* CTA Principal para abrir el modal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Agenda tu Cita Ahora
              </h3>
              
              <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
                Reserva tu sesión en menos de 2 minutos. 
                Elige entre atención presencial en Bogotá o sesión virtual desde cualquier lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openModal}
                  className="group bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <FaCalendarAlt className="w-5 h-5" />
                  Agendar Cita
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a
                  href={generateWhatsAppLink("Hola Sandra, me interesa agendar una cita para terapia psicológica")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>o escríbeme por WhatsApp</span>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="font-bold text-xl">75 min</div>
                  <div className="text-primary-200">Sesión individual</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="font-bold text-xl">120 min</div>
                  <div className="text-primary-200">Sesión de parejas</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="font-bold text-xl">24h</div>
                  <div className="text-primary-200">Confirmación previa</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="font-bold text-xl">100%</div>
                  <div className="text-primary-200">Pago seguro</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Información de contacto optimizada para SEO local */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
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
              <p className="text-neutral-600 text-sm font-medium">Lun, Mié, Jue, Vie: 7:30 AM - 1:00 PM / 3:00 PM - 7:30 PM</p>
              <p className="text-neutral-600 text-sm font-medium">Mar, Sáb: 7:30 AM - 12:00 PM</p>
              <p className="text-neutral-600 text-sm">
                <strong>Hora Colombia (GMT-5)</strong>
              </p>
              <p className="text-neutral-600 text-xs">
                Los horarios se adaptan automáticamente a tu zona horaria
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
            Proceso de Agendamiento de Cita
          </h4>
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h5 className="font-semibold text-primary-800 mb-1">Selecciona</h5>
              <p className="text-primary-700">
                Tipo de sesión y modalidad
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h5 className="font-semibold text-primary-800 mb-1">Elige</h5>
              <p className="text-primary-700">
                Fecha y hora disponible
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h5 className="font-semibold text-primary-800 mb-1">Paga</h5>
              <p className="text-primary-700">
                De forma segura con Wompi
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h5 className="font-semibold text-primary-800 mb-1">Confirmación</h5>
              <p className="text-primary-700">
                Recibes email y WhatsApp
              </p>
            </div>
          </div>
          
          <button
            onClick={openModal}
            className="mt-8 btn-primary inline-flex items-center gap-2"
          >
            <FaCalendarAlt className="w-5 h-5" />
            Comenzar Agendamiento
          </button>
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
