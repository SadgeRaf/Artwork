export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login'],
    },
    sitemap: 'https://artwork-two-virid.vercel.app/sitemap.xml',
  }
}