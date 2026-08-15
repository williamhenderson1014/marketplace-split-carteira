// Build padrão: Next.js normal, é exatamente o que o Vercel importa sem nenhum ajuste.
// Build com PAGES=1: export estático com basePath, para servir no GitHub Pages.
const pages = process.env.PAGES === '1'
const repo = '/marketplace-split-carteira'

/** @type {import('next').NextConfig} */
const nextConfig = pages
  ? {
      output: 'export',
      trailingSlash: true,
      basePath: repo,
      assetPrefix: repo,
      images: { unoptimized: true },
      env: { BASE: repo },
    }
  : {
      env: { BASE: '' },
    }

export default nextConfig
