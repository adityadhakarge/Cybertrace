import { Link, useNavigate } from 'react-router-dom';
import { Shield, User as UserIcon } from 'lucide-react';
import { logoutUser, getCurrentUser } from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="bg-surface border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white tracking-wider">CyberTrace</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/track" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Track Complaint</Link>
            
            {!user && (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">
                  Register
                </Link>
              </>
            )}

            {user && user.role === 'user' && (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="text-danger hover:text-red-400 transition-colors text-sm font-medium">Logout</button>
              </>
            )}

            {user && user.role === 'officer' && (
              <>
                <Link to="/officer-dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Officer Panel</Link>
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                  <Shield className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="text-danger hover:text-red-400 transition-colors text-sm font-medium">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
