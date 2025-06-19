'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

type Article = {
  id: string
  title: string
  content: string
  category: string
}

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const resp = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`)
        const data = resp.data.data
        setArticle(data)

        const relatedResp = await axios.get(`https://test-fe.mysellerpintar.com/api/articles`, {
          params: {
            category: data.category,
            limit: 3,
            exclude: data.id
          }
        })

        setRelated(relatedResp.data.data)
      } catch {
        setError(true)
      }
    }

    if (id) fetchArticle()
  }, [id])

  if (error) return <p>Artikel tidak ditemukan</p>
  if (!article) return <p>Loading...</p>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <h2 className="mt-8 font-semibold">Artikel lain:</h2>
      <ul className="list-disc ml-5">
        {related.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  )
}
