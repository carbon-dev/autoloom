export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  processedUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'error' | 'deleting';
  error?: string;
} 