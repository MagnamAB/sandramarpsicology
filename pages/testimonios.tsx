import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import TestimonialsExpanded from '../components/TestimonialsExpanded'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'

const TestimoniosPage: React.FC = () => {
  const testimoniosSEO = {
    title: "Testimonios - Dra. Sandra Margarita Vargas | Experiencias Reales de Pacientes",
    description: "Testimonios reales de pacientes de la Dra. Sandra Vargas. Más de 37 años transformando vidas a través de terapia de pareja, psicología clínica y terapia online internacional desde Bogotá.",
    canonical: "https://drasandravargas.com/testimonios",
    openGraph: {
      title: "Testimonios - Dra. Sandra Margarita Vargas",
      description: "Experiencias reales de pacientes transformados a través de terapia psicológica especializada en Bogotá y online internacional.",
      url: "https://drasandravargas.com/testimonios",
      type: 'website',
      images: [
        {
          url: "https://drasandravargas.com/images/testimonios-psicologia-bogota.jpg",
          width: 1200,
          height: 630,
          alt: "Testimonios - Dra. Sandra Margarita Vargas Psicóloga"
        }
      ]
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@drasandravargas',
      title: "Testimonios - Dra. Sandra Margarita Vargas",
      description: "Experiencias reales de pacientes transformados a través de terapia psicológica especializada."
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'testimonios psicóloga Bogotá, experiencias pacientes psicología, reseñas terapia de pareja, testimonios terapia online, casos éxito psicología clínica, opiniones psicóloga Sandra Vargas'
      },
      {
        name: 'author',
        content: 'Dra. Sandra Margarita Vargas'
      }
    ]
  }

  return (
    <>
      <NextSeo {...testimoniosSEO} />
      <Head>
        {/* Testimonials-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://drasandravargas.com/testimonios",
              "name": "Testimonios - Dra. Sandra Margarita Vargas",
              "description": "Testimonios reales de pacientes transformados a través de terapia psicológica especializada.",
              "mainEntity": {
                "@type": "LocalBusiness",
                "name": "Dra. Sandra Margarita Vargas - Psicóloga",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "8",
                  "bestRating": "5",
                  "worstRating": "4"
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": "https://drasandravargas.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Testimonios",
                    "item": "https://drasandravargas.com/testimonios"
                  }
                ]
              }
            }),
          }}
        />
        
        <link rel="canonical" href="https://drasandravargas.com/testimonios" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <TestimonialsExpanded />
        </main>
        <Footer />
        <WhatsAppBubble />
      </div>
    </>
  )
}

export default TestimoniosPage 