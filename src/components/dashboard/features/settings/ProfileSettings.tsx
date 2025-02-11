import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from 'lucide-react';
import { TextInput } from '../../shared/TextInput';
import { Button } from '../../shared/Button';
import { Alert } from '../../shared/Alert';
import { useAuthStore } from '../../../../store/useAuthStore';
import { supabase } from '../../../../lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export const ProfileSettings: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
    },
  });

  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('idle');
      setError(null);

      const { error: updateError } = await supabase.auth.updateUser({
        email: data.email,
        data: { name: data.name },
      });

      if (updateError) throw updateError;
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      setStatus('error');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        Profile Information
      </h3>

      {status === 'success' && (
        <Alert type="success" title="Profile updated">
          Your profile has been updated successfully.
        </Alert>
      )}

      {status === 'error' && error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <TextInput
          label="Name"
          leftIcon={<User className="h-5 w-5" />}
          error={errors.name?.message}
          {...register('name')}
        />

        <TextInput
          label="Email"
          type="email"
          leftIcon={<User className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}; 