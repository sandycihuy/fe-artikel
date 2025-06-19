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
// import api from '@/lib/axios'
import { loginUser } from '@/service/loginUser'

const schema = z.object({
    username: z.string().min(6),
    password: z.string().min(6)
})
type FormData = z.infer<typeof schema>


export default function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormData) => {
        console.log('Data yang dikirim:', data)
        try {
            setLoading(true)
            const res = await loginUser(data)
            document.cookie = `token =${res.token}`
            toast.success('login berhasil')
            router.push('/articles')
        } catch (error) {
            let message = 'Terjadi kesalahan saat login'
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message ?? message
            } else if (error instanceof Error) {
                message = error.message;
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
            <Input {...register('username')} placeholder="username  kamu " />
            {errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
            <Input {...register('password')} placeholder="password  kamu " />
            {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            {process.env.NODE_ENV === 'development' && (
                <Button type='button' variant="outline" onClick={() =>{localStorage.setItem('useMock','true');
                    window.location.reload();
                }}> </Button>
            )}

        </form>
    )
} 