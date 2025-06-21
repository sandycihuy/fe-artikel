import { Role, DisplayRole } from '@/types/auth';

export function toDisplayRole(role: Role): DisplayRole {
  return role === 'admin' ? 'Admin' : 'User';
}

export function toRawRole(role: DisplayRole): Role {
  return role === 'Admin' ? 'admin' : 'user';
}
