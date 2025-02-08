export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedUrl?: string;
  error?: string;
  isBackground?: boolean;
}

export interface User {
  id: string;
  email: string;
  subscription: 'trial' | 'pro' | 'enterprise';
  processedImages: number;
  trialImagesLeft: number;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProcessedImages: () => void;
  updateSubscription: (subscription: 'trial' | 'pro' | 'enterprise') => void;
}