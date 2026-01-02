import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        )},
        { path: '/enquiries', label: 'Enquiries', icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )},
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="p-4 flex items-center justify-between bg-gray-800 h-16">
                     <span className="text-xl font-bold tracking-wide">Tiranga Admin</span>
                     <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link 
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        location.pathname.startsWith(item.path) 
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 hidden md:block">Admin Panel</h1>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                            A
                         </div>
                         <span className="text-sm font-medium text-gray-600 hidden md:block">Welcome, Admin</span>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
