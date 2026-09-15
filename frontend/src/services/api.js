// Simulated backend API with localStorage

const initialComplaints = [
  {
    id: 'CC-2026-001',
    type: 'Online Fraud',
    subject: 'Unauthorized online transaction',
    description: 'My credit card was charged for $500 without my authorization on Amazon.',
    date: '2026-09-15',
    status: 'Under Investigation',
    evidenceHash: '7a8f92c81bc91',
    evidenceFileName: 'bank_statement_sept.pdf',
    transactionHash: '0x8a72f9b1c3d4e5f6',
    blockNumber: 1245,
    timestamp: '15-09-2026 10:30 AM',
    blockchainVerified: true
  },
  {
    id: 'CC-2026-002',
    type: 'Account Hacking',
    subject: 'Facebook account compromised',
    description: 'Someone changed my Facebook password and is sending spam to my friends.',
    date: '2026-09-14',
    status: 'Verified',
    evidenceHash: 'b5a29f8d1c9e',
    evidenceFileName: 'screenshots_messages.png',
    transactionHash: '0x1b2c3d4e5f6a7b8c',
    blockNumber: 1240,
    timestamp: '14-09-2026 09:15 AM',
    blockchainVerified: true
  },
  {
    id: 'CC-2026-003',
    type: 'Cyber Harassment',
    subject: 'Online stalking on Instagram',
    description: 'Receiving threatening messages from anonymous accounts.',
    date: '2026-09-10',
    status: 'Resolved',
    evidenceHash: 'd3f4a5b6c7d8',
    evidenceFileName: 'harassment_proof.jpg',
    transactionHash: '0x9f8e7d6c5b4a3f2e',
    blockNumber: 1200,
    timestamp: '10-09-2026 02:45 PM',
    blockchainVerified: true
  }
];

export const getComplaints = () => {
  const stored = localStorage.getItem('complaints');
  if (!stored) {
    localStorage.setItem('complaints', JSON.stringify(initialComplaints));
    return initialComplaints;
  }
  return JSON.parse(stored);
};

export const getComplaintById = (id) => {
  const complaints = getComplaints();
  return complaints.find(c => c.id === id);
};

export const addComplaint = (complaintData) => {
  const complaints = getComplaints();
  
  // Simulate Blockchain generation
  const newId = `CC-${new Date().getFullYear()}-${String(complaints.length + 1).padStart(3, '0')}`;
  
  // Use crypto for a realistic-looking mock hash based on filename and time
  const mockEvidenceHash = Array(12).fill(0).map(() => Math.random().toString(16)[2]).join('');
  const mockTxHash = '0x' + Array(16).fill(0).map(() => Math.random().toString(16)[2]).join('');
  
  const newComplaint = {
    id: newId,
    ...complaintData,
    status: 'Submitted',
    evidenceHash: mockEvidenceHash,
    transactionHash: mockTxHash,
    blockNumber: Math.floor(Math.random() * 1000) + 1000,
    timestamp: new Date().toLocaleString(),
    blockchainVerified: true
  };
  
  complaints.unshift(newComplaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));
  return newComplaint;
};

export const updateComplaintStatus = (id, newStatus) => {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index !== -1) {
    complaints[index].status = newStatus;
    localStorage.setItem('complaints', JSON.stringify(complaints));
    return complaints[index];
  }
  return null;
};
