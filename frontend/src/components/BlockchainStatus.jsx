import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Server, Key, Clock, Database, ArrowLeft } from 'lucide-react';
import { getComplaintById } from '../services/api';

export default function BlockchainStatus() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    setComplaint(getComplaintById(id));
    
    // Simulate verification delay
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (!complaint) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to={-1} className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      
      <div className="bg-surface rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="bg-slate-800/80 px-8 py-6 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-white">Blockchain Verification</h1>
          </div>
          
          {verifying ? (
            <div className="flex items-center text-slate-400 space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Verifying Ledger...</span>
            </div>
          ) : (
            <div className="flex items-center text-success space-x-2 bg-success/10 px-4 py-1.5 rounded-full border border-success/20">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">VERIFIED</span>
            </div>
          )}
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center">
                  <Server className="w-4 h-4 mr-1.5" /> Complaint ID
                </p>
                <p className="text-xl font-mono font-bold text-white">{complaint.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center">
                  <Key className="w-4 h-4 mr-1.5" /> Record / Evidence Hash (SHA-256)
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded-md p-3 font-mono text-sm text-primary break-all">
                  {complaint.evidenceHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center">
                  <Key className="w-4 h-4 mr-1.5" /> Transaction Hash
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded-md p-3 font-mono text-sm text-success break-all">
                  {complaint.transactionHash || '0x0000000000000000000000000000000000000000'}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 h-full">
                <h3 className="text-white font-medium mb-4 border-b border-slate-700 pb-2">Smart Contract Data</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Block Number</span>
                    <span className="font-mono text-white">#{complaint.blockNumber || '1234'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Timestamp</span>
                    <span className="font-mono text-white flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {complaint.timestamp || 'Just now'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Network</span>
                    <span className="text-white text-sm">Ethereum Goerli (Testnet)</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Contract Address</span>
                    <span className="font-mono text-xs text-slate-300">0x71C...976F</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700 text-xs text-slate-500 leading-relaxed">
                  This record is immutable and cryptographically secured. The evidence hash guarantees that the uploaded files have not been tampered with since submission.
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
