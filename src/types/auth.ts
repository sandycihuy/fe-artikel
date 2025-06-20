export type Role = 'admin' | 'user';
export type DisplayRole = 'Admin' | 'User';

export interface User {
  id: number;
  username: string;
  role: DisplayRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  role: DisplayRole;
}
