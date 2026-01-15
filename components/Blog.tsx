import React from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaUser, FaArrowRight, FaHeart, FaBrain, FaUsers, FaLightbulb, FaCompass, FaClock } from 'react-icons/fa'
import Link from 'next/link'

const Blog: React.FC = () => {
  const blogPosts = [
    {
      title: "Cómo superar una ruptura amorosa y sanar emocionalmente",
      slug: "superar-ruptura-amorosa-sanar-emocionalmente",
      excerpt: "Guía completa para manejar el duelo amoroso, técnicas de sanación emocional y pasos prácticos para recuperar tu bienestar después de una separación de pareja.",
      category: "Relaciones",
      readTime: "8 min",
      date: "2024-01-15",
      image: "/images/blog/ruptura-amorosa.jpg",
      icon: FaHeart,
      keywords: "ruptura amorosa, duelo amoroso, superar separación"
    },
    {
      title: "5 Técnicas eficaces para controlar la ansiedad en el día a día",
      slug: "tecnicas-controlar-ansiedad-dia-a-dia",
      excerpt: "Herramientas prácticas de psicología para manejar la ansiedad: respiración consciente, mindfulness, ejercicios de grounding y técnicas de relajación.",
      category: "Ansiedad",
      readTime: "10 min",
      date: "2024-01-10",
      image: "/images/blog/controlar-ansiedad.jpg",
      icon: FaBrain,
      keywords: "controlar ansiedad, manejar ansiedad, técnicas ansiedad"
    },
    {
      title: "Terapia de Pareja: Cuándo es el momento de buscar ayuda profesional",
      slug: "terapia-pareja-cuando-buscar-ayuda-profesional",
      excerpt: "Señales claras de que tu relación necesita terapia de pareja. Desmitificamos conceptos erróneos y explicamos cómo la terapia puede fortalecer vínculos.",
      category: "Terapia de Pareja",
      readTime: "12 min",
      date: "2024-01-05",
      image: "/images/blog/terapia-pareja.jpg",
      icon: FaUsers,
      keywords: "terapia de pareja, cuándo buscar ayuda, problemas pareja"
    },
    {
      title: "¿Qué es la terapia Gestalt y cómo puede ayudarte a vivir pleno?",
      slug: "que-es-terapia-gestalt-vivir-pleno",
      excerpt: "Descubre los principios de la terapia Gestalt, técnicas del aquí y ahora, y cómo este enfoque humanista puede transformar tu vida emocional.",
      category: "Terapias",
      readTime: "15 min",
      date: "2023-12-28",
      image: "/images/blog/terapia-gestalt.jpg",
      icon: FaLightbulb,
      keywords: "terapia Gestalt, psicoterapia Gestalt, terapia humanista"
    },
    {
      title: "Constelaciones Familiares: Entendiendo este enfoque terapéutico",
      slug: "constelaciones-familiares-enfoque-terapeutico",
      excerpt: "Guía completa sobre constelaciones familiares sistémicas: metodología Bert Hellinger, beneficios y qué esperar en una sesión terapéutica.",
      category: "Terapias",
      readTime: "18 min",
      date: "2023-12-20",
      image: "/images/blog/constelaciones-familiares.jpg",
      icon: FaUsers,
      keywords: "constelaciones familiares, terapia sistémica, Bert Hellinger"
    },
    {
      title: "El Eneagrama y el desarrollo personal: descubre tu tipo de personalidad",
      slug: "eneagrama-desarrollo-personal-tipo-personalidad",
      excerpt: "Explora los 9 tipos del eneagrama, cómo identificar tu tipo de personalidad y usar esta herramienta para tu crecimiento personal y autoconocimiento.",
      category: "Desarrollo Personal",
      readTime: "20 min",
      date: "2023-12-15",
      image: "/images/blog/eneagrama-personalidad.jpg",
      icon: FaCompass,
      keywords: "eneagrama, tipo personalidad, desarrollo personal"
    },
    {
      title: "Inteligencia emocional en el trabajo: consejos para manejar el estrés laboral",
      slug: "inteligencia-emocional-trabajo-estres-laboral",
      excerpt: "Técnicas para desarrollar inteligencia emocional en el entorno laboral, manejar el estrés del trabajo y mejorar tus relaciones profesionales.",
      category: "Desarrollo Personal",
      readTime: "14 min",
      date: "2023-12-10",
      image: "/images/blog/inteligencia-emocional-trabajo.jpg",
      icon: FaBrain,
      keywords: "inteligencia emocional, estrés laboral, bienestar trabajo"
    },
    {
      title: "¿Cómo elegir al mejor psicólogo en Bogotá para ti?",
      slug: "como-elegir-mejor-psicologo-bogota",
      excerpt: "Criterios para elegir psicólogo en Bogotá: formación, experiencia, especialidades, modalidades de atención y aspectos a considerar antes de iniciar terapia.",
      category: "Guías",
      readTime: "12 min",
      date: "2023-12-05",
      image: "/images/blog/elegir-psicologo-bogota.jpg",
      icon: FaCompass,
      keywords: "elegir psicólogo Bogotá, mejor psicólogo Bogotá, encontrar terapeuta"
    },
    {
      title: "Terapia online vs presencial: ventajas, mitos y consejos",
      slug: "terapia-online-vs-presencial-ventajas-consejos",
      excerpt: "Comparación completa entre terapia presencial y online: efectividad, beneficios, mitos comunes y consejos para aprovechar al máximo cada modalidad.",
      category: "Terapia Online",
      readTime: "16 min",
      date: "2023-11-30",
      image: "/images/blog/terapia-online-presencial.jpg",
      icon: FaClock,
      keywords: "terapia online, terapia presencial, psicoterapia virtual"
    }
  ]

  const categories = [
    { name: "Todos", count: blogPosts.length },
    { name: "Ansiedad", count: blogPosts.filter(post => post.category === "Ansiedad").length },
    { name: "Relaciones", count: blogPosts.filter(post => post.category === "Relaciones").length },
    { name: "Terapia de Pareja", count: blogPosts.filter(post => post.category === "Terapia de Pareja").length },
    { name: "Terapias", count: blogPosts.filter(post => post.category === "Terapias").length },
    { name: "Desarrollo Personal", count: blogPosts.filter(post => post.category === "Desarrollo Personal").length }
  ]

  return (
    <section id="blog" className="section-padding bg-neutral-50">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Blog de <span className="text-gradient">Psicología y Bienestar Emocional</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-4xl mx-auto"
          >
            Encuentra artículos sobre <strong>terapia psicológica</strong>, <strong>manejo de emociones</strong>,{' '}
            <strong>relaciones de pareja</strong> y <strong>desarrollo personal</strong>. Este blog comparte la experiencia{' '}
            de más de 38 años en <strong>psicología clínica en Bogotá</strong>, brindando consejos y reflexiones{' '}
            para tu <strong>bienestar emocional</strong> y <strong>crecimiento personal</strong>.
          </motion.p>
        </div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full bg-white text-neutral-700 border border-neutral-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all duration-300"
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card mb-16 overflow-hidden group hover:shadow-xl transition-all duration-300"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-full bg-gradient-to-br from-primary-100 to-secondary-100">
              <div className="absolute inset-0 flex items-center justify-center">
                {React.createElement(blogPosts[0].icon, { 
                  className: "w-20 h-20 text-primary-600 opacity-50" 
                })}
              </div>
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {blogPosts[0].category}
                </span>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                {blogPosts[0].title}
              </h2>

              <p className="text-neutral-600 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">Dra. Sandra Margarita Vargas</span>
                </div>

                <Link 
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group-hover:gap-3 transition-all"
                >
                  Leer artículo
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => {
            const PostIcon = post.icon
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PostIcon className="w-12 h-12 text-primary-600 opacity-50" />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-700 px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>

                <div className="pb-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Keywords */}
                  <div className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded inline-block mb-4">
                    {post.keywords}
                  </div>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-3 h-3 text-neutral-400" />
                      <span className="text-xs text-neutral-600">Dra. Sandra Vargas</span>
                    </div>

                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      Leer más
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-center text-white mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            ¿Te gustaría recibir más consejos de <span className="text-accent-200">bienestar emocional?</span>
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Suscríbete para recibir artículos exclusivos sobre <strong>psicología</strong>,{' '}
            <strong>desarrollo personal</strong> y <strong>relaciones saludables</strong> directamente en tu email.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Tu email aquí"
                className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-300"
              />
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog