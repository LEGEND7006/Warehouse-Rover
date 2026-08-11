import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      // For simulation phase, accept any credentials and redirect to dashboard
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex-1 flex min-h-screen animate-fade-in w-full absolute top-0 left-0 bg-slate-950 z-50">
      
      {/* Left Side: Branding / Background */}
      <div className="hidden lg:flex flex-1 relative bg-indigo-900/20 items-center justify-center overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-purple-900/20 z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0" />
        
        {/* Decorative Circles */}
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -top-20 -left-20 animate-pulse-slow z-0" />
        <div className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[80px] bottom-0 right-0 z-0" />

        <div className="z-10 text-center flex flex-col items-center">
          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl mb-12">
            <Lock className="w-24 h-24 text-indigo-400" />
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Smart Warehouse</h2>
          <p className="text-slate-300 text-xl max-w-md mx-auto leading-relaxed">
            Secure Operator Access System. Authenticate to manage the grid and deploy autonomous rovers.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative bg-slate-950">
        
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-indigo-400 transition-colors gap-2 group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-lg">Return to Home</span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto mt-16 lg:mt-0 z-10">
          <div className="text-left mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">Operator Login</h2>
            <p className="text-slate-400 text-lg">Access the Smart Warehouse Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Operator ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-700/80 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-all outline-none text-lg shadow-inner"
                  placeholder="Enter ID (e.g. admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Passcode</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-700/80 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-all outline-none text-lg shadow-inner"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full btn-primary py-4 flex items-center justify-center gap-3 mt-8 text-lg font-bold rounded-2xl"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-6 h-6" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
            
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 bg-slate-900/30 p-4 rounded-xl border border-white/5">
            * Phase 1 Simulation accepts any credentials for testing purposes.
          </p>
        </div>
      </div>

    </div>
  );
}
