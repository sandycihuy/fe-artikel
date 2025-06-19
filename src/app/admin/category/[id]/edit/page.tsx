'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
type FormData = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2, { message: 'Nama kategori minimal 2 karakter' })
})

export default function EditCategoryPage() {
    const router = useRouter()
    const params = useParams()
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: '' }
    })

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`/api/categories/${params.id}`)
                form.reset({ name: res.data.data.name })
            } catch {
                toast.error('category tidak ditemukan')
            }
        }
        fetchCategory()
    }, [params.id])

    const onSubmit = async (data: FormData) => {
        try {
            await axios.put(`/api/categories/${params.id}`, data)
            toast.success('Kategori berhasil diperbarui')
            router.push('/categories')
        } catch {
            toast.error('Gagal update kategori')
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md p-4 space-y-4">
            <h1 className="text-xl font-bold">Edit Kategori</h1>
            <Input {...form.register('name')} placeholder="Nama kategori" />
            <Button type="submit">Update</Button>
        </form>
    )
}
