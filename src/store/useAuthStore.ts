import { create } from 'zustand';
import { User, AuthSession } from '../domain/models';

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  hydrationStatus: 'idle' | 'hydrating' | 'hydrated';
  
  setHydrationStatus: (status: 'idle' | 'hydrating' | 'hydrated') => void;
  login: (user: User, session: AuthSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  hydrationStatus: 'idle',
  
  setHydrationStatus: (status) => set({ hydrationStatus: status }),
  login: (user, session) => set({ user, session, isAuthenticated: true }),
  logout: () => set({ user: null, session: null, isAuthenticated: false }),
}));
