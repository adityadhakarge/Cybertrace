import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { loginUser } from '../services/api';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = loginUser(formData.email, formData.password, role);
      if (user.role === 'officer') {
        navigate('/officer-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-surface p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
        <div className="flex justify-center mb-6">
          <Shield className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">Login to CyberTrace</h2>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            onClick={() => { setRole('user'); setError(''); }}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${role === 'user' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Citizen
          </button>
          <button 
            type="button"
            onClick={() => { setRole('officer'); setError(''); }}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${role === 'officer' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Officer
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder={role === 'user' ? "citizen@example.com" : "officer@cybercell.gov"}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
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
        
        {role === 'officer' && (
          <div className="mt-4 text-xs text-slate-500 text-center bg-slate-800 p-2 rounded">
            <strong>Demo Officer:</strong> officer@cybercell.gov / password123
          </div>
        )}
      </motion.div>
    </div>
  );
}
