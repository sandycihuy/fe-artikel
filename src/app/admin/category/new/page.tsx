'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const schema = z.object({
    name: z.string().min(2, { message: 'Nama kategori minimal 2 karakter' })
})
type FormData = z.infer<typeof schema>

export default function CreateCategoryPage() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: '' }
    })

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post('/api/categories', data)
            toast.success('Kategori berhasil dibuat')
            router.push('/categories')
        } catch {
            toast.error("gagal memuat categories ")
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md p-4 space-y-4">
            <h1 className="text-xl font-bold">Buat Kategori</h1>
            <Input {...form.register('name')} placeholder="Nama kategori" />
            <Button type="submit">Simpan</Button>
        </form>
    )
}
