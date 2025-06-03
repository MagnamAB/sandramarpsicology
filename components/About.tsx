import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaHeart, FaUsers, FaAward, FaBookOpen, FaHandshake, FaUserGraduate, FaBrain, FaStar, FaLightbulb } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarAlt } from 'react-icons/fa'

const About: React.FC = () => {
  const highlights = [
    {
      icon: FaGraduationCap,
      title: "Formación de Elite",
      description: "Universidad Santo Tomás + Formación con Claudio Naranjo y Bert Hellinger"
    },
    {
      icon: FaHeart,
      title: "Enfoque Humanista",
      description: "Terapia Gestalt y Constelaciones Familiares para sanación profunda"
    },
    {
      icon: FaUsers,
      title: "Experiencia Integral",
      description: "Terapia individual, familiar, de parejas y desarrollo personal"
    },
    {
      icon: FaAward,
      title: "Reconocimiento Internacional",
      description: "Facilitadora en México, España y Colombia"
    }
  ]

  return (
    <section id="sobre-mi" className="section-padding bg-white">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Psicóloga con 37+ años de{' '}
            <span className="text-gradient">experiencia clínica, educativa y organizacional</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            Especialista en <strong>psicoterapia Gestalt</strong>, <strong>terapia familiar sistémica</strong> y 
            <strong> constelaciones familiares</strong>. Formada con reconocidos maestros como 
            <strong> Claudio Naranjo en SAT Colombia</strong> y en <strong>sanación de condicionamientos infantiles Fischer Hoffman</strong>.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
              <div className="relative z-10">
                <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
                  <Image
                    src="/images/dra-sandra-vargas-2.JPG"
                    alt="Dra. Sandra Margarita Vargas en su consulta de desarrollo personal en Santa Bárbara, Bogotá"
                    fill
                    className="rounded-2xl object-cover shadow-2xl"
                    style={{ objectPosition: 'center center' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              
              {/* Floating achievement badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">37+</div>
                  <div className="text-sm text-neutral-600">Años de experiencia</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100 z-20">
                <div className="flex items-center gap-3">
                  <FaUserGraduate className="w-8 h-8 text-secondary-600" />
                  <div>
                    <div className="font-semibold text-neutral-900">Formación SAT</div>
                    <div className="text-sm text-neutral-600">Claudio Naranjo</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Trayectoria en <span className="text-primary-600">Psicología Transpersonal</span> y Desarrollo Personal
            </h3>
            
            <p className="text-neutral-600 leading-relaxed">
              Mi pasión por la <strong>psicoterapia Gestalt</strong> y el <strong>desarrollo personal para adultos</strong> 
              comenzó hace más de tres décadas. Durante este tiempo, he tenido el privilegio de acompañar a 
              miles de personas en sus procesos de <strong>autoconocimiento y desarrollo de consciencia</strong> 
              <strong>en Colombia, México, España y consultantes de diversas partes del mundo</strong>.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Mi formación incluye especializaciones en <strong>eneagrama y estudio del carácter</strong>, 
              técnicas de <strong>sanación de condicionamientos infantiles con el método Fischer Hoffman</strong>, 
              y trabajo profundo en <strong>constelaciones familiares sistémicas</strong> con reconocidos maestros internacionales.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Trabajo tanto con <strong>terapia individual para adultos</strong> como con 
              <strong> terapia de pareja internacional</strong>, siempre desde un enfoque integral que combina 
              la <strong>psicología transpersonal</strong> con técnicas sistémicas y Gestalt. 
              Ofrezco <strong>atención virtual a consultantes de todo el mundo</strong> y presencial desde mi consultorio en Colombia.
            </p>

            {/* Key Achievements */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-primary-50 rounded-lg p-4 text-center">
                <FaHeart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-neutral-900">1000+</div>
                <div className="text-sm text-neutral-600">Parejas acompañadas</div>
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-4 text-center">
                <FaUsers className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                <div className="font-semibold text-neutral-900">500+</div>
                <div className="text-sm text-neutral-600">Familias transformadas</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Training & Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Formación Especializada y <span className="text-gradient">Certificaciones</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaUserGraduate,
                title: "Formación SAT con Claudio Naranjo",
                description: "Programa de desarrollo humano SAT (Seekers After Truth) - Colombia",
                highlight: "Claudio Naranjo SAT Colombia"
              },
              {
                icon: FaHeart,
                title: "Proceso Fischer Hoffman",
                description: "Especialización en sanación de condicionamientos infantiles y patrones familiares",
                highlight: "Sanación condicionamientos infantiles"
              },
              {
                icon: FaUsers,
                title: "Constelaciones Familiares",
                description: "Formación en constelaciones familiares sistémicas con Bert Hellinger",
                highlight: "Bert Hellinger - Método sistémico"
              },
              {
                icon: FaBrain,
                title: "Eneagrama y Carácter",
                description: "Estudio profundo del eneagrama como herramienta de autoconocimiento",
                highlight: "Eneagrama estudio del carácter"
              },
              {
                icon: FaStar,
                title: "Psicología Transpersonal",
                description: "Enfoque integral que incluye dimensiones espirituales del desarrollo humano",
                highlight: "Psicología transpersonal Colombia"
              },
              {
                icon: FaLightbulb,
                title: "Terapia Gestalt",
                description: "Especialización en psicoterapia Gestalt para adultos y parejas",
                highlight: "Terapeuta Gestalt certificada"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">{item.title}</h4>
                <p className="text-neutral-600 text-sm leading-relaxed mb-3">{item.description}</p>
                <div className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full inline-block">
                  {item.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            ¿Listo para comenzar tu proceso de transformación?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Con más de 37 años acompañando procesos de <strong>autoconocimiento y desarrollo de consciencia</strong>, 
            estoy aquí para guiarte en tu camino hacia el bienestar emocional y las relaciones armónicas.
          </p>
          <Link 
            href="#contacto"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
          >
            <FaCalendarAlt className="w-5 h-5" />
            Agendar Primera Consulta
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default About 