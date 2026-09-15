# CyberTrace - Blockchain-Based Cyber Complaint Tracking System

A modern, secure web application prototype for reporting and tracking cybercrime complaints with blockchain integration for tamper-evident records.

## Features

- **User Roles:** Citizens and Officers dashboard.
- **Complaint Submission:** Upload evidence which gets cryptographically hashed.
- **Transparent Tracking:** Users can track the status of their complaints using a Complaint ID.
- **Officer Dashboard:** Officers can update complaint status (Submitted → Verified → Under Investigation → Resolved).
- **Blockchain Verification:** View immutable record details, transaction hashes, and evidence verification.

## Project Structure

```
cyber-complaint-tracker/
├── frontend/       # Vite + React + Tailwind CSS
├── backend/        # Express.js backend (Placeholder)
└── blockchain/     # Smart Contracts (Solidity)
```

## Running the Application

### Frontend (UI Prototype)
The frontend uses local storage to simulate backend API and blockchain interactions for the purpose of demonstrations.

```bash
cd frontend
npm install
npm run dev
```

### Stack
- React 18
- React Router DOM
- Tailwind CSS 4.0
- Lucide React (Icons)
