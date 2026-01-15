import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'

const PreguntasFrecuentesPage: React.FC = () => {
  const faqSEO = {
    title: "Preguntas Frecuentes - Dra. Sandra Margarita Vargas | FAQ Psicología Bogotá",
    description: "Respuestas a preguntas frecuentes sobre terapia psicológica, terapia de pareja, terapia online, constelaciones familiares y servicios de la Dra. Sandra Vargas en Bogotá.",
    canonical: "https://sandravargaspsicologa.com/preguntas-frecuentes",
    openGraph: {
      title: "Preguntas Frecuentes - Dra. Sandra Margarita Vargas",
      description: "Respuestas completas sobre terapia psicológica, terapia de pareja, servicios online y presenciales en Bogotá.",
      url: "https://sandravargaspsicologa.com/preguntas-frecuentes",
      type: 'website',
      images: [
        {
          url: "https://sandravargaspsicologa.com/images/faq-psicologia-bogota.jpg",
          width: 1200,
          height: 630,
          alt: "Preguntas Frecuentes - Dra. Sandra Margarita Vargas Psicóloga"
        }
      ]
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@drasandravargas',
      title: "Preguntas Frecuentes - Dra. Sandra Margarita Vargas",
      description: "Respuestas completas sobre terapia psicológica y servicios especializados en Bogotá."
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'preguntas frecuentes psicólogo Bogotá, FAQ terapia de pareja, dudas terapia online, consultas psicología clínica, información psicoterapia Gestalt, constelaciones familiares preguntas'
      },
      {
        name: 'author',
        content: 'Dra. Sandra Margarita Vargas'
      }
    ]
  }

  return (
    <>
      <NextSeo {...faqSEO} />
      <Head>
        {/* FAQ-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://sandravargaspsicologa.com/preguntas-frecuentes",
              "name": "Preguntas Frecuentes - Dra. Sandra Margarita Vargas",
              "description": "Respuestas a preguntas frecuentes sobre terapia psicológica, terapia de pareja y servicios especializados.",
              "mainEntity": {
                "@type": "FAQPage",
                "name": "Preguntas Frecuentes sobre Psicoterapia",
                "description": "Respuestas completas sobre servicios de psicología clínica, terapia de pareja y atención online."
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": "https://sandravargaspsicologa.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Preguntas Frecuentes",
                    "item": "https://sandravargaspsicologa.com/preguntas-frecuentes"
                  }
                ]
              },
              "author": {
                "@type": "Person",
                "name": "Dra. Sandra Margarita Vargas",
                "jobTitle": "Psicóloga Clínica",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Consulta Psicológica Dra. Sandra Vargas"
                }
              }
            }),
          }}
        />
        
        <link rel="canonical" href="https://sandravargaspsicologa.com/preguntas-frecuentes" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <FAQ />
        </main>
        <Footer />
        <WhatsAppBubble />
      </div>
    </>
  )
}

export default PreguntasFrecuentesPage 