import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import VerificationPage from './VerificationPage';
import ProtectedRoute from './ProtectedRoute';

interface Asset {
  cid: string;
  title: string;
  author: string;
  date: string;
  description: string;
}

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard assets={assets} setAssets={setAssets} />
            </ProtectedRoute>
          }
        />
        <Route path="/verify" element={<VerificationPage assets={assets} />} />
        <Route path="/" element={
          <div className="App">
            <h1>MemoryChain</h1>
            <p>Welcome to the future of memory.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;