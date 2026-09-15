import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetails from './pages/ComplaintDetails';
import TrackComplaint from './pages/TrackComplaint';
import OfficerDashboard from './pages/OfficerDashboard';
import BlockchainStatus from './components/BlockchainStatus';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/submit-complaint" element={<SubmitComplaint />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/officer-dashboard" element={<OfficerDashboard />} />
            <Route path="/blockchain/:id" element={<BlockchainStatus />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
