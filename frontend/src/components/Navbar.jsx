import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // Simulated auth state for demo
  const userRole = localStorage.getItem('userRole'); // 'user' or 'officer'

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="bg-surface border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white tracking-wider">CyberTrace</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/track" className="text-slate-300 hover:text-white transition-colors">Track Complaint</Link>
            
            {!userRole && (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                  Register
                </Link>
              </>
            )}

            {userRole === 'user' && (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="text-danger hover:text-red-400 transition-colors">Logout</button>
              </>
            )}

            {userRole === 'officer' && (
              <>
                <Link to="/officer-dashboard" className="text-slate-300 hover:text-white transition-colors">Officer Panel</Link>
                <button onClick={handleLogout} className="text-danger hover:text-red-400 transition-colors">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
