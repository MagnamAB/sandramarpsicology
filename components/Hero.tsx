import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPlay, FaCalendarAlt, FaWhatsapp, FaHeart, FaUsers, FaAward, FaCertificate, FaUserGraduate, FaMapMarkerAlt, FaChevronDown, FaStar, FaGlobe } from 'react-icons/fa'
import Image from 'next/image'
import { generateWhatsAppLink } from '../lib/api'

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat opacity-20" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }}>
        </div>
      </div>

      <div className="container-responsive relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg"
            >
              <FaCertificate className="w-4 h-4" />
              Psicóloga Clínica Especializada
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-8 py-2"
            >
              <span className="block pb-1">Sandra M. Vargas</span>
              <span className="text-gradient block mt-2 pb-2">Psicóloga Clínica en Bogotá</span>
              <span className="text-lg md:text-xl font-medium text-neutral-600 block mt-4">Enfoque Integrativo • Online Global + Presencial Bogotá</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed"
            >
              <strong>Psicóloga clínica especializada en adultos</strong> con{' '}
              <strong>enfoque integrativo holístico</strong> que combina{' '}
              <strong>Gestalt, sistémico y transpersonal</strong>.{' '}
              <strong>Transformando vidas a través de un proceso personal profundo</strong> con{' '}
              <strong>atención online global en español</strong> y presencial en{' '}
              <strong>consultorio privado en Bogotá</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link 
                href="#agendar-cita"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
              >
                Agendar Cita Online o Presencial
                <FaCalendarAlt className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              
              <a
                href={generateWhatsAppLink("Hola Sandra, me interesa conocer más sobre terapia individual adultos o terapia de pareja. ¿Podrías contarme sobre tu enfoque con 37 años de experiencia?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group"
              >
                <FaWhatsapp className="mr-2 w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                Consulta WhatsApp
              </a>
            </motion.div>

            {/* Enhanced Specialties Tags with SEO Keywords */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  'Enfoque Integrativo',
                  'Terapia Individual Adultos', 
                  'Terapia de Pareja',
                  'Online Internacional',
                  'Consultorio Privado'
                ].map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-neutral-700 border border-neutral-200 shadow-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              {/* Unique Differentiators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg px-4 py-3">
                  <FaGlobe className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <div className="font-semibold text-primary-800 text-sm">Atención Global Online</div>
                    <div className="text-xs text-primary-600">Español para todo el mundo</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg px-4 py-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-secondary-600" />
                  <div className="text-left">
                    <div className="font-semibold text-secondary-800 text-sm">Consultorio Privado Bogotá</div>
                    <div className="text-xs text-secondary-600">Máxima confidencialidad</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              
              {/* Professional Photo */}
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px]">
                  <Image
                    src="/images/dra-sandra-vargas.jpg"
                    alt="Sandra Vargas - Psicóloga clínica Bogotá 37 años experiencia terapia individual adultos, terapia de pareja, Gestalt, atención online global y presencial consultorio privado"
                    fill
                    className="rounded-xl object-cover"
                    style={{ objectPosition: '60% center' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Terapia Gestalt Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-neutral-100">
                  <div className="flex items-center gap-2">
                    <FaUserGraduate className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Terapia Gestalt</div>
                      <div className="text-xs text-neutral-600">Claudio Naranjo SAT</div>
                    </div>
                  </div>
                </div>

                {/* Specialization badge */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-neutral-100">
                  <div className="flex items-center gap-2">
                    <FaUserGraduate className="w-4 h-4 text-secondary-600" />
                    <span className="text-sm font-medium text-neutral-700">Enfoque Integrativo Holístico</span>
                  </div>
                </div>

                {/* Services badge */}
                <div className="absolute top-16 -left-6 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <FaHeart className="w-4 h-4" />
                    <span className="text-sm font-medium">Especializada en Adultos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-neutral-400">
          <span className="text-sm mb-2">Conoce más sobre mi experiencia</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 