import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User } from 'lucide-react';
import { TextInput } from '../dashboard/shared/TextInput';
import { Button } from '../dashboard/shared/Button';
import { Alert } from '../dashboard/shared/Alert';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export const SignupForm: React.FC = () => {
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (authError) throw authError;
      if (authData.user) {
        login(authData.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
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
        label="Name"
        leftIcon={<User className="h-5 w-5" />}
        error={errors.name?.message}
        {...register('name')}
      />

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

      <TextInput
        label="Confirm Password"
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
        Sign up
      </Button>
    </form>
  );
}; 