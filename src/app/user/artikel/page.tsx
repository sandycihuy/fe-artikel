'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ArticleList from './ArticleList'

export default function ArticlesPage() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const isLogin = document.cookie.includes('token=')
    if (!isLogin) {
      router.replace('/auth/login')
    } else {
      setIsReady(true)
    }
  }, [router])

  if (!isReady) return null 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Artikel</h1>
      <ArticleList />
    </div>
  )
}