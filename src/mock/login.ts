import { LoginResponse, Role } from '@/types/auth';
import { toDisplayRole } from '@/lib/utils';

export function mockLoginResponse(role: Role): LoginResponse {
  return {
    token: `mocked-jwt-token-${role}`,
    user: {
      id: role === 'admin' ? 1 : 2,
      username: role === 'admin' ? 'adminuser' : 'dummyuser',
      role: toDisplayRole(role), 
    },
  };
}
