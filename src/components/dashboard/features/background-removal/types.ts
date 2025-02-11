export type ImageStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface Image {
  id: string;
  name: string;
  originalUrl: string;
  processedUrl?: string;
  status: ImageStatus;
  progress?: number;
  error?: string;
} 