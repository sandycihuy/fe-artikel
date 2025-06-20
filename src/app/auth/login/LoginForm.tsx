'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { loginUser } from '@/service/loginUser'

const schema = z.object({
  username: z.string().min(6, 'Username minimal 6 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data)
      document.cookie = `token=${res.token}; path=/`
      toast.success('Login berhasil')
      router.push('/articles')
    } catch (error) {
      let message = 'Terjadi kesalahan saat login'
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message
      } else if (error instanceof Error) {
        message = error.message
      }
      toast.error('Login gagal', { description: message })
    }
  }

  const handleMockToggle = () => {
    const newMock = localStorage.getItem('useMock') !== 'true'
    localStorage.setItem('useMock', String(newMock))
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('username')} placeholder="Username kamu" />
      {errors.username && (
        <p className="text-sm text-red-500">{errors.username.message}</p>
      )}
      <Input
        {...register('password')}
        placeholder="Password kamu"
        type="password"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
        <Button type="button" variant="outline" onClick={handleMockToggle}>
          Toggle Mock
        </Button>
      </div>
    </form>
  )
}
