import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock } from 'lucide-react';
import { TextInput } from '../dashboard/shared/TextInput';
import { Button } from '../dashboard/shared/Button';
import { Alert } from '../dashboard/shared/Alert';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) throw updateError;
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
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
        label="New Password"
        type="password"
        leftIcon={<Lock className="h-5 w-5" />}
        error={errors.password?.message}
        {...register('password')}
      />

      <TextInput
        label="Confirm New Password"
        type="password"
        leftIcon={<Lock className="h-5 w-5" />}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  );
}; 