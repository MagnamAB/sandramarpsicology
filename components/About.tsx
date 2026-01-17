import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaHeart, FaUsers, FaAward, FaBookOpen, FaHandshake, FaUserGraduate, FaBrain, FaStar, FaLightbulb, FaGlobe, FaHome } from 'react-icons/fa'
import Image from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { getText } from '../lib/texts'
import { useAppointmentModal } from '../contexts/AppointmentModalContext'

const About: React.FC = () => {
  const { openModal } = useAppointmentModal()
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
            <span className="text-gradient" dangerouslySetInnerHTML={{ __html: getText('about.title', 'Más de 37 años de experiencia en psicología clínica') }} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            La terapia no es sólo mi profesión, es mi <strong>camino de vida</strong>. Durante décadas he experimentado <strong>procesos de transformación profunda</strong>, que ahora entrego a mis consultantes. Mi práctica inició desde <strong>1985</strong> y se fundamenta en la <strong>empatía</strong> que nace de la experiencia vivida, el <strong>respeto profundo</strong> por tu historia única y un <strong>enfoque sistémico</strong> que aborda una mirada integral desde el contexto familiar y social, logrando un acompañamiento que honra todas las dimensiones de tu ser.
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
                    alt="Sandra Margarita Vargas - Psicóloga clínica con 38 años experiencia especializada en terapia individual adultos, terapia de pareja, Gestalt, atención online global y presencial en consultorio privado Bogotá"
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
                  <div className="text-3xl font-bold">38+</div>
                  <div className="text-xs opacity-90">Años Experiencia</div>
                  <div className="text-xs opacity-75">Psicología Clínica</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100 z-20">
                <div className="flex items-center gap-3">
                  <FaHome className="w-6 h-6 text-secondary-600" />
                  <div>
                    <div className="font-semibold text-neutral-900">Consultorio Privado</div>
                    <div className="text-sm text-neutral-600">{getText('about.badge.location', 'Bogotá + Online Global')}</div>
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
              <span className="text-primary-600">Sandra Margarita Vargas:</span> {getText('about.subtitle.desc', 'Un camino de vida dedicado a la transformación humana')}
            </h3>
            
            <p className="text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: 'Durante décadas he sido <strong>participante activa en procesos terapéuticos profundos</strong>, tanto en Colombia como internacionalmente. Ofrezco <strong>terapia individual y de pareja</strong> para hispanohablantes a <strong>nivel global</strong> y presencial en la ciudad de Bogotá.' }} />

            <p className="text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: 'Mi trayectoria me ha permitido desarrollar un <strong>enfoque integrativo</strong> que combina <strong>Gestalt, Sistémica y Transpersonal</strong>.' }} />

            <p className="text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: 'Esta intervención ha mostrado <strong>resultados a nivel individual</strong> en el camino del <strong>autoconocimiento</strong>, el <strong>desarrollo personal</strong> y el <strong>fortalecimiento de vínculos familiares y de pareja</strong>.' }} />

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaHeart className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{getText('about.approach.title', 'Un enfoque integrativo')}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: getText('about.approach.desc', 'Integro herramientas de la terapia Gestalt, el enfoque sistémico y el transpersonal adaptándolas a las necesidades y procesos únicos de cada persona') }} />
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
            <span className="text-gradient">{getText('about.integrative.title', 'Más que técnicas, una metodología de vida')}</span>
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">{getText('about.what.integrative.title', '¿Qué es lo que se integra?')}</h4>
              <p className="text-neutral-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: getText('about.what.integrative.desc', 'Lo mejor de cada uno de los siguientes enfoques de la psicología:') }} />
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaHeart className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">Gestalt: El aquí y ahora</h5>
                    <p className="text-sm text-neutral-600">{getText('about.gestalt.desc', 'Consciencia presente, contacto auténtico y responsabilidad personal')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaUsers className="w-4 h-4 text-secondary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">{getText('about.systemic.title', 'Sistémica: Los vínculos que nos forman')}</h5>
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

            <div className="pt-8 md:pt-12">
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">{getText('about.how.apply.title', '¿Cómo lo aplico en mi práctica?')}</h4>
              <p className="text-neutral-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: getText('about.how.apply.desc', 'En cada sesión, integramos conscientemente estos enfoques según lo que necesites en ese momento. No es ecléctico ni improvisado: es una metodología coherente desarrollada a lo largo de años de experiencia y formación continua.') }} />
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl p-6 max-w-4xl mx-auto">
              <h4 className="text-xl font-bold mb-3">El resultado: Transformación integral y duradera</h4>
              <p className="opacity-90">
                {getText('about.result.desc', 'No es sólo alivio de síntomas, es una evolución consciente; el despertar de tu potencial como ser humano integral')}
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
                icon: FaGraduationCap,
                title: "Psicóloga - Universidad Santo Tomás",
                description: "Formación profesional en Psicología con énfasis en psicología clínica y educativa",
                highlight: "Psicóloga profesional",
                year: "1986 - Grado profesional"
              },
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
            <button 
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
            >
              <FaCalendarAlt className="w-5 h-5" />
              Agenda tu Primera Sesión Transformadora
            </button>
            <div className="text-white/80 text-sm mt-4">
              {getText('about.cta.footer', 'Online internacional • Presencial en Bogotá •')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 