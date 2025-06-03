import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { defaultSEO, structuredData } from '../lib/seo'

const HomePage: React.FC = () => {
  return (
    <>
      <NextSeo {...defaultSEO} />
      <Head>
        {/* Datos estructurados */}
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
        
        {/* Meta tags adicionales para SEO local */}
        <meta name="geo.region" content="CO" />
        <meta name="geo.placename" content="Colombia" />
        
        {/* Preconnect para optimización de velocidad */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drasandravargas.com" />
        
        {/* Favicon y iconos */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags para verificación */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        
        {/* Hreflang para idioma */}
        <link rel="alternate" hrefLang="es-co" href="https://drasandravargas.com" />
        <link rel="alternate" hrefLang="es" href="https://drasandravargas.com" />
        
        {/* JSON-LD para LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://drasandravargas.com",
              "name": "Dra. Sandra Margarita Vargas - Psicóloga",
              "image": "https://drasandravargas.com/images/dra-sandra-vargas.jpg",
              "description": "Psicóloga especialista en terapia de pareja, terapia familiar sistémica, Gestalt y constelaciones familiares. Atención virtual internacional a consultantes de todo el mundo y presencial en Colombia",
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
              "url": "https://drasandravargas.com",
              "telephone": "+57-310-698-3385",
              "email": "sandramar.v@hotmail.com",
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
              "sameAs": [
                "https://wa.me/573106983385"
              ],
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Colombia"
                },
                {
                  "@type": "Place",
                  "name": "Internacional - Atención Virtual Global"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios de Psicoterapia",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia de Pareja Colombia",
                      "description": "Especializada en terapia de pareja con enfoque sistémico y Gestalt. Atención virtual y presencial."
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia Familiar Sistémica",
                      "description": "Constelaciones familiares sistémicas y terapia familiar. Atención virtual y presencial."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Terapia Individual Adultos",
                      "description": "Psicoterapia Gestalt individual para adultos. Atención virtual y presencial."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Desarrollo Personal Colombia",
                      "description": "Proceso especializado de desarrollo personal y crecimiento consciente. Atención virtual y presencial."
                    }
                  }
                ]
              }
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <Hero />
          <About />
          <Services />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <WhatsAppBubble />
      </div>
    </>
  )
}

export default HomePage 