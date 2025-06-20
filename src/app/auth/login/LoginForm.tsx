'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(' coba login :', data)
    alert('Berhasil submit')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('username')} placeholder="Username" />
      <Input {...register('password')} placeholder="Password" type="password" />
      <Button type="submit">Login</Button>
    </form>
  )
}
