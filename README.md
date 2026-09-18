# 🛡️ CyberTrace

> **Blockchain-Based Cyber Complaint Tracking System**

A modern, secure, and decentralized web application prototype designed to bring transparency and security to cybercrime reporting. CyberTrace allows citizens to securely file cyber complaints, upload evidence, and track their case status in real-time, all while simulating immutable blockchain records to prevent evidence tampering.

---

## ✨ Features

- **👮 Role-Based Dashboards**: Dedicated interfaces for Citizens (to file and track) and Officers (to manage and investigate).
- **🔒 Tamper-Evident Records**: Uploaded evidence is securely hashed (SHA-256) simulating a smart contract ledger recording to guarantee immutability.
- **📊 Real-Time Tracking**: Visual timeline tracking of complaint status (Submitted → Verified → Under Investigation → Resolved).
- **⛓️ Blockchain Verification**: Dedicated verification page displaying Transaction Hashes, Block Numbers, and Cryptographic Evidence Hashes.
- **🎨 Modern UI/UX**: Responsive, dark-themed cybersecurity interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS 4.0
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Blockchain Mock:** Solidity Smart Contracts (Concept) & LocalStorage for Demo purposes

---

## 🚀 Getting Started

To run this project locally for development or demonstration:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adityadhakarge/CyberTrace.git
   cd CyberTrace
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173/`

---

## 📱 Application Flow

1. **Citizen Portal**: Users register/login and file a detailed complaint including the incident category, date, and evidence files.
2. **Hash Generation**: The system simulates generating a secure SHA-256 hash of the evidence and a Blockchain Transaction Hash.
3. **Officer Portal**: Law Enforcement officers log in to view the queue of pending cases and update their investigation statuses.
4. **Verification**: Anyone with the specific `Complaint ID` can look up the immutable blockchain metadata of the incident.

---

## 📂 Project Structure

```text
cyber-complaint-tracker/
├── frontend/             # React application (UI/UX)
│   ├── src/
│   │   ├── components/   # Reusable UI elements (Navbar, Cards)
│   │   ├── pages/        # Main route pages (Dashboards, Forms)
│   │   └── services/     # Simulated API & Blockchain logic
├── blockchain/           # Smart Contracts (Solidity concept)
└── backend/              # Placeholder for future Express.js integration
```

---
*Created as a college project to demonstrate the application of blockchain technology in modern cybersecurity and law enforcement systems.*
