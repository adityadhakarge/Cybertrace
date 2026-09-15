import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle2, Circle, Check } from 'lucide-react';
import { getComplaintById } from '../services/api';

export default function TrackComplaint() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [complaintId, setComplaintId] = useState(initialId);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch();
    }
  }, [initialId]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearched(true);
    
    if (!complaintId.trim()) {
      setError('Please enter a Complaint ID');
      setResult(null);
      return;
    }
    
    const complaint = getComplaintById(complaintId);
    if (complaint) {
      setResult(complaint);
      setError('');
    } else {
      setResult(null);
      setError('No complaint found with this ID. Please check and try again.');
    }
  };

  const steps = [
    'Submitted',
    'Verified',
    'Under Investigation',
    'Resolved'
  ];

  const getStepIndex = (status) => steps.indexOf(status);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Track Your Complaint</h1>
        <p className="text-slate-400">Enter your Complaint ID to view real-time status and blockchain verification.</p>
      </div>
      
      <div className="bg-surface rounded-xl border border-slate-700 p-8 shadow-lg mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="e.g. CC-2026-001"
              className="w-full bg-slate-800 border border-slate-600 rounded-md pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
            />
          </div>
          <button 
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
          >
            TRACK
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-danger/10 border border-danger/30 rounded-md text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-surface rounded-xl border border-slate-700 p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-700 pb-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">Complaint ID</p>
              <h2 className="text-2xl font-bold text-primary font-mono">{result.id}</h2>
              <p className="text-white mt-2 font-medium">{result.subject}</p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-sm text-slate-400 mb-1">Filed On</p>
              <p className="text-white font-medium">{result.date}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                {result.type}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => {
                const currentIndex = getStepIndex(result.status);
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                
                return (
                  <div key={step} className="relative flex items-center">
                    <div className={`absolute left-6 -ml-3.5 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      isCompleted ? 'bg-success border-success text-white z-10' : 
                      isCurrent ? 'bg-primary border-primary text-white z-10' : 
                      'bg-surface border-slate-600 text-slate-600'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Circle className="w-3 h-3 fill-current" />}
                    </div>
                    <div className="pl-16">
                      <h3 className={`font-semibold ${isCurrent || isCompleted ? 'text-white' : 'text-slate-500'}`}>
                        {step}
                      </h3>
                      {isCurrent && (
                        <p className="text-sm text-primary mt-1">Current Status</p>
                      )}
                      {step === 'Submitted' && isCompleted && (
                        <p className="text-xs text-slate-400 mt-1">Received securely via encrypted channel.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
