import { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'user' | 'admin') => void;
}

// Hardcoded credentials (to be replaced by Firebase Auth)
const DEMO_USERS = [
  { email: 'user@ges.edu.gh', password: 'User@1234', role: 'user' as const },
  { email: 'admin@ges.edu.gh', password: 'Admin@1234', role: 'admin' as const },
];

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const found = DEMO_USERS.find(
        u => u.email === email.trim() && u.password === password
      );
      if (found) {
        onLogin(found.role);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-gray-100">
            <img
              src="/logo.png"
              alt="Differentiated Learning Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if logo not yet saved
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div style="background:#1e3a8a;color:white;width:80px;height:80px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;">DL</div>
                  `;
                }
              }}
            />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-navy-900" style={{ color: '#1e3a8a' }}>
            DL Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            GES Differentiated Learning<br />Implementation Spot Check
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@ges.edu.gh"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200"
            style={{ background: loading ? '#93c5fd' : '#0ea5e9' }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-700">
          <p className="font-bold mb-1">Demo Credentials</p>
          <p>👤 User: <span className="font-mono">user@ges.edu.gh</span> / <span className="font-mono">User@1234</span></p>
          <p>🔑 Admin: <span className="font-mono">admin@ges.edu.gh</span> / <span className="font-mono">Admin@1234</span></p>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Ghana Education Service • Differentiated Learning
      </p>
    </div>
  );
}
