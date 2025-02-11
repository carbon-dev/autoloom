import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';
import { TextInput } from '../dashboard/shared/TextInput';
import { Button } from '../dashboard/shared/Button';
import { Alert } from '../dashboard/shared/Alert';
import { supabase } from '../../lib/supabase';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('idle');
      setError(null);
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {status === 'success' ? (
        <Alert type="success" title="Check your email">
          We've sent you a link to reset your password.
        </Alert>
      ) : status === 'error' && error ? (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      ) : null}

      <TextInput
        label="Email"
        type="email"
        leftIcon={<Mail className="h-5 w-5" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Send Reset Link
      </Button>
    </form>
  );
}; 