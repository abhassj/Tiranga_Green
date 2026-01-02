import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('adminToken');
  
  // In a real app, you might decode the token to check expiration
  // or verify with backend. For now, simple presence check.
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
