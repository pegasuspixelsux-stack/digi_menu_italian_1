export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  available: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
