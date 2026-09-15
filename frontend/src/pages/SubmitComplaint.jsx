import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, CheckCircle2, ShieldCheck } from 'lucide-react';
import { addComplaint } from '../services/api';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the file name to the complaint data so it can be displayed later
    const result = addComplaint({ ...formData, evidenceFileName: fileName || 'evidence_file.pdf' });
    setNewComplaint(result);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  if (submitted && newComplaint) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
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
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Submit Cyber Complaint</h1>
      
      <div className="bg-surface rounded-xl border border-slate-700 p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
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
    </div>
  );
}
