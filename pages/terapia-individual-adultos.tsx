import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { motion } from 'framer-motion'
import { FaUser, FaHeart, FaBrain, FaLightbulb, FaCalendarAlt, FaWhatsapp, FaCheck, FaArrowRight, FaGlobe, FaHome, FaUsers } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { generateWhatsAppLink } from '../lib/api'

const TerapiaIndividualAdultos: React.FC = () => {
  const seoConfig = {
    title: "Terapia Individual Adultos Online | Sandra Vargas | 37 Años Experiencia | Gestalt",
    description: "Terapia individual para adultos con 37 años de experiencia. Supera ansiedad, baja autoestima, encuentra propósito de vida. Psicoterapia Gestalt online global en español y presencial privada Bogotá.",
    canonical: "https://sandravargas.co/terapia-individual-adultos",
    openGraph: {
      title: "Terapia Individual Adultos | Sandra Vargas 37 Años Experiencia | Gestalt Online",
      description: "Psicoterapia Gestalt individual para adultos. Supera ansiedad, desarrolla autoestima, encuentra propósito. 37 años experiencia. Online global español + presencial privado Bogotá.",
      url: "https://sandravargas.co/terapia-individual-adultos",
      images: [
        {
          url: '/images/dra-sandra-vargas.jpg',
          width: 1200,
          height: 630,
          alt: "Sandra Vargas - Terapia individual adultos 37 años experiencia psicoterapia Gestalt online global presencial Bogotá"
        }
      ]
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'terapia individual adultos, psicoterapia Gestalt adultos, superar ansiedad adultos, autoconocimiento desarrollo personal, psicólogo individual online, terapia online adultos español, psicóloga individual Bogotá, desarrollo personal adultos, autoestima confianza personal, propósito sentido vida'
      }
    ]
  }

  const problemas = [
    {
      icon: FaBrain,
      titulo: "Ansiedad y Estrés Crónico",
      descripcion: "Te sientes constantemente preocupado, con pensamientos rumiantes que no puedes controlar, y experimentas síntomas físicos como tensión muscular, insomnio o palpitaciones.",
      solucion: "Mi enfoque integrativo holístico te ayuda a conectar con el aquí y ahora desde la perspectiva Gestalt, entender patrones sistémicos y desarrollar consciencia transpersonal para gestionar la ansiedad desde múltiples dimensiones."
    },
    {
      icon: FaHeart,
      titulo: "Baja Autoestima y Falta de Confianza",
      descripcion: "Te criticas constantemente, te comparas con otros, sientes que no eres suficiente o que no mereces las cosas buenas que te pasan.",
      solucion: "Trabajamos integrando técnicas Gestalt para el autoconocimiento, enfoque sistémico para sanar patrones familiares y psicología transpersonal para conectar con tu esencia auténtica y construir autoestima sólida."
    },
    {
      icon: FaUsers,
      titulo: "Dificultades en Relaciones",
      descripcion: "Tienes patrones repetitivos en tus relaciones, dificultades para poner límites, miedo al abandono o problemas para conectar emocionalmente con otros.",
      solucion: "Desde el enfoque integrativo holístico, exploramos patrones relacionales (sistémico), trabajamos la consciencia del presente (Gestalt) y conectamos con tu propósito relacional (transpersonal) para desarrollar vínculos más auténticos."
    },
    {
      icon: FaLightbulb,
      titulo: "Crisis Existencial y Falta de Propósito",
      descripcion: "Te preguntas cuál es tu propósito en la vida, sientes un vacío existencial, o estás en una etapa de transición sin saber hacia dónde dirigirte.",
      solucion: "Mi metodología integrativa holística combina la búsqueda de sentido (transpersonal), la toma de consciencia (Gestalt) y la comprensión de tu lugar en los sistemas (sistémico) para redescubrir tu propósito auténtico."
    }
  ]

  const beneficios = [
    "Autoconocimiento profundo y desarrollo de consciencia personal",
    "Gestión efectiva del estrés, ansiedad y emociones difíciles", 
    "Fortalecimiento de la autoestima y confianza en ti mismo",
    "Sanación de condicionamientos infantiles y patrones limitantes",
    "Desarrollo de inteligencia emocional y resiliencia",
    "Claridad sobre propósito, valores y sentido de vida",
    "Mejores relaciones interpersonales y habilidades de comunicación",
    "Herramientas prácticas para el crecimiento personal continuo"
  ]

  const proceso = [
    {
      paso: "1",
      titulo: "Consulta Inicial",
      descripcion: "Conversamos sobre tu situación actual, exploramos tus necesidades específicas y definimos objetivos terapéuticos claros para tu proceso."
    },
    {
      paso: "2", 
      titulo: "Exploración Profunda",
      descripcion: "Utilizando técnicas Gestalt y transpersonales, exploramos patrones emocionales, creencias limitantes y recursos internos que posees."
    },
    {
      paso: "3",
      titulo: "Transformación Activa", 
      descripcion: "Trabajamos activamente en el cambio, integrando nuevas perspectivas, sanando heridas emocionales y desarrollando nuevas habilidades."
    },
    {
      paso: "4",
      titulo: "Integración y Consolidación",
      descripcion: "Consolidamos los cambios logrados, desarrollas autonomía emocional y herramientas para continuar tu crecimiento personal."
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
              "name": "Terapia Individual Adultos",
              "description": "Psicoterapia Gestalt individual para adultos con 37 años de experiencia. Supera ansiedad, desarrolla autoestima, encuentra propósito de vida.",
              "provider": {
                "@type": "Psychologist",
                "name": "Sandra Margarita Vargas",
                "image": "https://sandravargas.co/images/dra-sandra-vargas.jpg"
              },
              "areaServed": ["Global", "Internacional", "Bogotá", "Colombia"],
              "availableLanguage": "Spanish",
              "serviceType": "Terapia Individual Adultos",
              "audience": {
                "@type": "Audience",
                "audienceType": "Adultos"
              }
            })
          }}
        />
      </Head>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50">
          <div className="container-responsive">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <FaUser className="w-4 h-4" />
                  Terapia Individual Especializada
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
                  <span className="block">Terapia Individual</span>
                  <span className="text-gradient block">para Adultos</span>
                  <span className="text-lg md:text-xl font-medium text-neutral-600 block mt-4">
                    Enfoque Integrativo Holístico • Online Global • Presencial Bogotá
                  </span>
                </h1>
                
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  <strong>Supera ansiedad, desarrolla autoestima y encuentra tu propósito de vida</strong> con{' '}
                  <strong>terapia individual que integra Gestalt, sistémico y transpersonal</strong>.{' '}
                  <strong>Metodología integral personalizada</strong> para acompañamiento terapéutico profundo.{' '}
                  <strong>Atención online en español</strong> para todo el mundo y{' '}
                  <strong>sesiones presenciales en consultorio privado Bogotá</strong>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="#agendar-cita"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
                  >
                    Agendar Terapia Individual
                    <FaCalendarAlt className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                  
                  <a
                    href={generateWhatsAppLink("Hola Sandra, me interesa la terapia individual para adultos. Tengo algunas dificultades emocionales y me gustaría conocer tu metodología que combina Gestalt, sistémico y transpersonal.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group"
                  >
                    <FaWhatsapp className="mr-2 w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    Consulta WhatsApp
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg px-4 py-3">
                    <FaGlobe className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="font-semibold text-primary-800 text-sm">Online Global</div>
                      <div className="text-xs text-primary-600">Español para el mundo</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg px-4 py-3">
                    <FaHome className="w-5 h-5 text-secondary-600" />
                    <div>
                      <div className="font-semibold text-secondary-800 text-sm">Consultorio Privado</div>
                      <div className="text-xs text-secondary-600">Máxima confidencialidad</div>
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
                      alt="Sandra Vargas - Psicóloga especialista en terapia individual adultos con 37 años experiencia, psicoterapia Gestalt, autoconocimiento desarrollo personal"
                      fill
                      className="rounded-xl object-cover"
                      style={{ objectPosition: '60% center' }}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">37+</div>
                      <div className="text-xs opacity-90">Años</div>
                      <div className="text-xs opacity-75">Experiencia</div>
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
                ¿Te sientes <span className="text-red-600">identificado</span> con alguna de estas situaciones?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Si experimentas alguna de estas dificultades, mi{' '}
                <strong>metodología especializada en terapia individual para adultos</strong> puede ayudarte a encontrar soluciones profundas y duraderas.
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
                    <h4 className="font-semibold text-green-800 mb-2">Mi enfoque para ayudarte:</h4>
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
        <section className="section-padding bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="container-responsive">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Beneficios del <span className="text-gradient">Proceso Integrativo</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Con mi <strong>metodología que integra Gestalt, sistémico y transpersonal</strong>, estos son los{' '}
                <strong>resultados concretos</strong> que puedes esperar de nuestro proceso terapéutico:
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
                ¿Cómo es el <span className="text-gradient">Proceso Terapéutico</span>?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Mi <strong>trabajo integrativo</strong> combina{' '}
                <strong>Gestalt, sistémico y transpersonal</strong>{' '}
                de manera personalizada según tus necesidades específicas.
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
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                      {etapa.paso}
                    </div>
                    {index < proceso.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full">
                        <FaArrowRight className="w-6 h-6 text-primary-300 mx-auto" />
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
        <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container-responsive text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Inicia tu Proceso de Transformación Personal
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Con mi <strong>metodología integrativa</strong> que combina Gestalt, sistémico y transpersonal, te acompaño en tu{' '}
              camino hacia el <strong>autoconocimiento, bienestar emocional y crecimiento personal</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#agendar-cita"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
              >
                <FaCalendarAlt className="w-5 h-5" />
                Agenda tu Primera Sesión
              </Link>
              
              <a
                href={generateWhatsAppLink("Hola Sandra, después de leer sobre la terapia individual para adultos, me siento identificado con varias situaciones que mencionas. Me gustaría iniciar un proceso terapéutico contigo. ¿Podemos conversar?")}
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

export default TerapiaIndividualAdultos 