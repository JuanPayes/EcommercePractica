import { createContext, useState, type ReactNode } from 'react';
import type { UserResponse, LoginRequest, RegisterRequest } from '@/types/auth.types';
import { login as loginApi, register as registerApi } from '@/api/auth';

type AuthContextType = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  login: (dto: LoginRequest) => Promise<void>;
  register: (dto: RegisterRequest) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): UserResponse | null {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(getStoredUser());

  function persistSession(token: string, usuario: UserResponse) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    setUser(usuario);
  }

  async function login(dto: LoginRequest) {
    const response = await loginApi(dto);
    persistSession(response.token, response.usuario);
  }

  async function register(dto: RegisterRequest) {
    const response = await registerApi(dto);
    persistSession(response.token, response.usuario);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}