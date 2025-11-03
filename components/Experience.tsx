import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaBuilding, FaGraduationCap, FaUsers, FaGlobe, FaChevronDown, FaChevronUp, FaAward, FaBriefcase, FaLightbulb, FaHeart } from 'react-icons/fa'
import { getText } from '../lib/texts'

const Experience: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const stats = [
    {
      number: "+37",
      label: "Años de Experiencia",
      description: "Transformando vidas profesionalmente"
    },
    {
      number: getText('experience.stats.countries.number', '+25'),
      label: "Países Atendidos",
      description: "Terapia online internacional"
    },
    {
      number: getText('experience.stats.facilitating.number', '+30'),
      label: "Años Facilitando",
      description: getText('experience.stats.facilitating.description', 'Talleres propios desde 2000')
    },
    {
      number: getText('experience.stats.institutions.number', '+10'),
      label: "Instituciones",
      description: "Empresas y organizaciones atendidas"
    }
  ]

  const highlights = [
    {
      icon: FaGlobe,
      title: "Facilitadora Internacional",
      period: "2003 - Actual",
      organization: "Academia CreSiendo Omnilife",
      description: getText('experience.highlight.facilitator.description', 'Desarrollo personal con mujeres y hombres en empresa multinacional México y América'),
      achievements: [
        getText('experience.highlight.facilitator.achievement.1', 'Programas de desarrollo personal y liderazgo'),
        getText('experience.highlight.facilitator.achievement.2', 'Facilitación en México, Colombia, Estados Unidos, Lationamérica'),
        getText('experience.highlight.facilitator.achievement.3', 'Más de 20 años de experiencia internacional')
      ]
    },
    {
      icon: FaLightbulb,
      title: "Creadora de Programas Propios",
      period: "2009 - Actual",
      organization: "Programas de Autoría Propia",
      description: "Diseño y facilitación de talleres especializados únicos",
      achievements: [
        '"Ser Adulto: Un logro de autonomía y bienestar"',
        '"Mis Relaciones Inconclusas"',
        "Más de 15 años facilitando estos programas"
      ]
    },
    {
      icon: FaGraduationCap,
      title: "Docente Internacional",
      period: "2009 - 2013",
      organization: "Escuelas Especializadas",
      description: "Docencia en España y Colombia en instituciones de transformación humana",
      achievements: [
        "Escuela de Transformación Humana (Colombia)",
        "Escuela de la Montera - Sevilla (España)",
        "Escuela de Gestalt - Jaén (España)"
      ]
    },
    {
      icon: FaBriefcase,
      title: "Consultora Empresarial",
      period: "2003 - 2013",
      organization: "Desarrollo Humano Integral",
      description: "Consultoría externa en empresas multinacionales y desarrollo organizacional",
      achievements: [
        "Programa Escuelas de Liderazgo Ardyss",
        "Centro de Desarrollo de la Consciencia",
        "Diseño de manuales y programas ejecutivos"
      ]
    }
  ]

  const timeline = [
    {
      year: getText('experience.timeline.2017.year', '1998 - Actual'),
      title: getText('experience.timeline.2017.title', 'Terapeuta integrativa'),
      description: getText('experience.timeline.2017.description', '27 años de practica terapéutica en consultorio privado')
    },
    {
      year: "2012 - 2013",
      title: getText('experience.timeline.2012.title', 'Gestora Programa Liderazgo Ardyss'),
      description: "Desarrollo y diseño de Escuelas de Liderazgo y Negocios con manuales propios"
    },
    {
      year: "2009 - 2013",
      title: "Docente Escuela Transformación Humana",
      description: "Inicio de talleres propios y docencia en instituciones especializadas"
    },
    {
      year: getText('experience.timeline.2003.year', '2017 - Actual y 2003 - 2012'),
      title: "Facilitadora Internacional Omnilife",
      description: getText('experience.timeline.2003.description', 'Conducción de seminarios y talleres internacionales para el desarrollo personal y de liderazgo en diferentes países de América')
    },
    {
      year: "1997 - 2002",
      title: "Gestora Programa MAVI",
      description: "Creación de programa integral de orientación vocacional para jóvenes"
    },
    {
      year: "1995 - 1998",
      title: "Coordinadora ICIFAP",
      description: "Implementación de programas en SENA, ECOPETROL, ICBF, BAVARIA"
    },
    {
      year: "1993 - 1998",
      title: "Educadora Familiar ONU-ICBF",
      description: "Proyecto UNDCP en Bogotá, Arauca, Santanderes, Putumayo y Boyacá"
    },
    {
      year: "1990 - 1996",
      title: getText('experience.timeline.1990.title', 'Psicóloga Clínica y Educativa'),
      description: "Inicio profesional en colegios y empresas de Bogotá"
    }
  ]

  const majorInstitutions = [
    {
      name: "Omnilife Internacional",
      role: "Facilitadora de Desarrollo Personal",
      logo: "🌟",
      years: "15+ años"
    },
    {
      name: "Naciones Unidas - ICBF",
      role: "Educadora Familiar",
      logo: "🌍", 
      years: "5 años"
    },
    {
      name: "ECOPETROL",
      role: "Facilitadora Empresarial",
      logo: "⚡",
      years: "3 años"
    },
    {
      name: "Universidad Santo Tomás",
      role: "Supervisora de Prácticas",
      logo: "🎓",
      years: "2 años"
    }
  ]

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <section id="experiencia" className="section-padding bg-neutral-50">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-primary-600">Más de 37 Años de Experiencia</span> <span className="text-gradient">Profesional</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            Una trayectoria excepcional en <strong>psicología clínica, desarrollo empresarial, facilitación internacional</strong> y programas de <strong>transformación humana</strong>. Desde <strong>Naciones Unidas</strong> hasta empresas multinacionales, <strong>creando programas propios</strong> y transformando vidas en <strong>Colombia, España, México</strong> y más países de Latinoamérica.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-neutral-900 mb-1">{stat.label}</div>
              <div className="text-sm text-neutral-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Destacados de Experiencia */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-primary-600">Logros y experiencias</span> <span className="text-gradient">destacadas</span>
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <highlight.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {highlight.title}
                      </h4>
                      <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {highlight.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-secondary-600 mb-3">
                      {highlight.organization}
                    </p>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {highlight.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <FaAward className="w-3 h-3 text-amber-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Interactivo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-primary-600">Trayectoria</span> <span className="text-gradient">profesional</span>
          </h3>

          <div className="relative">
            {/* Línea del timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6"
                >
                  {/* Punto del timeline */}
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 z-10">
                    <FaCalendarAlt className="w-5 h-5" />
                  </div>
                  
                  {/* Contenido */}
                  <div className="bg-white rounded-xl p-6 shadow-lg flex-1 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-neutral-900">{item.title}</h4>
                      <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full font-medium">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Instituciones Principales */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-primary-600">Instituciones y Organizaciones</span> <span className="text-gradient">Principales</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorInstitutions.map((institution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{institution.logo}</div>
                <h4 className="font-bold text-neutral-900 mb-2">{institution.name}</h4>
                <p className="text-sm text-neutral-600 mb-2">{institution.role}</p>
                <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {institution.years}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 