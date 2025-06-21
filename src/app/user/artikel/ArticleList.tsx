'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import debounce from 'lodash.debounce'

type Article = {
  id: string
  title: string
}

const mockData = [
  {
    id: '1',
    title: 'Artikel Satu'
  },
  {
    id: '2',
    title: 'Artikel Dua'
  },
  {
    id: '3',
    title: 'Artikel Tiga'
  }
]

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  // const [search, setSearch] = useState('')

  const debouncedSearch = debounce((value: string) => {
    const filtered = mockData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    )
    setArticles(filtered)
  }, 300)

  useEffect(() => {
    setArticles(mockData)
  }, [])

  return (
    <div className="space-y-4">
      <Input
        placeholder="Cari artikel..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />

      <ul className="grid md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
