import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { addComplaint, getCurrentUser } from '../services/api';
import { motion } from 'framer-motion';

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [newComplaint, setNewComplaint] = useState(null);
  
  const [formData, setFormData] = useState({
    type: 'Online Fraud',
    subject: '',
    description: '',
    date: ''
  });

  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !formData.date) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Add the file name and data to the complaint data so it can be displayed/viewed later
    const result = addComplaint({ 
      ...formData, 
      evidenceFileName: fileName || 'evidence_file.pdf',
      evidenceFileData: fileData
    });
    setNewComplaint(result);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      // Read file as base64 to store in local storage for the demo
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (submitted && newComplaint) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-10"
      >
        <div className="bg-surface border border-slate-700 rounded-xl p-8 text-center shadow-xl">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Complaint Submitted Successfully</h2>
          <p className="text-slate-400 mb-8">Your complaint has been securely recorded on the blockchain.</p>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8 text-left border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400 mb-1">Complaint ID</p>
                <p className="font-mono text-lg text-primary font-bold">{newComplaint.id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Blockchain Status</p>
                <div className="flex items-center space-x-2 text-success">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-medium">Recorded</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-400 mb-1">Transaction Hash</p>
                <p className="font-mono text-sm text-slate-300 break-all bg-slate-900 p-3 rounded border border-slate-700">
                  {newComplaint.transactionHash}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to="/dashboard"
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link 
              to={`/track?id=${newComplaint.id}`}
              className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              Track Status
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">File a Cyber Complaint</h1>
        <p className="text-slate-400">Please provide accurate details. All submissions are securely hashed on the ledger.</p>
      </div>

      <div className="bg-surface rounded-xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-slate-300">Secure Submission Gateway</span>
        </div>
        
        {error && (
          <div className="m-6 mb-0 p-4 bg-danger/10 border border-danger/30 rounded-md flex items-start space-x-3 text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Complaint Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Online Fraud</option>
                <option>Account Hacking</option>
                <option>Cyber Harassment</option>
                <option>Phishing</option>
                <option>Identity Theft</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Incident Date</label>
              <input 
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary [color-scheme:dark]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
            <input 
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief summary of the incident"
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Provide detailed information about what happened..."
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Evidence Upload</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-400 justify-center flex-col items-center">
                  <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-blue-400 focus-within:outline-none mt-2">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  {fileName ? (
                    <p className="mt-2 text-white bg-slate-700 px-3 py-1 rounded text-sm">Selected: {fileName}</p>
                  ) : (
                    <p className="mt-2 pl-1">or drag and drop</p>
                  )}
                </div>
                {!fileName && (
                  <p className="text-xs text-slate-500 mt-2">
                    PNG, JPG, PDF up to 10MB
                  </p>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-success" />
              Evidence will be cryptographically hashed (SHA-256) before uploading to ensure immutability.
            </p>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-700">
            <button 
              type="submit"
              className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
