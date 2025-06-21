import { LoginResponse, Role } from '@/types/auth';
// import { toDisplayRole } from '@/lib/utils';

export function mockLoginResponse(role: Role): LoginResponse {
  return {
    token: 'mock-token',
    user: {
      id: 1,
      username: role === 'admin' ? 'adminuser' : 'dummyuser',
      role: role === 'admin' ? 'Admin' : 'User',
    },
  };
}