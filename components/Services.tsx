import React from 'react'
import { FaHeart, FaUsers, FaUser, FaCompass, FaHandshake, FaStar, FaArrowRight, FaCalendarAlt, FaWhatsapp, FaLightbulb, FaCheck } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { generateWhatsAppLink } from '../lib/api'

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: FaHeart,
      title: "Terapia de Pareja Internacional",
      duration: "120 minutos",
      price: "Virtual Global y Presencial",
      description: "Especializada en terapia de pareja con enfoque sistémico y Gestalt. Trabajo profundo para sanar heridas, mejorar la comunicación y fortalecer el vínculo amoroso. Atención virtual a consultantes de todo el mundo y presencial en Colombia.",
      features: [
        "Enfoque sistémico y Gestalt integrado",
        "Sanación de heridas emocionales profundas", 
        "Técnicas de comunicación asertiva",
        "Reconstrucción del vínculo amoroso",
        "Modalidad virtual internacional y presencial en Colombia"
      ],
      keywords: "terapia de pareja internacional, terapia pareja sistémica global"
    },
    {
      icon: FaUsers,
      title: "Terapia Familiar Sistémica",
      duration: "120 minutos", 
      price: "Virtual Global y Presencial",
      description: "Constelaciones familiares sistémicas y terapia familiar para sanar dinámicas transgeneracionales y crear relaciones familiares más armónicas. Atención virtual a familias de todo el mundo.",
      features: [
        "Constelaciones familiares sistémicas internacionales",
        "Sanación de patrones transgeneracionales",
        "Método Bert Hellinger certificado",
        "Terapia familiar sistémica especializada",
        "Trabajo con dinámicas familiares profundas"
      ],
      keywords: "constelaciones familiares sistémicas internacional, terapia familiar global"
    },
    {
      icon: FaUser,
      title: "Terapia Individual Adultos",
      duration: "75 minutos",
      price: "Virtual Global y Presencial", 
      description: "Psicoterapia Gestalt individual para adultos. Proceso profundo de autoconocimiento y desarrollo de consciencia desde el enfoque transpersonal. Atención virtual a consultantes de todo el mundo.",
      features: [
        "Psicoterapia Gestalt especializada",
        "Desarrollo personal para adultos",
        "Autoconocimiento y desarrollo de consciencia",
        "Trabajo con eneagrama y estudio del carácter",
        "Sanación de condicionamientos infantiles"
      ],
      keywords: "terapia individual adultos internacional, psicoterapia Gestalt global"
    },
    {
      icon: FaLightbulb,
      title: "Desarrollo Personal Internacional",
      duration: "75 minutos",
      price: "Virtual Global y Presencial",
      description: "Proceso especializado de desarrollo personal y crecimiento consciente para adultos. Trabajo profundo de autoconocimiento, sanación emocional y expansión de consciencia desde el enfoque transpersonal y Gestalt. Atención virtual internacional.",
      features: [
        "Autoconocimiento y desarrollo de consciencia",
        "Sanación de condicionamientos infantiles",
        "Trabajo con eneagrama y estudio del carácter",
        "Técnicas de psicología transpersonal",
        "Proceso de individuación y crecimiento personal"
      ],
      keywords: "desarrollo personal adultos internacional, autoconocimiento desarrollo consciencia global"
    }
  ]

  const corporateServices = [
    {
      icon: FaHandshake,
      title: "Conferencias Empresariales - Desarrollo Personal",
      description: "Conferencias especializadas para empresas enfocadas en el crecimiento personal de equipos de trabajo y cuerpos de ventas. Experiencia comprobada en empresas multinivel y corporaciones.",
      features: [
        "Desarrollo de liderazgo personal",
        "Motivación y crecimiento de equipos",
        "Manejo del estrés y presión laboral", 
        "Comunicación efectiva en ventas",
        "Desarrollo de consciencia empresarial"
      ],
      keywords: "conferencias empresariales desarrollo personal Colombia"
    },
    {
      icon: FaStar,
      title: "Facilitación Grupal Corporativa",
      description: "Facilitación de procesos grupales para empresas que buscan fortalecer sus equipos de trabajo y mejorar el clima laboral a través del desarrollo personal y la consciencia organizacional.",
      features: [
        "Dinámicas de cohesión grupal",
        "Resolución de conflictos empresariales",
        "Desarrollo de inteligencia emocional",
        "Construcción de equipos de alto rendimiento",
        "Transformación del clima organizacional"
      ],
      keywords: "facilitación grupal corporativa empresas Colombia"
    },
    {
      icon: FaUsers,
      title: "Capacitación para Cuerpos de Ventas",
      description: "Programas especializados para equipos de ventas en empresas multinivel y corporaciones, enfocados en el desarrollo personal como base del éxito profesional y comercial.",
      features: [
        "Desarrollo de confianza y autoestima",
        "Manejo de objeciones desde la consciencia",
        "Comunicación persuasiva auténtica",
        "Resiliencia ante el rechazo",
        "Construcción de relaciones genuinas"
      ],
      keywords: "capacitación cuerpos ventas multinivel Colombia"
    },
    {
      icon: FaLightbulb,
      title: "Programas de Bienestar Organizacional",
      description: "Programas integrales de bienestar para empleados que combinan desarrollo personal, manejo del estrés y crecimiento de consciencia para mejorar la productividad y satisfacción laboral.",
      features: [
        "Manejo integral del estrés laboral",
        "Técnicas de mindfulness empresarial",
        "Equilibrio vida-trabajo",
        "Desarrollo de propósito personal",
        "Prevención del burnout organizacional"
      ],
      keywords: "programas bienestar organizacional empleados Colombia"
    }
  ]

  return (
    <section id="servicios" className="section-padding bg-neutral-50">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Servicios de <span className="text-gradient">Psicoterapia Especializada</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            <strong>Terapeuta Gestalt certificada</strong> con especialización en <strong>terapia de pareja internacional</strong>, 
            <strong> terapia familiar sistémica</strong>, <strong>constelaciones familiares</strong> y 
            <strong> desarrollo personal para adultos</strong>. <strong>Atención virtual a consultantes de todo el mundo</strong> y presencial en Colombia.
          </motion.p>
        </div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-right text-sm">
                      <div className="font-semibold text-primary-600">{service.duration}</div>
                      <div className="text-neutral-500">{service.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full inline-block">
                    {service.keywords}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corporate Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              <span className="text-gradient">Servicios Corporativos</span> y Empresariales
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              <strong>Conferencista y facilitadora</strong> con más de 37 años de experiencia dirigiendo grupos grandes. 
              Especializada en <strong>desarrollo personal empresarial</strong>, <strong>capacitación de cuerpos de ventas</strong> y 
              <strong> programas de bienestar organizacional</strong> para empresas multinivel y corporaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {corporateServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">{service.title}</h4>
                </div>
                
                <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaArrowRight className="w-3 h-3 text-secondary-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-xs text-secondary-600 font-medium bg-secondary-50 px-3 py-1 rounded-full inline-block">
                  {service.keywords}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Corporate CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-8">
            <h4 className="text-xl font-bold text-neutral-900 mb-3">
              ¿Tu empresa necesita fortalecer el desarrollo personal de sus equipos?
            </h4>
            <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
              Más de 37 años de experiencia facilitando procesos grupales y conferencias para empresas. 
              Especializada en cuerpos de ventas multinivel y desarrollo organizacional.
            </p>
            <a
              href={generateWhatsAppLink("Hola Dra. Sandra, represento una empresa y estamos interesados en sus servicios corporativos de desarrollo personal para nuestros equipos. ¿Podríamos coordinar una reunión?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4"
            >
              <FaWhatsapp className="w-5 h-5" />
              Contacto Empresarial
            </a>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            ¿Cuál es el servicio ideal para ti?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Con más de 37 años de experiencia en <strong>psicoterapia Gestalt</strong>, <strong>terapia de pareja</strong> y 
            <strong> constelaciones familiares sistémicas</strong>, te ayudo a encontrar el camino perfecto para tu proceso de transformación. 
            <strong>Atención virtual a consultantes de todo el mundo</strong> y presencial en Colombia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#agendar-cita"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4"
            >
              <FaCalendarAlt className="w-5 h-5" />
              Agendar Consulta Inicial
            </Link>
            <a
              href={generateWhatsAppLink("Hola Dra. Sandra, me interesa conocer más sobre sus servicios de psicoterapia. ¿Cuál sería el más adecuado para mi situación?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4"
            >
              <FaWhatsapp className="w-5 h-5 text-green-500" />
              Consultar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 