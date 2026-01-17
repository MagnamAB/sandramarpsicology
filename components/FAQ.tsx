import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa'
import { useAppointmentModal } from '../contexts/AppointmentModalContext'

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { openModal } = useAppointmentModal()

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "¿Cómo elegir al mejor psicólogo en Bogotá para mi caso?",
          answer: "Al elegir psicólogo en Bogotá, es importante considerar: formación académica (verificar que esté registrado), experiencia en tu problemática específica, enfoque terapéutico que resuene contigo, modalidad de atención (presencial u online), y comodidad personal. Sandra cuenta con más de 38 años de experiencia, formación especializada en terapia Gestalt y constelaciones familiares, y atiende tanto presencial como virtualmente.",
          keywords: "elegir psicólogo Bogotá, mejor psicólogo Bogotá, cómo encontrar terapeuta"
        },
        {
          question: "¿Cuál es la diferencia entre psicólogo, psiquiatra y psicoterapeuta?",
          answer: "Un psicólogo clínico se enfoca en terapia psicológica y evaluación, un psiquiatra puede recetar medicamentos además de terapia, y un psicoterapeuta se especializa en procesos terapéuticos profundos. Sandra es psicóloga clínica y psicoterapeuta especializada en enfoques humanistas como Gestalt y terapia sistémica familiar.",
          keywords: "psicólogo clínico, psicoterapeuta, diferencias profesionales salud mental"
        }
      ]
    },
    {
      category: "Terapia de Pareja",
      questions: [
        {
          question: "¿Cuándo es el momento de buscar terapia de pareja en Bogotá?",
          answer: "Es recomendable buscar terapia de pareja cuando hay problemas de comunicación recurrentes, conflictos constantes, infidelidad, distanciamiento emocional, problemas sexuales, o cuando uno o ambos miembros consideran la separación. La terapia de pareja sistémica ayuda a sanar heridas emocionales y reconstruir vínculos amorosos, tanto en modalidad presencial en Bogotá como online para parejas internacionales.",
          keywords: "terapia de pareja Bogotá, cuándo buscar ayuda pareja, problemas de pareja"
        },
        {
          question: "¿Qué pasa si mi pareja no quiere venir a terapia de pareja?",
          answer: "Es común que uno de los miembros sea reticente inicialmente. En estos casos, puede comenzar terapia individual para trabajar tu parte de la relación. A menudo, cuando la pareja ve cambios positivos, se anima a participar. Sandra ofrece sesiones individuales previas y estrategias para invitar a la pareja de manera no confrontativa.",
          keywords: "pareja no quiere terapia, terapia individual para problemas pareja"
        },
        {
          question: "¿Cuánto dura un proceso de terapia de pareja?",
          answer: "Un proceso de terapia de pareja puede durar entre 3-12 meses, dependiendo de la complejidad de los problemas, el compromiso de ambos miembros y los objetivos terapéuticos. Las sesiones son de 120 minutos cada una, con frecuencia quincenal o mensual. En casos de crisis agudas, puede requerirse mayor frecuencia inicial.",
          keywords: "duración terapia de pareja, cuánto tiempo terapia pareja, sesiones pareja"
        }
      ]
    },
    {
      category: "Terapia Online",
      questions: [
        {
          question: "¿La terapia online es tan efectiva como la presencial?",
          answer: "Sí, múltiples estudios demuestran que la terapia psicológica online es igualmente efectiva que la presencial para la mayoría de problemáticas. La consulta psicológica online en español permite acceso a especialistas sin límites geográficos, flexibilidad horaria y comodidad. Sandra ofrece psicoterapia online a consultantes de más de 25 países con excelentes resultados.",
          keywords: "terapia online efectiva, psicoterapia virtual, consulta psicológica online"
        },
        {
          question: "¿Cómo funcionan las sesiones de terapia online en español?",
          answer: "Las sesiones virtuales se realizan exclusivamente vía Zoom. Requieres conexión estable a internet, dispositivo con cámara y micrófono, y un espacio privado. Las sesiones mantienen la misma duración y estructura que las presenciales, garantizando la misma calidad terapéutica.",
          keywords: "cómo funciona terapia online, sesiones virtuales psicología, terapia online español"
        },
        {
          question: "¿Qué métodos de pago aceptan para terapia online internacional?",
          answer: "Para consultantes internacionales se aceptan diversos métodos: transferencias bancarias, PayPal, Wise (ex-TransferWise), Western Union, y otros sistemas según el país. Se proporciona información detallada de pagos en la consulta inicial. Los precios se ajustan según el país de residencia cuando corresponde.",
          keywords: "pagos terapia online internacional, métodos pago psicología virtual"
        }
      ]
    },
    {
      category: "Servicios Específicos",
      questions: [
        {
          question: "¿Qué son las constelaciones familiares y cómo pueden ayudarme?",
          answer: "Las constelaciones familiares sistémicas son un método terapéutico desarrollado por Bert Hellinger que permite sanar dinámicas transgeneracionales y patrones familiares inconscientes. A través de representaciones simbólicas, se identifican y resuelven conflictos familiares profundos. Sandra está certificada en este método y lo aplica tanto presencial como virtualmente.",
          keywords: "constelaciones familiares sistémicas, qué son constelaciones familiares, Bert Hellinger"
        },
        {
          question: "¿En qué consiste la terapia Gestalt?",
          answer: "La terapia Gestalt es un enfoque humanista que se centra en el 'aquí y ahora', la toma de consciencia y la responsabilidad personal. Utiliza técnicas experienciales para integrar pensamientos, emociones y comportamientos. Sandra se formó en SAT con Claudio Naranjo y aplica psicoterapia Gestalt tanto en terapia individual como de pareja.",
          keywords: "terapia Gestalt, psicoterapia Gestalt, enfoque humanista terapia"
        },
        {
          question: "¿Qué incluye un proceso de desarrollo personal?",
          answer: "Un proceso de desarrollo personal incluye autoconocimiento profundo, trabajo con eneagrama y estudio del carácter, sanación de condicionamientos infantiles, desarrollo de consciencia, y crecimiento personal integral. Se utilizan técnicas de psicología transpersonal, trabajo corporal y herramientas del SAT. Es ideal para personas que buscan evolución personal más allá de resolver problemas específicos.",
          keywords: "desarrollo personal, autoconocimiento, crecimiento personal, psicología transpersonal"
        }
      ]
    },
    {
      category: "Aspectos Prácticos",
      questions: [
        {
          question: "¿Dónde se encuentra el consultorio en Bogotá?",
          answer: "El consultorio está ubicado en Santa Bárbara, zona norte de Bogotá, fácilmente accesible en transporte público y privado. Se proporciona la dirección exacta al agendar la cita. También se ofrece atención virtual para consultantes que prefieren no desplazarse o viven fuera de Bogotá.",
          keywords: "consultorio psicología Bogotá, ubicación psicóloga Santa Bárbara"
        },
        {
          question: "¿Cuáles son los horarios de atención?",
          answer: "Los horarios en hora de Colombia (GMT-5) son: Lunes, Miércoles, Jueves y Viernes de 7:30 AM a 1:00 PM y de 3:00 PM a 7:30 PM; Martes y Sábados de 7:30 AM a 12:00 PM. La última cita de la mañana debe finalizar a la 1:00 PM (individual inicia máx. 11:45 AM, pareja máx. 11:00 AM). La última cita de la tarde debe finalizar a las 7:30 PM (individual inicia máx. 6:15 PM, pareja máx. 5:30 PM). Para consultantes internacionales, el sistema muestra automáticamente los horarios disponibles convertidos a tu zona horaria local.",
          keywords: "horarios psicóloga Bogotá, disponibilidad citas psicología"
        },
        {
          question: "¿La información compartida en terapia es confidencial?",
          answer: "Absolutamente. Toda la información compartida en las sesiones está protegida por secreto profesional según el código de ética psicológica. Esto aplica tanto para sesiones presenciales como virtuales. La confidencialidad solo se rompería en casos extremos donde haya riesgo inminente para la vida (como ideación suicida activa).",
          keywords: "confidencialidad terapia, secreto profesional psicología"
        }
      ]
    }
  ]

  const allQuestions = faqData.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.category }))
  )

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="preguntas-frecuentes" className="section-padding bg-neutral-50">
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
            Preguntas <span className="text-gradient">Frecuentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            Respuestas a las consultas más comunes sobre <strong>terapia psicológica en Bogotá</strong>,{' '}
            <strong>terapia online internacional</strong>, <strong>terapia de pareja</strong>,{' '}
            <strong>constelaciones familiares</strong> y <strong>desarrollo personal</strong>.
          </motion.p>
        </div>

        {/* FAQ Categories Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {faqData.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full bg-white text-neutral-700 border border-neutral-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all duration-300"
            >
              {category.category} ({category.questions.length})
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {allQuestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="card overflow-hidden">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-primary-50 transition-colors group"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 
                      className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors"
                      itemProp="name"
                    >
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <FaMinus className="w-5 h-5 text-primary-600" />
                    ) : (
                      <FaPlus className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-neutral-100">
                        <div className="text-neutral-600 leading-relaxed mb-4" itemProp="text">
                          {item.answer}
                        </div>
                        <div className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full inline-block">
                          {item.keywords}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaQuestionCircle className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              ¿No encontraste la respuesta que buscabas?
            </h3>
            <p className="text-neutral-600 mb-6">
              Contacta directamente conmigo para resolver cualquier duda específica sobre{' '}
              <strong>terapia psicológica</strong>, <strong>servicios online</strong> o{' '}
              <strong>consultas presenciales en Bogotá</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573106983385?text=Hola%20Sandra,%20tengo%20una%20consulta%20sobre%20sus%20servicios%20de%20psicoterapia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
              >
                Contactar por WhatsApp
              </a>
              <button
                onClick={openModal}
                className="btn-secondary inline-flex items-center justify-center"
              >
                Agendar Consulta Inicial
              </button>
            </div>
          </div>
        </motion.div>

        {/* JSON-LD Schema for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": allQuestions.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  )
}

export default FAQ 