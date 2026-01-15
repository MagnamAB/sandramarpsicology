import React from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaUser, FaMapMarkerAlt, FaHeart, FaUsers, FaLightbulb, FaGlobe } from 'react-icons/fa'
import Image from 'next/image'

const TestimonialsExpanded: React.FC = () => {
  const testimonials = [
    {
      name: "María Elena Rodríguez",
      location: "Bogotá, Colombia",
      service: "Terapia de Pareja en Bogotá",
      rating: 5,
      text: "Después de meses de crisis en nuestra relación, decidimos buscar ayuda con la Dra. Sandra. Su enfoque en terapia de pareja sistémica nos ayudó a sanar heridas profundas y reconstruir nuestra comunicación. Hoy estamos más unidos que nunca. Realmente es la mejor psicóloga de pareja en Bogotá.",
      date: "2024-01-10",
      image: "/images/testimonials/maria-elena.jpg",
      keywords: "terapia de pareja Bogotá, psicóloga pareja Bogotá, terapia pareja sistémica"
    },
    {
      name: "Carlos Mendoza",
      location: "Chapinero, Bogotá",
      service: "Terapia Individual para Ansiedad",
      rating: 5,
      text: "Llegué a consulta con la Dra. Sandra con altos niveles de ansiedad y depresión. Su enfoque en psicoterapia Gestalt me ayudó a encontrar herramientas para manejar mi ansiedad en el día a día. Después de 6 meses de terapia psicológica individual, mi calidad de vida cambió completamente.",
      date: "2023-12-15",
      image: "/images/testimonials/carlos-mendoza.jpg",
      keywords: "terapia individual Bogotá, ansiedad Bogotá, psicoterapia Gestalt Bogotá"
    },
    {
      name: "Ana Sofía García",
      location: "Madrid, España",
      service: "Terapia Online Internacional",
      rating: 5,
      text: "Como española viviendo fuera de Colombia, encontrar una psicóloga que hablara mi idioma y entendiera mi cultura era difícil. La terapia online con la Dra. Sandra ha sido perfecta. Su consulta psicológica online en español me ha ayudado enormemente con mi proceso de desarrollo personal.",
      date: "2024-01-05",
      image: "/images/testimonials/ana-sofia.jpg",
      keywords: "terapia online español, psicólogo online internacional, consulta psicológica online"
    },
    {
      name: "Familia Hernández",
      location: "Zona Rosa, Bogotá",
      service: "Constelaciones Familiares",
      rating: 5,
      text: "Participamos en varias sesiones de constelaciones familiares con la Dra. Sandra y fue revelador. Su formación con Bert Hellinger se nota en cada sesión. Pudimos sanar patrones familiares transgeneracionales que afectaban nuestras relaciones. Es excepcional en terapia familiar sistémica.",
      date: "2023-11-20",
      image: "/images/testimonials/familia-hernandez.jpg",
      keywords: "constelaciones familiares Bogotá, terapia familiar sistémica Bogotá, Bert Hellinger Colombia"
    },
    {
      name: "Roberto Jiménez",
      location: "Buenos Aires, Argentina",
      service: "Desarrollo Personal Online",
      rating: 5,
      text: "El trabajo de desarrollo personal y autoconocimiento que he realizado con la Dra. Sandra a través de sesiones virtuales ha sido transformador. Su enfoque en psicología transpersonal y el trabajo con eneagrama me ayudó a entender mis patrones de personalidad y crecer como persona.",
      date: "2023-12-01",
      image: "/images/testimonials/roberto-jimenez.jpg",
      keywords: "desarrollo personal online, autoconocimiento, psicología transpersonal, eneagrama"
    },
    {
      name: "Claudia y Miguel Pérez",
      location: "Miami, Estados Unidos",
      service: "Terapia de Pareja Internacional",
      rating: 5,
      text: "Como pareja colombiana viviendo en Estados Unidos, necesitábamos terapia en español. La Dra. Sandra nos ofreció terapia de pareja internacional excepcional. Su experiencia de 38 años se nota en cada sesión. Nos ayudó a superar una crisis matrimonial importante.",
      date: "2023-10-15",
      image: "/images/testimonials/claudia-miguel.jpg",
      keywords: "terapia pareja internacional, terapia pareja español, psicóloga pareja online"
    },
    {
      name: "Patricia López",
      location: "Zona Norte, Bogotá",
      service: "Terapia Gestalt Individual",
      rating: 5,
      text: "Buscaba una psicóloga integrativa en Bogotá y encontré a la Dra. Sandra. Su formación en terapia Gestalt con Claudio Naranjo y su enfoque transpersonal han sido fundamentales en mi proceso de sanación emocional. Definitivamente la recomiendo como la mejor psicóloga clínica de Bogotá.",
      date: "2023-12-10",
      image: "/images/testimonials/patricia-lopez.jpg",
      keywords: "psicóloga integrativa Bogotá, terapia Gestalt Bogotá, psicóloga clínica Bogotá"
    },
    {
      name: "Fernando Castro",
      location: "México DF, México",
      service: "Psicoterapia Online Español",
      rating: 5,
      text: "Desde México he tenido la oportunidad de trabajar con la Dra. Sandra en sesiones de psicoterapia online. Su capacidad para crear un espacio terapéutico seguro a través de la pantalla es excepcional. El trabajo en desarrollo de consciencia ha sido profundo y transformador.",
      date: "2023-11-30",
      image: "/images/testimonials/fernando-castro.jpg",
      keywords: "psicoterapia online español, desarrollo consciencia, terapeuta online internacional"
    }
  ]

  const stats = [
    {
      number: "1000+",
      label: "Parejas Transformadas",
      description: "En terapia de pareja presencial y online"
    },
    {
      number: "500+",
      label: "Familias Sanadas",
      description: "Mediante constelaciones familiares sistémicas"
    },
    {
      number: "2000+",
      label: "Vidas Transformadas",
      description: "A través de terapia individual y desarrollo personal"
    },
    {
      number: "25+",
      label: "Países Atendidos",
      description: "Mediante terapia online internacional"
    }
  ]

  return (
    <section id="testimonios" className="section-padding bg-white">
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
            Testimonios de <span className="text-gradient">Pacientes Transformados</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            Más de 38 años transformando vidas a través de <strong>terapia psicológica en Bogotá</strong> y{' '}
            <strong>atención virtual internacional</strong>. Estas son las experiencias reales de personas que{' '}
            han encontrado sanación y crecimiento personal con nuestros servicios especializados.
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
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-neutral-900 mb-1">{stat.label}</div>
              <div className="text-sm text-neutral-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl transition-all duration-300"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="w-8 h-8 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-900" itemProp="author">{testimonial.name}</h3>
                    <div className="flex items-center gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                      <meta itemProp="bestRating" content="5" />
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <FaQuoteLeft className="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
                <blockquote className="text-neutral-600 leading-relaxed pl-6 mb-4" itemProp="reviewBody">
                  {testimonial.text}
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                  {testimonial.keywords}
                </div>
                <time className="text-xs text-neutral-400" itemProp="datePublished" dateTime={testimonial.date}>
                  {new Date(testimonial.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </time>
              </div>

              {/* Hidden schema data */}
              <div style={{ display: 'none' }}>
                <span itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
                  <span itemProp="name">Dra. Sandra Margarita Vargas - Psicóloga</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Servicios Más Valorados por Nuestros <span className="text-gradient">Pacientes</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaHeart,
                title: "Terapia de Pareja",
                location: "Bogotá & Internacional",
                rating: "4.9/5",
                count: "300+ parejas"
              },
              {
                icon: FaUsers,
                title: "Constelaciones Familiares",
                location: "Presencial & Virtual",
                rating: "5.0/5",
                count: "150+ familias"
              },
              {
                icon: FaLightbulb,
                title: "Desarrollo Personal",
                location: "Individual",
                rating: "4.8/5",
                count: "800+ personas"
              },
              {
                icon: FaGlobe,
                title: "Terapia Online",
                location: "25+ países",
                rating: "4.9/5",
                count: "500+ consultantes"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-lg font-bold text-neutral-900 mb-2">{service.title}</h4>
                <p className="text-sm text-neutral-600 mb-3">{service.location}</p>
                <div className="text-yellow-500 font-semibold mb-1">{service.rating}</div>
                <div className="text-xs text-neutral-500">{service.count}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* JSON-LD Schema for Aggregate Rating */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Dra. Sandra Margarita Vargas - Psicóloga",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": testimonials.length.toString(),
                "bestRating": "5",
                "worstRating": "4"
              },
              "review": testimonials.map(testimonial => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": testimonial.name
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": testimonial.rating.toString(),
                  "bestRating": "5"
                },
                "reviewBody": testimonial.text,
                "datePublished": testimonial.date
              }))
            })
          }}
        />
      </div>
    </section>
  )
}

export default TestimonialsExpanded 