import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LeadList from './pages/LeadList';
import LeadDetail from './pages/LeadDetail';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/enquiries" element={<LeadList />} />
            <Route path="/enquiries/:id" element={<LeadDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
