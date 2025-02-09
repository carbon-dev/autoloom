const REMOVE_BG_API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY;
const API_URL = 'https://api.remove.bg/v1.0/removebg';

export async function removeBackground(imageFile: File, outputFormat: 'auto' | 'png' | 'jpg' = 'auto'): Promise<Blob> {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');
  formData.append('format', outputFormat);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-Api-Key': REMOVE_BG_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.title || 'Failed to remove background');
  }

  return response.blob();
} 