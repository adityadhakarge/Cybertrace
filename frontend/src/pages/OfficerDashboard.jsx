import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Activity, CheckCircle, Search } from 'lucide-react';
import { getComplaints, updateComplaintStatus, getCurrentUser } from '../services/api';

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'officer') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setComplaints(getComplaints());
  }, [navigate]);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateComplaintStatus(id, newStatus);
    if (updated) {
      setComplaints(complaints.map(c => c.id === id ? updated : c));
    }
  };

  const filtered = complaints.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: complaints.length,
    new: complaints.filter(c => c.status === 'Submitted').length,
    investigating: complaints.filter(c => c.status === 'Under Investigation' || c.status === 'Verified').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length
  };

  const statusOptions = ['Submitted', 'Verified', 'Under Investigation', 'Resolved', 'Rejected (Fake)'];

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <ShieldAlert className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-white">Officer Dashboard ({user.name})</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Total Cases</p>
          <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-blue-500/30 bg-blue-500/5">
          <p className="text-blue-400 text-sm mb-1">New Cases</p>
          <h3 className="text-3xl font-bold text-blue-400">{stats.new}</h3>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-orange-500/30 bg-orange-500/5">
          <p className="text-orange-400 text-sm mb-1">Investigating</p>
          <h3 className="text-3xl font-bold text-orange-400">{stats.investigating}</h3>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-green-500/30 bg-green-500/5">
          <p className="text-green-400 text-sm mb-1">Resolved</p>
          <h3 className="text-3xl font-bold text-green-400">{stats.resolved}</h3>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold text-white">Manage Complaints</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search ID or Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 bg-slate-800/50 uppercase border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Complaint ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filtered.map(complaint => (
                <tr key={complaint.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary font-medium">{complaint.id}</td>
                  <td className="px-6 py-4">{complaint.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.date}</td>
                  <td className="px-6 py-4">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border outline-none cursor-pointer appearance-none ${
                        complaint.status === 'Resolved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        complaint.status === 'Submitted' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        complaint.status === 'Rejected (Fake)' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <Link 
                      to={`/complaint/${complaint.id}`}
                      className="text-primary hover:text-blue-400 font-medium transition-colors"
                    >
                      View
                    </Link>
                    <span className="text-slate-600">|</span>
                    <Link 
                      to={`/blockchain/${complaint.id}`}
                      className="text-slate-400 hover:text-white font-medium transition-colors"
                    >
                      Verify
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No complaints found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
