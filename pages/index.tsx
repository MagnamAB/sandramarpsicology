import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import OnlineTherapy from '../components/OnlineTherapy'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { defaultSEO, structuredData } from '../lib/seo'

const HomePage: React.FC = () => {
  // Enhanced SEO configuration based on comprehensive analysis
  const enhancedSEO = {
    ...defaultSEO,
    title: "Psicóloga Sandra Vargas | Terapia Individual • Pareja • Enfoque Integrativo | Bogotá",
    description: "Sandra Vargas: 38 años de experiencia en psicología clínica. Terapia individual adultos y terapia de pareja con enfoque integrativo holístico (Gestalt, sistémico, transpersonal). Atención online global y presencial en consultorio privado Bogotá.",
    canonical: "https://sandravargaspsicologa.com",
    openGraph: {
      ...defaultSEO.openGraph,
      title: "Psicóloga Sandra Vargas | Terapia Individual, Pareja, Enfoque Integrativo | Online",
      description: "Sandra Vargas, psicóloga clínica: 38 años de experiencia, enfoque integrativo holístico. Terapia individual adultos, terapia de pareja. Combina Gestalt, sistémico y transpersonal. Atención online global en español y presencial en consultorio privado Bogotá.",
      images: [
        {
          url: '/images/dra-sandra-vargas.jpg',
          width: 1200,
          height: 630,
          alt: "Sandra Vargas - Psicóloga clínica Bogotá 38 años experiencia especialista terapia individual adultos, terapia de pareja, Gestalt, constelaciones familiares"
        }
      ],
      url: "https://sandravargaspsicologa.com",
    },
    twitter: {
      ...defaultSEO.twitter,
      title: "Psicóloga Sandra Vargas Bogotá | 38 Años Experiencia",
      description: "Psicóloga clínica con 38 años de experiencia y enfoque integrativo holístico. Terapia individual adultos, terapia de pareja. Combina Gestalt, sistémico y transpersonal. Online global y presencial Bogotá.",
      images: ['/images/dra-sandra-vargas.jpg'],
      content: 'psicóloga Sandra Vargas, enfoque integrativo, terapia individual adultos, terapia de pareja online, psicoterapia integrativa Bogotá, metodología integrativa, terapia online español, consultorio privado psicóloga Bogotá, autoconocimiento desarrollo personal, psicólogo online internacional, terapia pareja sistémica'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'psicóloga Sandra Vargas Bogotá, 38 años experiencia psicología, terapia individual adultos, terapia de pareja online, psicoterapia Gestalt Bogotá, terapia online español, consultorio privado psicóloga Bogotá, autoconocimiento desarrollo personal, psicólogo online internacional, terapia pareja sistémica, enfoque integrativo, psicoterapia integrativa, Gestalt sistémico transpersonal'
      },
      {
        name: 'author',
        content: 'Sandra Margarita Vargas Montealegre'
      },
      {
        name: 'geo.region',
        content: 'CO-DC'
      },
      {
        name: 'geo.placename',
        content: 'Bogotá, Santa Bárbara'
      },
      {
        name: 'geo.position',
        content: '4.6482837;-74.0547854'
      },
      {
        name: 'ICBM',
        content: '4.6482837, -74.0547854'
      }
    ]
  }

  return (
    <>
      <NextSeo {...enhancedSEO} />
      <Head>
        {/* Enhanced structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.services),
          }}
        />
        
        {/* Enhanced LocalBusiness Schema with 37 years experience emphasis */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Psychologist",
              "@id": "https://sandravargaspsicologa.com",
              "name": "Sandra Margarita Vargas - Psicóloga Clínica 38 Años Experiencia",
              "alternateName": "Psicóloga Sandra Vargas Bogotá",
              "url": "https://sandravargaspsicologa.com",
              "logo": "https://sandravargaspsicologa.com/images/logo-dra-sandra-vargas.png",
              "image": "https://sandravargaspsicologa.com/images/dra-sandra-vargas.jpg",
              "description": "Psicóloga clínica Sandra Margarita Vargas con 38 años de experiencia especializada en terapia individual adultos, terapia de pareja, terapia Gestalt. Atención online internacional en español y presencial en consultorio privado Bogotá.",
              "telephone": "+57-310-698-3385",
              "email": "sandramar.v@hotmail.com",
              "priceRange": "$$",
              "paymentAccepted": ["Cash", "Credit Card", "PayPal", "Bank Transfer", "Wise"],
              "currenciesAccepted": "COP, USD, EUR",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrera 13 Nº 122 – 34",
                "addressLocality": "Santa Bárbara",
                "addressRegion": "Bogotá",
                "postalCode": "110111",
                "addressCountry": "CO"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 4.6482837,
                "longitude": -74.0547854
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification", 
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "15:00"
                }
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Bogotá",
                  "addressCountry": "Colombia"
                },
                {
                  "@type": "Country",
                  "name": "Colombia"
                },
                {
                  "@type": "Place",
                  "name": "Internacional - Atención Virtual Global en Español"
                }
              ],
              "serviceType": [
                "Terapia Individual Adultos",
                "Terapia de Pareja Online",
                "Terapia Familiar Sistémica", 
                "Terapia Grupal Adultos",
                "Psicoterapia Gestalt",
                "Autoconocimiento y Desarrollo Personal",
                "Terapia Online Internacional Español",
                "Consultorio Privado Bogotá"
              ],
              "specialty": [
                "38 Años Experiencia Psicología Clínica",
                "Terapia Individual Adultos Online",
                "Terapia de Pareja Sistémica Global",
                "Psicoterapia Gestalt Claudio Naranjo SAT",
                "Autoconocimiento Desarrollo Personal",
                "Terapia Online Español Latinoamérica",
                "Consultorio Privado Discreto Bogotá",
                "Enfoque Integrativo Holístico",
                "Metodología Integrativa: Gestalt + Sistémico + Transpersonal"
              ],
              "medicalSpecialty": "Clinical Psychology",
              "knowsLanguage": ["Spanish"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Psicoterapia Especializada 38 Años Experiencia",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia Individual Adultos Online",
                      "description": "Psicoterapia con enfoque integrativo para adultos con 38 años de experiencia. Proceso profundo de autoconocimiento y desarrollo personal. Metodología que integra Gestalt, sistémico y transpersonal. Atención online global en español.",
                      "provider": {
                        "@type": "Psychologist",
                        "name": "Sandra Margarita Vargas"
                      }
                    },
                    "areaServed": ["Global", "Internacional", "Latinoamérica"]
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia de Pareja Online Internacional",
                      "description": "Terapia de pareja sistémica especializada con 38 años de experiencia. Sanación heridas emocionales y fortalecimiento vínculos amorosos. Online global y presencial Bogotá.",
                      "provider": {
                        "@type": "Psychologist",
                        "name": "Sandra Margarita Vargas"
                    }
                    },
                    "areaServed": ["Bogotá", "Colombia", "Internacional"]
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Consultorio Privado Bogotá",
                      "description": "Sesiones presenciales en ambiente privado y discreto para mayor confidencialidad. 38 años de experiencia en acompañamiento terapéutico integral.",
                      "provider": {
                        "@type": "Psychologist",
                        "name": "Sandra Margarita Vargas"
                      }
                    },
                    "areaServed": ["Bogotá", "Santa Bárbara", "Colombia"]
                  }
                ]
              },
              "makesOffer": {
                "@type": "Offer",
                "description": "Consulta psicológica especializada con 38 años de experiencia",
                "priceRange": "$$"
              }
            }),
          }}
        />

        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Cuántos años de experiencia tiene la psicóloga Sandra Vargas?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Dra. Sandra Margarita Vargas tiene más de 38 años de experiencia en psicología clínica y acompañamiento terapéutico integral con enfoque sistémico, gestáltico y holístico."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué servicios ofrece la psicóloga Sandra Vargas?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ofrece terapia individual para adultos, terapia de pareja, terapia familiar sistémica, desarrollo personal y terapia grupal. Especializada en Gestalt y enfoques holísticos."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Atiende online la psicóloga Sandra Vargas?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, ofrece terapia online internacional en español para consultantes de todo el mundo, además de atención presencial en su consultorio privado en Bogotá para mayor privacidad."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Dónde está ubicada la consulta presencial de la psicóloga Sandra Vargas?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Su consultorio presencial está ubicado en Santa Bárbara, Bogotá (Carrera 13 Nº 122 – 34). Ofrece sesiones en un ambiente privado y discreto para mayor confidencialidad."
                  }
                }
              ]
            }),
          }}
        />
      </Head>
        <Header />
      <main>
          <Hero />
          <About />
          <Services />
          <OnlineTherapy />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <WhatsAppBubble />
    </>
  )
}

export default HomePage 