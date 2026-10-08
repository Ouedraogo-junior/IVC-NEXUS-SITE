import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const SITE_URL = 'https://ivcnexus.example'

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/a-propos', changefreq: 'monthly', priority: '0.7' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/realisations', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
]

function getBlogSlugs() {
  const blogDir = path.join(rootDir, 'content', 'blog')
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

function getCaseStudyIds() {
  const filePath = path.join(rootDir, 'src', 'data', 'portfolioItems.js')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  const matches = [...content.matchAll(/id:\s*'([^']+)'/g)]
  return matches.map((m) => m[1])
}

function buildUrlEntry(loc, changefreq, priority) {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

const entries = [
  ...staticRoutes.map((r) => buildUrlEntry(r.path, r.changefreq, r.priority)),
  ...getBlogSlugs().map((slug) => buildUrlEntry(`/blog/${slug}`, 'monthly', '0.6')),
  ...getCaseStudyIds().map((id) => buildUrlEntry(`/realisations/${id}`, 'monthly', '0.5')),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

const outPath = path.join(rootDir, 'public', 'sitemap.xml')
fs.writeFileSync(outPath, xml, 'utf-8')
console.log(`✓ sitemap.xml généré (${entries.length} URLs) → ${outPath}`)