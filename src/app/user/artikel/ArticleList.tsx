'use client'

import { useEffect, useState } from "react"
import axios from 'axios'
import debounce from 'lodash.debounce'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

type Article = {
  id: string,
  title: string
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const resp = await axios.get(`/api/articles`, {
        params: { q: search, page, limit: 9 }
      })
      setArticles(resp.data.data)
    } catch {
      setError('gagal memuat artikel')
      toast.error('gagal memuat artikel')
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce((val: string) => {
    setSearch(val)
    setPage(1)
  }, 400)

  useEffect(() => {
    fetchArticles()
  }, [search, page])

  return (
    <div className="space-y-4">
      <Input placeholder="cari artikel..." onChange={(e) => debouncedSearch(e.target.value)} />
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error}</p>
      ) : articles.length === 0 ? (
        <p>tidak ditemukan artikel</p>
      ) : (
        <ul className="grid md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
