import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaHeart, FaUsers, FaAward, FaBookOpen, FaHandshake, FaUserGraduate, FaBrain, FaStar, FaLightbulb, FaGlobe, FaHome } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarAlt } from 'react-icons/fa'

const About: React.FC = () => {
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
            <span className="text-gradient">Más de 37 años de experiencia</span> en{' '}
            <span className="block">psicología clínica</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            <strong>La terapia no es solo mi profesión, es mi camino de vida</strong>. Durante décadas he vivido{' '}
            <strong>en primera persona los procesos de transformación profunda</strong> que ahora facilito a mis consultantes.{' '}
            Mi práctica se fundamenta en <strong>la empatía real que nace de la experiencia vivida</strong>,{' '}
            el <strong>respeto profundo por tu historia única</strong> y un{' '}
            <strong>enfoque integrativo que combina sistémico, gestáltico y transpersonal</strong>{' '}
            en un acompañamiento que <strong>honra todas las dimensiones de tu ser</strong>.
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
                    alt="Sandra Margarita Vargas - Psicóloga clínica con 37 años experiencia especializada en terapia individual adultos, terapia de pareja, Gestalt, atención online global y presencial en consultorio privado Bogotá"
                    fill
                    className="rounded-2xl object-cover shadow-2xl"
                    style={{ objectPosition: 'center center' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              
              {/* Enhanced achievement badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-lg p-4 border border-primary-500 z-20">
                <div className="text-center">
                  <div className="text-3xl font-bold">37+</div>
                  <div className="text-xs opacity-90">Años Experiencia</div>
                  <div className="text-xs opacity-75">Psicología Clínica</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100 z-20">
                <div className="flex items-center gap-3">
                  <FaHome className="w-6 h-6 text-secondary-600" />
                  <div>
                    <div className="font-semibold text-neutral-900">Consultorio Privado</div>
                    <div className="text-sm text-neutral-600">Bogotá + Online Global</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Content with Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
              <span className="text-primary-600">Sandra Margarita Vargas:</span> Un camino de vida dedicado a la transformación humana
            </h3>
            
            <p className="text-neutral-600 leading-relaxed">
              Soy <strong>Sandra Vargas, psicóloga clínica especializada</strong> en el{' '}
              <strong>acompañamiento terapéutico integral a adultos</strong>. Mi formación comenzó en 1986 en la{' '}
              <strong>Universidad Santo Tomás</strong>, pero mi verdadero aprendizaje ha sido un{' '}
              <strong>camino de vida de transformación personal y profesional</strong>.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Durante décadas he sido <strong>participante activa en procesos terapéuticos profundos</strong>,{' '}
              tanto en Colombia como internacionalmente. Esta vivencia personal me ha permitido{' '}
              <strong>desarrollar un enfoque integrativo auténtico</strong> que combina{' '}
              <strong>Gestalt, sistémico y transpersonal</strong>.{' '}
              <strong>No solo estudio estas metodologías integradas, las vivo</strong>.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Mi enfoque se <strong>especializa en adultos</strong> con{' '}
              <strong>metodología integrativa profunda</strong>. Ofrezco <strong>terapia individual para autoconocimiento y desarrollo personal</strong> y{' '}
              <strong>terapia de pareja con enfoque integrativo sistémico</strong> para{' '}
              fortalecimiento de vínculos. <strong>Atiendo online a hispanohablantes de todo el mundo</strong> y{' '}
              presencialmente en mi <strong>consultorio privado en Bogotá</strong> para máxima confidencialidad.
            </p>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaHeart className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Mi enfoque integrativo</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    <strong>"Mi práctica integrativa combina lo mejor de cada metodología"</strong>. Mi enfoque se basa en{' '}
                    <strong>la integración consciente de Gestalt, sistémico y transpersonal</strong> con{' '}
                    <strong>la empatía real y el respeto profundo por la historia de cada persona</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Training & Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Mi <span className="text-gradient">Enfoque Integrativo</span>: Más que técnicas, una metodología de vida
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">¿Qué significa "integrativo"?</h4>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Mi <strong>enfoque integrativo</strong> no significa simplemente usar varias técnicas. Es una{' '}
                <strong>metodología consciente y coherente</strong> que combina lo mejor de{' '}
                <strong>Gestalt, sistémico y transpersonal</strong> en un proceso unificado que honra{' '}
                <strong>todas las dimensiones del ser humano</strong>: cuerpo, mente, emociones, vínculos y espiritualidad.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaHeart className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">Gestalt: El aquí y ahora</h5>
                    <p className="text-sm text-neutral-600">Consciencia presente, contacto auténtico y responsabilidad personal</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaUsers className="w-4 h-4 text-secondary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">Sistémico: Los vínculos que nos forman</h5>
                    <p className="text-sm text-neutral-600">Patrones familiares, relaciones y dinámicas transgeneracionales</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaLightbulb className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">Transpersonal: La dimensión espiritual</h5>
                    <p className="text-sm text-neutral-600">Propósito vital, trascendencia y conexión con algo mayor</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">¿Cómo lo aplico en mi práctica?</h4>
              <p className="text-neutral-600 leading-relaxed mb-6">
                En cada sesión, <strong>integramos conscientemente</strong> estos enfoques según lo que necesites en ese momento.{' '}
                No es ecléctico ni improvisado: es una <strong>metodología coherente</strong> desarrollada a lo largo de{' '}
                <strong>años de experiencia y formación continua</strong>.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100">
                <h5 className="font-bold text-neutral-900 mb-4">Ejemplo práctico en terapia individual:</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-600">1</div>
                    <p className="text-neutral-600"><strong>Gestalt:</strong> "¿Qué sientes ahora mismo en tu cuerpo mientras hablas de esto?"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-secondary-600">2</div>
                    <p className="text-neutral-600"><strong>Sistémico:</strong> "¿Cómo aprendiste este patrón en tu familia de origen?"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-600">3</div>
                    <p className="text-neutral-600"><strong>Transpersonal:</strong> "¿Qué quiere emerger en ti a través de esta experiencia?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl p-6 max-w-4xl mx-auto">
              <h4 className="text-xl font-bold mb-3">El resultado: Transformación integral y duradera</h4>
              <p className="opacity-90">
                <strong>No solo alivio de síntomas, sino evolución consciente</strong>. Mi enfoque integrativo te acompaña{' '}
                no solo a resolver problemas, sino a <strong>despertar tu potencial completo</strong> como ser humano integral.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Training & Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Formación Especializada y <span className="text-gradient">Certificaciones</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaUserGraduate,
                title: "Programa SAT - Claudio Naranjo",
                description: "Formación profunda en programa SAT (Seekers After Truth) con el reconocido psiquiatra Claudio Naranjo",
                highlight: "Psicoterapia Gestalt y Eneagrama",
                year: "Certificación completa"
              },
              {
                icon: FaHeart,
                title: "Proceso Fischer Hoffman",
                description: "Especialización en sanación de condicionamientos infantiles y patrones familiares transgeneracionales",
                highlight: "Sanación condicionamientos infantiles",
                year: "Proceso completo"
              },
              {
                icon: FaUsers,
                title: "Constelaciones Familiares - Bert Hellinger",
                description: "Formación certificada en constelaciones familiares sistémicas con el método original de Bert Hellinger",
                highlight: "Método sistémico Bert Hellinger",
                year: "2013 - Certificación"
              },
              {
                icon: FaBrain,
                title: "Eneagrama del Carácter",
                description: "Estudio profundo del eneagrama como herramienta de autoconocimiento y transformación personal",
                highlight: "Estudio del carácter",
                year: "Especialización continua"
              },
              {
                icon: FaStar,
                title: "Psicología Transpersonal",
                description: "Enfoque integral que incluye las dimensiones espirituales y transpersonales del desarrollo humano",
                highlight: "Psicología transpersonal",
                year: "2003 - Formación"
              },
              {
                icon: FaLightbulb,
                title: "Enfoque Integrativo Holístico",
                description: "Metodología integrativa que combina Gestalt, sistémico y transpersonal para adultos y parejas",
                highlight: "Enfoque integrativo",
                year: "Especialización continua"
              }
            ].map((training, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <training.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-neutral-900 text-base leading-tight">{training.title}</h4>
                    <div className="text-xs text-primary-600 font-medium mt-1">{training.year}</div>
                  </div>
                </div>
                
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
                  {training.description}
                </p>
                
                <div className="mt-auto">
                  <div className="inline-block bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                    {training.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Tu transformación profunda comienza con una decisión
            </h3>
            <p className="text-lg opacity-90 mb-2">
              <strong>¿Estás listo para despertar tu potencial completo?</strong> Te acompaño en un proceso
            </p>
            <p className="text-lg opacity-90 mb-6">
              de <strong>sanación auténtica y evolución consciente</strong> que honra tu historia y despierta tu poder personal
            </p>
            <Link 
              href="#agendar-cita"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
            >
              <FaCalendarAlt className="w-5 h-5" />
              Agenda tu Primera Sesión Transformadora
            </Link>
            <div className="text-white/80 text-sm mt-4">
              Online internacional • Presencial en Bogotá • Confidencialidad absoluta
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 