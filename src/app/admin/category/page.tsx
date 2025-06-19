'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import debounce from 'lodash.debounce'
 type Category = {
    id:string,
    name:string
 }
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/categories', {
        params: { q: search, page, limit: 10 }
      })
      setCategories(res.data.data)
    } catch {
      toast.error('Gagal memuat kategori')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = debounce((val: string) => {
    setSearch(val)
    setPage(1)
  }, 400)

  useEffect(() => {
    fetchData()
  }, [search, page])

  return (
    <div className="space-y-4">
      <Input
        placeholder="Cari kategori..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>Kategori tidak ditemukan.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}