import { NextSeoProps } from 'next-seo'

export const siteConfig = {
  name: 'Sandra Margarita Vargas - Psicóloga',
  description: 'Psicóloga con más de 38 años de experiencia en terapia familiar, de parejas e individual. Especializada en Gestalt, Constelaciones Familiares y desarrollo personal.',
  url: 'https://sandravargaspsicologa.com',
  ogImage: '/images/og-image.jpg',
  links: {
    whatsapp: 'https://wa.me/573106983385',
    email: 'mailto:sandramar.v@hotmail.com',
    phone: 'tel:+573106983385'
  },
  contact: {
    phone: '+57 310 698 3385',
    email: 'sandramar.v@hotmail.com',
    address: 'Carrera 13 Nº 122 – 34 Santa Bárbara, Bogotá, Colombia'
  },
  social: {
    twitter: '@sandravargas',
    facebook: 'sandravargas',
    instagram: 'sandravargas'
  }
}

export const defaultSEO: NextSeoProps = {
  title: 'Sandra Margarita Vargas - Psicóloga Internacional | Terapia Virtual Global',
  description: 'Psicóloga especialista con +38 años de experiencia internacional. Terapia de pareja, familiar sistémica, Gestalt y constelaciones familiares. Atención virtual global desde Colombia. ⭐ Agende su consulta hoy.',
  canonical: 'https://sandravargaspsicologa.com',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://sandravargaspsicologa.com',
    siteName: 'Sandra Margarita Vargas - Psicóloga Internacional',
    title: 'Psicóloga Internacional | Terapia Virtual Global | Sandra Vargas',
    description: 'Terapeuta Gestalt especialista con +38 años de experiencia internacional. Terapia de pareja, constelaciones familiares sistémicas y desarrollo personal. Atención virtual a consultantes de todo el mundo desde Colombia. ⭐ Reserve su sesión.',
    images: [
      {
        url: '/images/dra-sandra-vargas.jpg',
        width: 1200,
        height: 630,
        alt: 'Sandra Margarita Vargas - Psicóloga especialista en terapia de pareja y familiar en Colombia',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    handle: '@sandravargas',
    site: '@sandravargas',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'psicóloga internacional, terapia de pareja global, terapeuta Gestalt Colombia, constelaciones familiares sistémicas, desarrollo personal adultos, terapia individual online, psicoterapia virtual internacional, consulta psicológica mundial, terapia familiar sistémica, psicóloga Bogotá Colombia, agendar cita psicóloga, atención virtual global'
    },
    {
      name: 'author',
      content: 'Sandra Margarita Vargas'
    },
    {
      name: 'geo.region',
      content: 'CO'
    },
    {
      name: 'geo.placename',
      content: 'Colombia'
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'canonical',
      href: 'https://sandravargaspsicologa.com'
    }
  ]
}

export const internationalSEO: NextSeoProps = {
  title: 'Sandra Margarita Vargas - Psicóloga Internacional | Terapia Virtual Global',
  description: 'Psicóloga con +38 años de experiencia internacional. Terapia online en español para consultantes de todo el mundo. Especialista en terapia de pareja, familiar y desarrollo personal.',
  openGraph: {
    siteName: 'Sandra Margarita Vargas - Psicóloga Internacional',
    title: 'Psicóloga Internacional | Terapia Virtual Global | Sandra Vargas',
    description: 'Psicóloga con +38 años de experiencia. Terapia online en español para consultantes internacionales. Especialista en terapia de pareja y desarrollo personal.',
    images: [
      {
        url: '/images/dra-sandra-vargas.jpg',
        width: 1200,
        height: 630,
        alt: 'Sandra Margarita Vargas - Psicóloga especialista en terapia de pareja y familiar en Colombia',
        type: 'image/jpeg'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Sandra Margarita Vargas'
    },
    {
      name: 'keywords',
      content: 'psicóloga online, terapia online español, consulta psicológica internacional, terapeuta virtual, psicóloga internacional'
    }
  ]
}

export const bogotaSEO: NextSeoProps = {
  title: 'Psicóloga en Bogotá | Terapia de Pareja y Familiar | Sandra Vargas',
  description: 'Psicóloga en Bogotá con +38 años de experiencia. Especialista en terapia de pareja, terapia familiar y desarrollo personal. Consulta presencial en Santa Bárbara.',
  openGraph: {
    title: 'Sobre Mí - Psicóloga con 37+ Años de Experiencia Internacional | Sandra Vargas',
    description: 'Conozca la trayectoria de Sandra Vargas, psicóloga con formación en Gestalt, constelaciones familiares y desarrollo personal. Más de 38 años transformando vidas internacionalmente.',
    images: [
      {
        url: '/images/dra-sandra-vargas-2.JPG',
        width: 1200,
        height: 630,
        alt: 'Sandra Vargas - Psicóloga',
        type: 'image/jpeg'
      }
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'psicóloga Bogotá, terapia de pareja Bogotá, psicóloga clínica Bogotá, terapia familiar Bogotá, psicóloga Santa Bárbara, constelaciones familiares Bogotá'
    }
  ]
}

// Configuración específica para páginas
export const pageSEO = {
  about: {
    title: 'Sobre Mí - Psicóloga con 37+ Años de Experiencia Internacional | Sandra Vargas',
    description: 'Conozca la trayectoria de Sandra Vargas, psicóloga con formación en Gestalt, constelaciones familiares y desarrollo personal. Más de 38 años transformando vidas internacionalmente.',
    keywords: 'psicóloga experiencia internacional, formación Claudio Naranjo SAT Colombia, sanación condicionamientos infantiles Fischer Hoffman, eneagrama estudio del carácter, psicología transpersonal internacional'
  },
  
  services: {
    title: 'Servicios de Psicología | Terapia Virtual Internacional | Gestalt y Constelaciones',
    description: 'Servicios especializados de psicoterapia: terapia de pareja, terapia familiar sistémica, terapeuta Gestalt, constelaciones familiares y desarrollo personal. Atención virtual internacional y presencial en Colombia.',
    keywords: 'terapia de pareja internacional, terapia familiar sistémica global, terapeuta Gestalt internacional, constelaciones familiares sistémicas mundial, desarrollo personal adultos internacional, terapia virtual internacional'
  },
  
  contact: {
    title: 'Agendar Cita - Psicóloga Internacional | Terapia Virtual Global',
    description: 'Agenda tu cita virtual internacional o presencial con Sandra Vargas. Especialista en terapia de pareja, familiar y desarrollo personal. Atención a consultantes de todo el mundo.',
    keywords: 'agendar cita psicóloga internacional, terapia virtual global, consulta psicológica online mundial, desarrollo personal adultos internacional'
  },
  
  workshops: {
    title: 'Talleres de Crecimiento Personal y Relaciones | Colombia',
    description: 'Talleres especializados para padres, crecimiento personal, ser adulto, autonomía y bienestar. Desarrollo de consciencia y sanación de relaciones inconclusas en Colombia.',
    keywords: 'talleres de crecimiento personal Colombia, talleres para padres relaciones armónicas, taller ser adulto logro autonomía bienestar, taller relaciones inconclusas Colombia, autoconocimiento desarrollo consciencia Colombia'
  }
}

// Datos estructurados para el sitio web
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sandra Margarita Vargas - Psicóloga",
    "description": "Psicóloga especialista en terapia de pareja, terapia familiar sistémica, Gestalt y constelaciones familiares. Atención virtual internacional y presencial en Colombia.",
    "url": "https://sandravargaspsicologa.com",
    "telephone": "+57-310-698-3385",
    "email": "sandramar.v@hotmail.com",
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
      "latitude": "4.6482837",
      "longitude": "-74.0547854"
    },
    "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-15:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "serviceType": "Psicología Clínica",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Colombia"
      },
      {
        "@type": "Place",
        "name": "Internacional - Atención Virtual Global"
      }
    ]
  },
  
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sandra Margarita Vargas",
    "jobTitle": "Psicóloga Clínica",
    "description": "Psicóloga con 38+ años de experiencia internacional en psicología clínica, educativa y organizacional. Especialista en terapia de pareja, Gestalt y constelaciones familiares con consultantes de todo el mundo.",
    "url": "https://sandravargaspsicologa.com",
    "email": "sandramar.v@hotmail.com",
    "telephone": "+57-310-698-3385",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrera 13 Nº 122 – 34",
      "addressLocality": "Santa Bárbara",
      "addressRegion": "Bogotá",
      "addressCountry": "CO"
    },
    "alumniOf": "Formación con Claudio Naranjo - SAT Colombia",
    "knowsAbout": [
      "Terapia de Pareja",
      "Terapia Familiar Sistémica", 
      "Psicoterapia Gestalt",
      "Constelaciones Familiares",
      "Desarrollo Personal",
      "Eneagrama",
      "Psicología Transpersonal"
    ]
  },
  
  services: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Terapia de Pareja Internacional",
      "description": "Terapia especializada para parejas con enfoque sistémico y Gestalt. Atención virtual internacional y presencial en Colombia.",
      "provider": {
        "@type": "Person",
        "name": "Sandra Margarita Vargas"
      },
      "areaServed": "Internacional",
      "serviceType": "Terapia de Pareja"
    },
    {
      "@context": "https://schema.org", 
      "@type": "Service",
      "name": "Terapia Familiar Sistémica",
      "description": "Terapia familiar con enfoque sistémico y constelaciones familiares. Atención virtual internacional y presencial en Colombia.",
      "provider": {
        "@type": "Person",
        "name": "Sandra Margarita Vargas"
      },
      "areaServed": "Internacional",
      "serviceType": "Terapia Familiar"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "Desarrollo Personal Internacional",
      "description": "Proceso especializado de desarrollo personal y crecimiento consciente para adultos. Trabajo profundo de autoconocimiento desde el enfoque transpersonal y Gestalt. Atención virtual internacional y presencial en Colombia.",
      "provider": {
        "@type": "Person",
        "name": "Sandra Margarita Vargas"
      },
      "areaServed": "Internacional",
      "serviceType": "Desarrollo Personal"
    }
  ]
} 