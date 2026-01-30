'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await res.json();
      if (data.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/agent/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-pattern.png')] bg-cover relative overflow-hidden">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-brand opacity-90"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <main className="relative z-10 w-full max-w-md p-6">
        <div className="glass-card p-8 animate-fade-in">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 relative mb-4">
              <img
                src="/logo.jpg"
                alt="Anistour Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-200 tracking-wider">ESPACE PRO</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: admin"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center items-center"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            &copy; 2026 Anistour - Système Sécurisé
          </div>
        </div>
      </main>
    </div>
  );
}
