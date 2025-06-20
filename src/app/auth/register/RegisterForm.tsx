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
import { registerUser } from '@/service/loginUser' 
const schema = z.object({
  username: z.string().min(6, 'Username minimal 6 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role: z.literal('User'),
})

type FormData = z.infer<typeof schema>

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      role: 'User',
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log('🔁 coba submit dulu:', data)
    try {
      setLoading(true)
      const res = await registerUser(data)
      console.log('Register sukses:', res)

      toast.success('Registrasi berhasil!', {
        description: `registrasi udah berhasil , ${res.user.username}`,
      })
      router.push('/auth/login')
    } catch (error) {
      console.error('Register error:', error)

      let message = 'Terjadi kesalahan saat registrasi'

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message
      } else if (error instanceof Error) {
        message = error.message
      }

      toast.error('Registrasi gagal', { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('username')} placeholder="Username kamu" />
      {errors.username && (
        <p className="text-sm text-red-500">{errors.username.message}</p>
      )}

      <Input type="password" {...register('password')} placeholder="Password kamu" />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

     
      <input type="hidden" {...register('role')} />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Mendaftar...' : 'Register'}
      </Button>
    </form>
  )
}
