export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedUrl?: string;
  error?: string;
}

export interface DashboardUser {
  id: string;
  email: string;
  subscription: 'trial' | 'pro' | 'enterprise';
  processedImages: number;
  trialImagesLeft: number;
} 