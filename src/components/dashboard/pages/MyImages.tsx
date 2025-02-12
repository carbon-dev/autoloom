import React, { useEffect, useState } from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';
import { useImageStore } from '../stores/useImageStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { supabase } from '../../../lib/supabase';
import { Trash2, Download } from 'lucide-react';

export const MyImages: React.FC = () => {
  const removeImage = useImageStore((state) => state.removeImage);
  const onImageProcessed = useImageStore((state) => state.onImageProcessed);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [completedImages, setCompletedImages] = useState<any[]>([]);

  const fetchCompletedImages = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching completed images...');
      const { data: images, error } = await supabase
        .from('processed_images')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      if (images) {
        console.log('Received images:', images.length);
        setCompletedImages(images);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading images:', error);
      setIsLoading(false);
    }
  };

  const fetchLatestCount = async () => {
    if (!user) return;
    
    try {
      const { data: customer, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching latest count:', error);
        return;
      }

      if (customer) {
        // Update auth store with latest counts
        useAuthStore.setState((state) => ({
          ...state,
          user: state.user ? {
            ...state.user,
            processedImages: customer.processed_images,
            trialImagesLeft: customer.trial_images_left,
          } : null
        }));
      }
    } catch (error) {
      console.error('Error fetching latest count:', error);
    }
  };

  // Effect for initial load
  useEffect(() => {
    if (user) {
      fetchCompletedImages();
      fetchLatestCount();
    }
  }, [user]);

  // Effect to handle image changes
  useEffect(() => {
    if (!user) return;

    const handleImageRemoved = (payload: any) => {
      if (payload.old && payload.old.customer_id === user.id) {
        setCompletedImages(current => 
          current.filter(img => img.id !== payload.old.id)
        );
        fetchLatestCount();
      }
    };

    const handleImageAdded = (payload: any) => {
      if (payload.new && payload.new.customer_id === user.id) {
        setCompletedImages(current => [payload.new, ...current]);
        fetchLatestCount();
      }
    };

    const handleCustomerUpdated = (payload: any) => {
      if (payload.new && payload.new.id === user.id) {
        useAuthStore.setState((state) => ({
          ...state,
          user: state.user ? {
            ...state.user,
            processedImages: payload.new.processed_images,
            trialImagesLeft: payload.new.trial_images_left,
          } : null
        }));
      }
    };

    const subscription = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'processed_images',
          filter: `customer_id=eq.${user.id}`
        },
        handleImageRemoved
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'processed_images',
          filter: `customer_id=eq.${user.id}`
        },
        handleImageAdded
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'customers',
          filter: `id=eq.${user.id}`
        },
        handleCustomerUpdated
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title={"My Images"}
        description={"View and manage your processed images."}
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            {isLoading && completedImages.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : (
              <>
                {completedImages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {completedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
                      >
                        <img
                          src={image.processed_url}
                          alt="Processed"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.error('Failed to load image:', image.processed_url);
                            const img = e.target as HTMLImageElement;
                            img.src = image.original_url;
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDownload(image.processed_url)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeImage(image.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No processed images yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Upload some images in the Background Removal tab to get started.</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 