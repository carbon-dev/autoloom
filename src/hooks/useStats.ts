import { useAuthStore } from '../store/useAuthStore';
import { useImageStore } from '../store/useImageStore';

export const useStats = () => {
  const user = useAuthStore((state) => state.user);
  const images = useImageStore((state) => state.images);

  const stats = [
    {
      name: 'Images Processed',
      value: user?.processedImages || 0,
    },
    {
      name: 'Trial Images Left',
      value: user?.trialImagesLeft || 0,
      hidden: user?.subscription !== 'trial',
    },
    {
      name: 'Images Pending',
      value: images.filter((img) => img.status === 'pending').length,
    },
    {
      name: 'Recent Uploads',
      value: images.filter((img) => 
        new Date(img.file.lastModified) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length,
    },
  ].filter((stat) => !stat.hidden);

  return stats;
};