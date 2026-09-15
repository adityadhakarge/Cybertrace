import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Paperclip, ShieldCheck, ExternalLink } from 'lucide-react';
import { getComplaintById } from '../services/api';

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    setComplaint(getComplaintById(id));
  }, [id]);

  if (!complaint) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Complaint Details</h1>
        <Link 
          to={`/blockchain/${complaint.id}`}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-success" />
          <span>View Blockchain Verification</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-slate-700 p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-slate-400 mb-1">Complaint ID</p>
                <h2 className="text-2xl font-mono font-bold text-primary">{complaint.id}</h2>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-slate-800 text-primary border border-primary/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {complaint.status}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-400 mb-1">Subject</p>
                <p className="text-lg text-white font-medium">{complaint.subject}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-y border-slate-700 py-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Category</p>
                  <p className="text-white">{complaint.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Incident Date</p>
                  <p className="text-white">{complaint.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">Description</p>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  {complaint.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-slate-700 p-6 shadow-lg">
            <h3 className="font-semibold text-white mb-4 flex items-center">
              <Paperclip className="w-4 h-4 mr-2 text-slate-400" />
              Evidence
            </h3>
            
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-md flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium group-hover:text-primary transition-colors">{complaint.evidenceFileName || 'evidence_file.pdf'}</p>
                  <p className="text-xs text-slate-400">File attached</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-slate-700 p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-primary"></div>
            <h3 className="font-semibold text-white mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-success" />
              Security Meta
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Evidence SHA-256 Hash</p>
                <p className="font-mono text-xs text-slate-300 break-all bg-slate-900 p-2 rounded border border-slate-700">
                  {complaint.evidenceHash}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Transaction Hash</p>
                <p className="font-mono text-xs text-slate-300 break-all bg-slate-900 p-2 rounded border border-slate-700">
                  {complaint.transactionHash}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
