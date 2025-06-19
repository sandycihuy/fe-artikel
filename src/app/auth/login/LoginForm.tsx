'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import axios from 'axios'
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
type FormData = z.infer<typeof schema>


export default function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/login', data)
            document.cookie = `token =${res.data.token}`
            toast.success('login berhasil')
            router.push('/articles')
        } catch (error) {
            let message = 'Terjadi kesalahan saat login'
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message ?? message
            }
            toast.error('Login gagal', {
                description: message,
            })
        } finally {
            setLoading(false)
        }
    }

return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input {...register('email')} placeholder="email  kamu " />
        {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        <Input {...register('password')} placeholder="password  kamu " />
        {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        <Button type='submit' disabled={loading}>{loading ? 'logging in' : 'login'}</Button>
    </form>
)
} 