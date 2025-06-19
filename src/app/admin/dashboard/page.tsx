'use client'

import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DashboardPage() {
  const [totalArticles, setTotalArticles] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      const resArticles = await axios.get('/api/articles/stats')
      const resCategories = await axios.get('/api/categories/stats')
      setTotalArticles(resArticles.data.total)
      setTotalCategories(resCategories.data.total)
    }
    fetchStats()
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Total Artikel</h2>
          <p className="text-2xl">{totalArticles}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Total Kategori</h2>
          <p className="text-2xl">{totalCategories}</p>
        </CardContent>
      </Card>
    </div>
  )
}