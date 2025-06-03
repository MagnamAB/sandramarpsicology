import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'

const BlogPage: React.FC = () => {
  const blogSEO = {
    title: "Blog de Psicología - Dra. Sandra Margarita Vargas | Artículos y Consejos",
    description: "Blog especializado en psicología, terapia de pareja, desarrollo personal y bienestar emocional. Artículos escritos por la Dra. Sandra Vargas con +37 años de experiencia en Bogotá.",
    canonical: "https://drasandravargas.com/blog",
    openGraph: {
      title: "Blog de Psicología - Dra. Sandra Margarita Vargas",
      description: "Artículos especializados en psicología clínica, terapia de pareja, desarrollo personal y bienestar emocional desde Bogotá.",
      url: "https://drasandravargas.com/blog",
      type: 'website',
      images: [
        {
          url: "https://drasandravargas.com/images/blog-psicologia-bogota.jpg",
          width: 1200,
          height: 630,
          alt: "Blog de Psicología - Dra. Sandra Margarita Vargas"
        }
      ]
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@drasandravargas',
      title: "Blog de Psicología - Dra. Sandra Margarita Vargas",
      description: "Artículos especializados en psicología clínica, terapia de pareja y desarrollo personal desde Bogotá."
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'blog psicología, artículos psicología Bogotá, terapia de pareja blog, desarrollo personal Colombia, psicología clínica artículos, bienestar emocional blog, consejos psicológicos'
      },
      {
        name: 'author',
        content: 'Dra. Sandra Margarita Vargas'
      }
    ]
  }

  return (
    <>
      <NextSeo {...blogSEO} />
      <Head>
        {/* Blog-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "url": "https://drasandravargas.com/blog",
              "name": "Blog de Psicología - Dra. Sandra Margarita Vargas",
              "description": "Blog especializado en psicología clínica, terapia de pareja, desarrollo personal y bienestar emocional.",
              "author": {
                "@type": "Person",
                "name": "Dra. Sandra Margarita Vargas",
                "jobTitle": "Psicóloga Clínica",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Consulta Psicológica Dra. Sandra Vargas"
                }
              },
              "publisher": {
                "@type": "Organization",
                "name": "Dra. Sandra Margarita Vargas - Psicóloga",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://drasandravargas.com/images/logo-dra-sandra-vargas.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://drasandravargas.com/blog"
              }
            }),
          }}
        />
        
        <link rel="canonical" href="https://drasandravargas.com/blog" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <Blog />
        </main>
        <Footer />
        <WhatsAppBubble />
      </div>
    </>
  )
}

export default BlogPage 