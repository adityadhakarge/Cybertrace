import { Link } from 'react-router-dom';
import { Shield, Lock, FileSearch, Database, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Animated Cyber Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6 relative">
            <motion.div 
              animate={{ boxShadow: ['0 0 0px #3b82f6', '0 0 40px #3b82f6', '0 0 0px #3b82f6'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-slate-900 p-4 border border-primary/30"
            >
              <Shield className="w-16 h-16 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Secure & Transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Cyber Policing
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            A blockchain-inspired portal for filing cyber complaints. Immutable evidence tracking, real-time status updates, and transparent law enforcement.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/submit-complaint" 
              className="px-8 py-4 bg-primary hover:bg-blue-600 text-white font-medium rounded-md transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              File a Complaint
            </Link>
            <Link 
              to="/track" 
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-md transition-all border border-slate-700 hover:border-slate-500 flex items-center"
            >
              <Activity className="w-5 h-5 mr-2 text-slate-400" />
              Track Status
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50 border-t border-slate-800 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              { icon: Lock, title: "Tamper-Proof Evidence", desc: "Cryptographic SHA-256 hashing ensures that uploaded evidence cannot be altered after submission." },
              { icon: FileSearch, title: "Real-Time Tracking", desc: "Monitor the exact status of your complaint as it moves through the investigation pipeline." },
              { icon: Database, title: "Immutable Records", desc: "Simulated blockchain architecture guarantees a transparent and permanent record of all incidents." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                className="bg-surface p-8 rounded-xl border border-slate-800 hover:bg-slate-800/80 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
