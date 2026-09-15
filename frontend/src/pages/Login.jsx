import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('userRole', role);
    if (role === 'officer') {
      navigate('/officer-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-surface p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">Login to CyberTrace</h2>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${role === 'user' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Citizen
          </button>
          <button 
            type="button"
            onClick={() => setRole('officer')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${role === 'officer' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Officer
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder={role === 'user' ? "citizen@example.com" : "officer@cybercell.gov"}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition-colors mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
