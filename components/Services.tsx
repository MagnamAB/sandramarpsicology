import React from 'react'
import { FaHeart, FaUsers, FaUser, FaCompass, FaHandshake, FaStar, FaArrowRight, FaCalendarAlt, FaWhatsapp, FaLightbulb, FaCheck, FaGlobe, FaHome, FaBrain } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { generateWhatsAppLink } from '../lib/api'

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: FaUser,
      title: "Terapia Individual Adultos",
      duration: "75 minutos",
      modalidad: "Online Global + Presencial Bogotá",
      problemasQueResuelve: [
        "Ansiedad y estrés en la vida moderna",
        "Baja autoestima y falta de confianza",
        "Dificultades en relaciones interpersonales",
        "Búsqueda de propósito y sentido de vida",
        "Patrones autodestructivos y condicionamientos infantiles"
      ],
      descripcion: "Psicoterapia con enfoque integrativo para adultos con amplia experiencia clínica. Proceso profundo de autoconocimiento y desarrollo personal desde metodología que integra Gestalt, sistémico y transpersonal. Trabajo especializado en superar ansiedad, desarrollo de autoestima, manejo emocional y búsqueda de propósito vital.",
      beneficios: [
        "Autoconocimiento profundo y desarrollo de consciencia",
        "Gestión efectiva del estrés y la ansiedad",
        "Fortalecimiento de la autoestima y confianza personal", 
        "Sanación de condicionamientos infantiles y patrones limitantes",
        "Desarrollo de inteligencia emocional y resiliencia"
      ],
      keywords: "terapia individual adultos, psicoterapia integrativa, enfoque integrativo, autoconocimiento desarrollo personal, superar ansiedad adultos",
      color: "primary"
    },
    {
      icon: FaHeart,
      title: "Terapia de Pareja", 
      duration: "120 minutos",
      modalidad: "Online Internacional + Presencial Bogotá",
      problemasQueResuelve: [
        "Problemas de comunicación y conflictos constantes",
        "Crisis por infidelidad y pérdida de confianza",
        "Celos, control y patrones de codependencia",
        "Pérdida de conexión emocional y sexual",
        "Decisiones sobre separación o reconstrucción del vínculo"
      ],
      descripcion: "Terapia de pareja sistémica especializada con enfoque integrativo. Sanación de heridas emocionales, mejora comunicación y fortalecimiento de vínculos amorosos. Atención online internacional para parejas de todo el mundo y presencial en Bogotá.",
      beneficios: [
        "Comunicación asertiva y resolución de conflictos",
        "Sanación de heridas emocionales y reconstrucción de confianza",
        "Fortalecimiento del vínculo emocional y sexual",
        "Manejo de celos y patrones de codependencia",
        "Decisiones conscientes sobre el futuro de la relación"
      ],
      keywords: "terapia de pareja online, terapia matrimonial, problemas comunicación pareja, infidelidad celos",
      color: "secondary"
    }
  ]

  return (
    <section id="servicios" className="section-padding bg-neutral-50">
      <div className="container-responsive">
        {/* Enhanced Header with SEO Focus */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Servicios Especializados <span className="text-gradient">para Adultos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto mb-8"
          >
            <strong>Amplia experiencia</strong> en <strong>terapia individual adultos</strong> y{' '}
            <strong>terapia de pareja</strong> con enfoque <strong>integrativo que combina sistémico y Gestalt</strong>.{' '}
            <strong>Atención online internacional en español</strong> y{' '}
            <strong>sesiones presenciales en consultorio privado Bogotá</strong> para máxima confidencialidad.
          </motion.p>

          {/* Unique Value Propositions */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4">
              <FaGlobe className="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-primary-800">Atención Online Global</div>
                <div className="text-sm text-primary-600">Terapia en español para hispanohablantes de todo el mundo</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl p-4">
              <FaHome className="w-8 h-8 text-secondary-600 flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-secondary-800">Consultorio Privado Bogotá</div>
                <div className="text-sm text-secondary-600">Ambiente discreto para máxima confidencialidad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem-Solution Oriented Services */}
        <div className="space-y-16">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Problems Section */}
                <div className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center`}>
                      <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                      <div className="flex flex-col gap-1 text-sm">
                      <div className="font-semibold text-primary-600">{service.duration}</div>
                        <div className="text-neutral-600">{service.modalidad}</div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 text-red-700">
                    ¿Te identificas con alguna de estas situaciones?
                  </h4>
                  
                  <ul className="space-y-3 mb-6">
                    {service.problemasQueResuelve.map((problema, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-700 leading-relaxed">{problema}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-sm text-neutral-600 bg-white/50 rounded-lg p-4">
                    <strong>Si has experimentado alguna de estas situaciones</strong>, mi enfoque especializado puede ayudarte a encontrar soluciones profundas y duraderas.
                  </div>
                </div>

                {/* Solutions Section */}
                <div className="p-8">
                  <h4 className="text-lg font-bold text-green-700 mb-4">
                    Mi enfoque para tu transformación:
                  </h4>
                  
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {service.descripcion}
                  </p>
                  
                  <h5 className="font-bold text-neutral-900 mb-4">Beneficios que obtendrás:</h5>
                  <ul className="space-y-3 mb-8">
                    {service.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Link 
                        href="#agendar-cita"
                        className="btn-primary flex-1 text-center py-3 px-6 inline-flex items-center justify-center gap-2"
                      >
                        <FaCalendarAlt className="w-4 h-4" />
                        Agendar Sesión
                      </Link>
                      
                      <a
                        href={generateWhatsAppLink(`Hola Sandra, me interesa conocer más sobre ${service.title.toLowerCase()}. Tengo algunas de las situaciones que mencionas y me gustaría saber cómo puedes ayudarme con tu enfoque de 37 años de experiencia.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-colors flex-1 text-center py-3 px-6 inline-flex items-center justify-center gap-2 rounded-full font-semibold"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        Consultar
                      </a>
                    </div>
                    
                    <div className="text-xs text-neutral-500 bg-neutral-50 px-3 py-2 rounded-full text-center">
                      <strong>Palabras clave:</strong> {service.keywords}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services 