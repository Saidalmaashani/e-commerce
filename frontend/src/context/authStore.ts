import { create } from 'zustand';

interface AuthState {
  user: any;
  token: string | null;
  role: 'merchant' | 'shopper' | 'delivery' | 'admin' | null;
  isAuthenticated: boolean;
  login: (user: any, token: string, role: string) => void;
  logout: () => void;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  role: null,
  isAuthenticated: false,

  login: (user, token, role) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    }
    set({ user, token, role, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    set({ user: null, token: null, role: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user }),
}));
