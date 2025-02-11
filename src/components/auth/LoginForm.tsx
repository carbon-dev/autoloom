import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
import { TextInput } from '../dashboard/shared/TextInput';
import { Button } from '../dashboard/shared/Button';
import { Alert } from '../dashboard/shared/Alert';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = React.useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (authData.user) {
        login(authData.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      <TextInput
        label="Email"
        type="email"
        leftIcon={<Mail className="h-5 w-5" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <TextInput
        label="Password"
        type="password"
        leftIcon={<Lock className="h-5 w-5" />}
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}; 