import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, Clock, CheckCircle } from 'lucide-react';
import { getComplaints, getCurrentUser } from '../services/api';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    
    // Only show complaints that belong to the current user
    const allComplaints = getComplaints();
    const userComplaints = allComplaints.filter(c => c.userEmail === currentUser.email);
    setComplaints(userComplaints);
  }, [navigate]);

  const pending = complaints.filter(c => c.status !== 'Resolved').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-500/20 text-blue-400';
      case 'Verified': return 'bg-yellow-500/20 text-yellow-400';
      case 'Under Investigation': return 'bg-orange-500/20 text-orange-400';
      case 'Resolved': return 'bg-green-500/20 text-green-400';
      case 'Rejected (Fake)': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  if (!user) return null;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome, {user.name.split(' ')[0]}</h1>
        <Link 
          to="/submit-complaint" 
          className="flex items-center space-x-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Complaint</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-slate-700 p-6 flex items-center space-x-4 shadow-lg hover:border-primary/50 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Filed</p>
            <p className="text-2xl font-bold text-white">{complaints.length}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-slate-700 p-6 flex items-center space-x-4 shadow-lg hover:border-orange-500/50 transition-colors">
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-white">{pending}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-slate-700 p-6 flex items-center space-x-4 shadow-lg hover:border-green-500/50 transition-colors">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Resolved</p>
            <p className="text-2xl font-bold text-white">{resolved}</p>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-lg font-semibold text-white">Recent Complaints</h2>
        </div>
        <div className="divide-y divide-slate-700">
          {complaints.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400 mb-4">You haven't submitted any complaints yet.</p>
              <Link to="/submit-complaint" className="text-primary hover:underline font-medium">
                File your first complaint
              </Link>
            </div>
          ) : (
            complaints.map((complaint, idx) => (
              <motion.div 
                key={complaint.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-800/50 transition-colors group"
              >
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-mono text-primary font-medium">{complaint.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">{complaint.subject}</h3>
                  <p className="text-sm text-slate-400">{complaint.type} • {complaint.date}</p>
                </div>
                <div className="flex space-x-3">
                  <Link 
                    to={`/complaint/${complaint.id}`}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/blockchain/${complaint.id}`}
                    className="px-4 py-2 border border-slate-600 hover:border-primary text-slate-300 hover:text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Verify Hash
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
