import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('userRole', 'user');
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-surface p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">Create an Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Rahul Kumar"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="rahul@example.com"
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
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
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
            Register
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
