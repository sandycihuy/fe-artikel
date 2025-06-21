import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role, DisplayRole } from '@/types/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDisplayRole(role: Role): DisplayRole {
  return role === 'admin' ? 'Admin' : 'User';
}

export function toRawRole(role: DisplayRole): Role {
  return role === 'Admin' ? 'admin' : 'user';
}
