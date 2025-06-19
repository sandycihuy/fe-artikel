'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
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
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      await axios.post('/api/register', data)
      toast.success('Registrasi berhasil!')
      router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Registrasi gagal', {
          description: error.response?.data?.message || 'Terjadi kesalahan.',
        })
      } else {
        toast.error('Registrasi gagal')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input {...register('name')} placeholder="nama kamu" />
      {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

      <Input {...register('email')} placeholder="email kamu" />
      {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

      <Input {...register('password')} placeholder="password kamu" />
      {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}

      <Button type='submit' disabled={loading}>
        {loading ? 'mendaftar...' : 'Register'}
      </Button>
    </form>
  )
}
