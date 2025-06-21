import { LoginResponse, Role } from '@/types/auth';
import { toDisplayRole } from '@/lib/utils';

export function mockLoginResponse(role: Role): LoginResponse {
  const users = {
    admin: {
      id: 1,
      username: 'adminuser',
      role: toDisplayRole('admin'),
    },
    user: {
      id: 2,
      username: 'dummyuser',
      role: toDisplayRole('user'),
    },
  };

  return {
    token: `mocked-jwt-token-${role}`,
    user: users[role],
  };
}
