import { Link } from 'react-router-dom';
import { Shield, Lock, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl"
      >
        <div className="flex justify-center mb-6">
          <Shield className="w-24 h-24 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          Secure Cyber Complaint <span className="text-primary">Tracking</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12">
          Report • Track • Verify
        </p>

        <div className="flex justify-center space-x-6 mb-16">
          <Link to="/submit-complaint" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Submit Complaint
          </Link>
          <Link to="/track" className="bg-surface hover:bg-slate-700 border border-slate-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all">
            Track Complaint
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-surface p-6 rounded-xl border border-slate-800 shadow-lg">
            <Lock className="w-10 h-10 text-success mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Blockchain Secured</h3>
            <p className="text-slate-400 text-sm">Every complaint and evidence hash is permanently recorded on an immutable blockchain ledger.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-slate-800 shadow-lg">
            <FileSearch className="w-10 h-10 text-warning mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Transparent Tracking</h3>
            <p className="text-slate-400 text-sm">Real-time status updates from submission to resolution, visible only to authorized parties.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-slate-800 shadow-lg">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Tamper-Evident Records</h3>
            <p className="text-slate-400 text-sm">Cryptographic verification ensures that submitted evidence cannot be altered after the fact.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
