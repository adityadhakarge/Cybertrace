import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle, Clock, CheckCircle } from 'lucide-react';
import { getComplaints } from '../services/api';

export default function UserDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const pending = complaints.filter(c => c.status !== 'Resolved').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-500/20 text-blue-400';
      case 'Verified': return 'bg-yellow-500/20 text-yellow-400';
      case 'Under Investigation': return 'bg-orange-500/20 text-orange-400';
      case 'Resolved': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome, Rahul</h1>
        <Link 
          to="/submit-complaint" 
          className="flex items-center space-x-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Submit New Complaint</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Complaints</p>
              <h3 className="text-2xl font-bold text-white">{String(complaints.length).padStart(2, '0')}</h3>
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pending Complaints</p>
              <h3 className="text-2xl font-bold text-white">{String(pending).padStart(2, '0')}</h3>
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Resolved Complaints</p>
              <h3 className="text-2xl font-bold text-white">{String(resolved).padStart(2, '0')}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Recent Complaints</h2>
        </div>
        <div className="divide-y divide-slate-700">
          {complaints.map(complaint => (
            <div key={complaint.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-mono text-primary font-medium">{complaint.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <h3 className="text-white font-medium mb-1">{complaint.subject}</h3>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
