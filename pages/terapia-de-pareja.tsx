import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { motion } from 'framer-motion'
import { FaHeart, FaUsers, FaComments, FaHandshake, FaCalendarAlt, FaWhatsapp, FaCheck, FaArrowRight, FaGlobe, FaHome, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { generateWhatsAppLink } from '../lib/api'

const TerapiaDePareja: React.FC = () => {
  const seoConfig = {
    title: "Terapia de Pareja Online | Sandra Vargas | 37 Años Experiencia | Enfoque Integrativo Holístico",
    description: "Terapia de pareja con 37 años de experiencia. Supera problemas comunicación, infidelidad, celos. Enfoque integrativo holístico especializado. Online internacional español y presencial consultorio privado Bogotá.",
    canonical: "https://sandravargas.co/terapia-de-pareja",
    openGraph: {
      title: "Terapia de Pareja | Sandra Vargas 37 Años Experiencia | Enfoque Integrativo Holístico Online",
      description: "Terapia de pareja integrativa holística especializada. Supera problemas comunicación, infidelidad, crisis. 37 años experiencia. Online internacional español + consultorio privado Bogotá.",
      url: "https://sandravargas.co/terapia-de-pareja",
      images: [
        {
          url: '/images/dra-sandra-vargas.jpg',
          width: 1200,
          height: 630,
          alt: "Sandra Vargas - Terapia de pareja 37 años experiencia enfoque integrativo holístico online internacional presencial Bogotá"
        }
      ]
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'terapia de pareja online, terapia matrimonial, problemas comunicación pareja, infidelidad celos pareja, terapia pareja sistémica, psicóloga parejas online, terapia pareja Bogotá, crisis pareja solución, fortalecer vínculo pareja, comunicación asertiva pareja'
      }
    ]
  }

  const problemas = [
    {
      icon: FaComments,
      titulo: "Problemas de Comunicación",
      descripcion: "Se sienten incomprendidos, discuten constantemente por los mismos temas, o han dejado de comunicarse efectivamente. Las conversaciones se vuelven reproches, críticas o silencios incómodos.",
      solucion: "Desde mi enfoque integrativo holístico, enseño técnicas de comunicación asertiva (Gestalt), analizo patrones relacionales (sistémico) y conectan con su propósito como pareja (transpersonal) para comunicarse sin atacar y escuchar sin defenderse."
    },
    {
      icon: FaExclamationTriangle,
      titulo: "Crisis por Infidelidad",
      descripcion: "Han atravesado una infidelidad y no saben cómo reconstruir la confianza, manejar el dolor, los celos o decidir si continuar juntos. Se sienten perdidos entre el rencor y el amor.",
      solucion: "Mi metodología integrativa holística incluye sanación de heridas emocionales (Gestalt), comprensión de dinámicas familiares (sistémico) y búsqueda de sentido profundo (transpersonal) para reconstruir confianza y tomar decisiones conscientes."
    },
    {
      icon: FaUsers,
      titulo: "Celos y Codependencia",
      descripcion: "Experimentan celos excesivos, control, manipulación emocional o patrones de codependencia que asfixian la relación y generan sufrimiento constante.",
      solucion: "Combino trabajo de consciencia presente (Gestalt) para identificar patrones tóxicos, análisis de sistemas familiares (sistémico) y conexión con la esencia individual (transpersonal) para desarrollar autoestima y establecer límites sanos."
    },
    {
      icon: FaHeart,
      titulo: "Pérdida de Conexión",
      descripcion: "Sienten que se convirtieron en compañeros de cuarto, perdieron la intimidad emocional y sexual, o que ya no se reconocen como la pareja que eran antes.",
      solucion: "Mi enfoque integrativo holístico facilita el redescubrimiento mutuo a través de técnicas experienciales (Gestalt), comprensión de dinámicas relacionales (sistémico) y reconexión con su propósito compartido (transpersonal)."
    }
  ]

  const beneficios = [
    "Comunicación asertiva y empática entre ambos miembros",
    "Resolución constructiva de conflictos sin dañar el vínculo", 
    "Sanación de heridas emocionales y reconstrucción de confianza",
    "Manejo saludable de celos, control y codependencia",
    "Fortalecimiento de la intimidad emocional y sexual",
    "Herramientas para mantener una relación sana a largo plazo",
    "Claridad para tomar decisiones conscientes sobre el futuro",
    "Desarrollo individual que beneficia la relación de pareja"
  ]

  const proceso = [
    {
      paso: "1",
      titulo: "Evaluación Inicial",
      descripcion: "Conversamos sobre la historia de la relación, identificamos patrones problemáticos y establecemos objetivos específicos para el proceso terapéutico."
    },
    {
      paso: "2", 
      titulo: "Trabajo Individual en Pareja",
      descripcion: "Cada miembro explora sus propios patrones, heridas y necesidades, desarrollando autoconocimiento que beneficia la relación."
    },
    {
      paso: "3",
      titulo: "Comunicación y Vínculo",
      descripcion: "Trabajamos activamente en mejorar la comunicación, resolver conflictos específicos y fortalecer la conexión emocional entre ambos."
    },
    {
      paso: "4",
      titulo: "Consolidación",
      descripcion: "Integramos los aprendizajes, desarrollan herramientas para el mantenimiento de la relación y planifican su futuro juntos."
    }
  ]

  return (
    <>
      <NextSeo {...seoConfig} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Terapia de Pareja",
              "description": "Terapia de pareja integrativa holística con 37 años de experiencia. Supera problemas comunicación, infidelidad, celos. Fortalece vínculo amoroso.",
              "provider": {
                "@type": "Psychologist",
                "name": "Sandra Margarita Vargas",
                "image": "https://sandravargas.co/images/dra-sandra-vargas.jpg"
              },
              "areaServed": ["Global", "Internacional", "Bogotá", "Colombia"],
              "availableLanguage": "Spanish",
              "serviceType": "Terapia de Pareja",
              "audience": {
                "@type": "Audience",
                "audienceType": "Parejas Adultas"
              }
            })
          }}
        />
      </Head>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-secondary-50 via-neutral-50 to-primary-50">
          <div className="container-responsive">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-primary-100 text-secondary-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <FaHeart className="w-4 h-4" />
                  Terapia de Pareja Especializada
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
                  <span className="block">Terapia de Pareja</span>
                  <span className="text-gradient block">Enfoque Integrativo Holístico</span>
                  <span className="text-lg md:text-xl font-medium text-neutral-600 block mt-4">
                    Online Internacional • Consultorio Privado Bogotá
                  </span>
                </h1>
                
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  <strong>Supera problemas de comunicación, infidelidad y celos</strong> con{' '}
                  <strong>terapia de pareja que integra Gestalt, sistémico y transpersonal</strong>.{' '}
                  <strong>Metodología integral especializada</strong> ayudando parejas a sanar heridas emocionales y{' '}
                  fortalecer vínculos amorosos. <strong>Atención online en español</strong> para parejas{' '}
                  de todo el mundo y <strong>consultorio privado en Bogotá</strong>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="#agendar-cita"
                    className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group"
                  >
                    Agendar Terapia de Pareja
                    <FaCalendarAlt className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                  
                  <a
                    href={generateWhatsAppLink("Hola Sandra, mi pareja y yo estamos atravesando dificultades en nuestra relación. Nos interesa la terapia de pareja con tu metodología que combina Gestalt, sistémico y transpersonal. ¿Podrías contarnos cómo trabajas?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
                  >
                    <FaWhatsapp className="mr-2 w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    Consulta WhatsApp
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg px-4 py-3">
                    <FaGlobe className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="font-semibold text-primary-800 text-sm">Online Internacional</div>
                      <div className="text-xs text-primary-600">Parejas de todo el mundo</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg px-4 py-3">
                    <FaHome className="w-5 h-5 text-secondary-600" />
                    <div>
                      <div className="font-semibold text-secondary-800 text-sm">Consultorio Privado</div>
                      <div className="text-xs text-secondary-600">Bogotá - Confidencial</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="relative w-full h-[400px] md:h-[500px]">
                    <Image
                      src="/images/dra-sandra-vargas.jpg"
                      alt="Sandra Vargas - Psicóloga especialista en terapia de pareja con 37 años experiencia, enfoque sistémico, comunicación, infidelidad, fortalecimiento vínculos"
                      fill
                      className="rounded-xl object-cover"
                      style={{ objectPosition: '60% center' }}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-secondary-600 to-secondary-700 text-white rounded-xl shadow-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">37+</div>
                      <div className="text-xs opacity-90">Años</div>
                      <div className="text-xs opacity-75">Parejas</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problems & Solutions */}
        <section className="section-padding bg-white">
          <div className="container-responsive">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                ¿Su relación enfrenta <span className="text-red-600">alguna</span> de estas dificultades?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Si como pareja experimentan alguna de estas situaciones, mi{' '}
                <strong>metodología integrativa especializada en terapia de pareja</strong> puede ayudarlos a sanar y fortalecer su vínculo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {problemas.map((problema, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                      <problema.icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{problema.titulo}</h3>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {problema.descripcion}
                  </p>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-semibold text-green-800 mb-2">Mi enfoque para ayudarlos:</h4>
                    <p className="text-green-700 text-sm leading-relaxed">
                      {problema.solucion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-gradient-to-r from-secondary-50 to-primary-50">
          <div className="container-responsive">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Beneficios del <span className="text-gradient">Trabajo Integrativo</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Con mi <strong>metodología que integra Gestalt, sistémico y transpersonal</strong>, estos son los{' '}
                <strong>resultados concretos</strong> que pueden esperar como pareja:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <FaCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700 leading-relaxed">{beneficio}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-white">
          <div className="container-responsive">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                ¿Cómo es el <span className="text-gradient">Proceso de Terapia de Pareja</span>?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Mi metodología está basada en{' '}
                <strong>enfoque sistémico especializado en dinámicas de pareja</strong> y técnicas probadas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {proceso.map((etapa, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                      {etapa.paso}
                    </div>
                    {index < proceso.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full">
                        <FaArrowRight className="w-6 h-6 text-secondary-300 mx-auto" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{etapa.titulo}</h3>
                  <p className="text-neutral-600 leading-relaxed">{etapa.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-r from-secondary-600 to-primary-600">
          <div className="container-responsive text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Fortalezcan su Relación de Pareja
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Con mi <strong>metodología sistémica especializada</strong>, los acompaño en el{' '}
              camino hacia una <strong>relación más sana, comunicativa y amorosa</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#agendar-cita"
                className="inline-flex items-center gap-2 bg-white text-secondary-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
              >
                <FaCalendarAlt className="w-5 h-5" />
                Agenda su Primera Sesión de Pareja
              </Link>
              
              <a
                href={generateWhatsAppLink("Hola Sandra, mi pareja y yo queremos fortalecer nuestra relación. Después de leer sobre tu trabajo sistémico en terapia de pareja, nos gustaría iniciar un proceso terapéutico. ¿Podemos conversar?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Conversemos por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppBubble />
    </>
  )
}

export default TerapiaDePareja 