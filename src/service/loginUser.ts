import {LoginData,RegisterData,Role,LoginResponse,RegisterResponse} from '@/types/auth';
import { isMockEnabled } from '@/lib/isMockEnabled';
import { mockLoginResponse } from '@/mock/login';

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  if (isMockEnabled()) {
    const validUsers: { username: string; password: string; role: Role }[] = [
      { username: 'adminuser', password: 'admin123', role: 'admin' },
      { username: 'dummyuser', password: 'dummy123', role: 'user' },
    ];

    const found = validUsers.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!found) {
      throw new Error('Mock login gagal: username/password salah');
    }

    return mockLoginResponse(found.role);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Login gagal');
  return res.json();
}

export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
  if (isMockEnabled()) {
    const existingUsers = ['adminuser', 'dummyuser'];

    if (existingUsers.includes(data.username)) {
      throw new Error('Mock register gagal: Username sudah digunakan');
    }

    return {
      message: 'Mock register berhasil',
      user: {
        id: Math.floor(Math.random() * 1000),
        username: data.username,
        role: data.role,
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Register gagal');
  return res.json();
}
