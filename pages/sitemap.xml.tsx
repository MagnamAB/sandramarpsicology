import { GetServerSideProps } from 'next'

function Sitemap() {
  // getServerSideProps will handle the rendering
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://drasandravargas.com'
  
  const staticPages = [
    '',
    '/sobre-mi',
    '/servicios', 
    '/contacto',
    '/blog'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap 