import { Html, Head, Main, NextScript } from 'next/document'

/**
 * _document.tsx
 * 
 * Archivo de configuración global para el documento HTML de Next.js.
 * Incluye scripts externos que deben cargarse en todas las páginas.
 */

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Favicon y manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Wompi Widget Script */}
        {/* Script necesario para abrir el widget de pago de Wompi */}
        <script
          type="text/javascript"
          src="https://checkout.wompi.co/widget.js"
          async
        />
        
        {/* Google Analytics (si lo usas) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
