import React from 'react'
import { motion } from 'framer-motion'
import { FaGlobe, FaVideo, FaClock, FaShieldAlt, FaCreditCard, FaComments, FaCalendarAlt, FaWhatsapp, FaCheck, FaUser, FaHeart, FaUsers, FaLightbulb, FaPlay } from 'react-icons/fa'
import Link from 'next/link'
import { generateWhatsAppLink } from '../lib/api'

const OnlineTherapy: React.FC = () => {
  const advantages = [
    {
      icon: FaGlobe,
      title: "Accesibilidad Global",
      description: "Atención psicológica online en español para hispanohablantes de todo el mundo. Sin límites geográficos."
    },
    {
      icon: FaClock,
      title: "Horarios Flexibles",
      description: "Adaptamos los horarios de sesión a tu zona horaria. Disponibilidad para diferentes husos horarios internacionales."
    },
    {
      icon: FaShieldAlt,
      title: "Confidencialidad Total",
      description: "Sesiones completamente privadas y seguras. Protocolo de confidencialidad internacional estricto."
    },
    {
      icon: FaVideo,
      title: "Tecnología Confiable",
      description: "Utilizamos la plataforma segura Zoom para garantizar excelente calidad audio-visual y estabilidad en las sesiones."
    },
    {
      icon: FaCreditCard,
      title: "Pagos Internacionales",
      description: "Métodos de pago adaptados a diferentes países: transferencias, PayPal, Wise, y otros sistemas internacionales."
    },
    {
      icon: FaComments,
      title: "Español Neutro",
      description: "Comunicación en español neutro, adaptado para hispanohablantes de cualquier país o región."
    }
  ]

  const testimonials = [
    {
      name: "María José - España",
      text: "La terapia online con la Dra. Sandra ha sido transformadora. Desde Madrid, he podido trabajar profundamente mis patrones familiares.",
      service: "Terapia Individual Online"
    },
    {
      name: "Carlos y Ana - México",
      text: "Como pareja mexicana viviendo en EE.UU., encontrar terapia en español de calidad era difícil. Sandra nos ayudó a sanar nuestra relación.",
      service: "Terapia de Pareja Online"
    },
    {
      name: "Roberto - Argentina",
      text: "El proceso de desarrollo personal online superó mis expectativas. La conexión y profundidad del trabajo es igual que presencial.",
      service: "Desarrollo Personal Online"
    }
  ]

  return (
    <section id="terapia-online" className="section-padding bg-white">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            <span className="text-gradient">Terapia Online Global</span> en Español
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            <strong>Tu transformación personal no tiene fronteras</strong>. Accede a terapia especializada{' '}
            <strong>desde cualquier país del mundo</strong>, con la comodidad de tu hogar y{' '}
            <strong>horarios adaptados a tu zona horaria</strong>. La misma calidad y profundidad{' '}
            del consultorio presencial, ahora <strong>disponible globalmente para hispanohablantes</strong>.
          </motion.p>
        </div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Ventajas de la <span className="text-gradient">Terapia Psicológica Online</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Testimonios de <span className="text-gradient">Consultantes Internacionales</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-neutral-600 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-primary-600">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-neutral-50 rounded-2xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            ¿Cómo Funciona la <span className="text-gradient">Consulta Psicológica Online?</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Contacto Inicial",
                description: "Contáctame vía WhatsApp o formulario para una consulta inicial."
              },
              {
                step: "2", 
                title: "Agenda tu Cita",
                description: "Coordinamos horario según tu zona horaria y preferencias de plataforma digital."
              },
              {
                step: "3",
                title: "Sesión Virtual",
                description: "Nos conectamos vía Zoom para la sesión terapéutica profesional."
              },
              {
                step: "4",
                title: "Seguimiento",
                description: "Establezco un plan de seguimiento personalizado y coordinamos próximas sesiones."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            ¿Listo para Comenzar tu <span className="text-gradient">Terapia Online?</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Inicia tu proceso de crecimiento personal desde cualquier parte del mundo.{' '}
            <strong>Consulta psicológica online en español</strong> de la más alta calidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={generateWhatsAppLink("Hola Dra. Sandra, me interesa iniciar terapia online en español. ¿Podríamos agendar una consulta inicial?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
            >
              <FaWhatsapp className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Iniciar Consulta Online
            </a>
            
            <Link 
              href="#agendar-cita"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group"
            >
              Agendar Sesión Virtual
              <FaCalendarAlt className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OnlineTherapy 