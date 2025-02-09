export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  clearAuth: () => void;
  updateProcessedImages: () => Promise<void>;
  updateSubscription: (subscription: string) => Promise<void>;
} 