import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import OurServices from './pages/OurServices'

import Projects from './pages/Projects'
import Commercial from './pages/Commercial'
import HousingSocieties from './pages/HousingSocieties'
import Legal from './pages/Legal'
import Terms from './pages/Terms'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-[80px]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<OurServices />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/commercial' element={<Commercial />} />
          <Route path='/housing-societies' element={<HousingSocieties />} />
          <Route path='/legal' element={<Legal />} />
          <Route path='/terms-conditions' element={<Terms />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
