export type UserRole = 'homeowner' | 'tradesperson';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isHomeowner: boolean;
  isTradesperson: boolean;
}
