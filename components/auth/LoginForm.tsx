'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export function LoginForm() {
  const [email, setEmail] = useState('admin@digi-menu.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inicio de sesión fallido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          disabled={isLoading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold bg-accent text-white hover:opacity-90 active:scale-95 transition-all"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <p className="text-center text-sm text-text-secondary dark:text-text-secondary-dark">
        Demo: admin@digi-menu.com / admin123
      </p>
    </form>
  );
}
