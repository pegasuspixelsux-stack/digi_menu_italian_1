'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
              Menú Digital
            </h1>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              Iniciar Sesión
            </p>
          </div>

          <div className="card p-8">
            <LoginForm />
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-accent hover:opacity-80 transition-opacity">
              Volver al Menú
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
