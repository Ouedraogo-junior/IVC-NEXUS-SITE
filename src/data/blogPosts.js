import { parseFrontmatter } from '../utils/parseFrontmatter'

const files = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export const blogPosts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop().replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || '',
      image: data.image || '',
      body: content,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))