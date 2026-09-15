const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy complaint data
let complaints = [];

// Routes
app.get('/api/complaints', (req, res) => {
  res.json(complaints);
});

app.post('/api/complaints', (req, res) => {
  const newComplaint = {
    ...req.body,
    id: `CC-${new Date().getFullYear()}-${String(complaints.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    status: 'Submitted'
  };
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

app.put('/api/complaints/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const complaint = complaints.find(c => c.id === id);
  
  if (complaint) {
    complaint.status = status;
    res.json(complaint);
  } else {
    res.status(404).json({ error: 'Complaint not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
