import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-green-600 text-xl font-semibold animate-pulse">Loading Analytics...</div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center mt-10 text-red-500">Failed to load statistics.</div>;
  }

  // --- Chart Data Preparation ---

  // 1. Lead Pipeline (Status)
  const statusLabels = ['new', 'in_progress', 'closed'];
  const statusCounts = statusLabels.map(status => {
    const found = stats.leadsByStatus.find(item => item._id === status);
    return found ? found.count : 0;
  });

  const pipelineData = {
    labels: ['New', 'In Progress', 'Closed'],
    datasets: [
      {
        label: 'Leads',
        data: statusCounts,
        backgroundColor: ['#3B82F6', '#F59E0B', '#10B981'], // Blue, Orange, Green
        borderRadius: 6,
      },
    ],
  };

  const pipelineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false } }
    }
  };

  // 2. Lead Segments (Type)
  const typeLabels = stats.leadsByType.map(item => item._id.replace('_', ' '));
  const typeCounts = stats.leadsByType.map(item => item.count);
  
  const segmentsData = {
    labels: typeLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
    datasets: [
      {
        data: typeCounts,
        backgroundColor: [
            '#059669', // Emerald 600
            '#10B981', // Emerald 500
            '#34D399', // Emerald 400
            '#6EE7B7', // Emerald 300
        ],
        borderWidth: 0,
      },
    ],
  };

  const segmentsOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8 } },
    },
  };

  // 3. Trends Over Time (Line Chart)
  // Ensure we display last 30 days labels properly even if missing data points
  const timeLabels = stats.timeSeries.map(item => {
    const date = new Date(item._id);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });
  const timeCounts = stats.timeSeries.map(item => item.count);

  const trendsData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Daily Leads',
        data: timeCounts,
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const trendsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        mode: 'index', 
        intersect: false,
        backgroundColor: '#fff',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f3f4f6' } },
      x: { grid: { display: false } }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };


  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans text-gray-800">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your solar lead performance.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Leads */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Leads</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.totalLeads}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-green-600 font-bold flex items-center mr-1">
               Lifetime
            </span>
            volume
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">New This Week</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.newLeadsThisWeek}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-blue-600 font-bold flex items-center mr-1">
              Active
            </span>
            recent growth
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Conversion Rate</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.conversionRate}%</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
           <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-yellow-600 font-bold flex items-center mr-1">
              Closed
            </span>
            / Total Leads
          </div>
        </div>

         {/* Needs Attention */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Needs Attention</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.leadsNeedingAttention}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
           <div className="mt-4 flex items-center text-xs text-gray-500">
            <span className="text-red-600 font-bold flex items-center mr-1">
              New Status
            </span>
            pending action
          </div>
        </div>

      </div>

      {/* Main Grid: Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Lead Funnel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Lead Pipeline</h3>
            <div className="h-64">
                <Bar options={pipelineOptions} data={pipelineData} />
            </div>
        </div>

        {/* Middle: Lead Segments */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Lead Segments</h3>
            <div className="h-64 flex justify-center">
                <Doughnut options={segmentsOptions} data={segmentsData} />
            </div>
        </div>

        {/* Right: Recent Enquiries */}
         <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Latest Enquiries</h3>
                <button 
                  onClick={() => navigate('/enquiries')}
                  className="text-xs text-green-600 hover:text-green-700 font-semibold"
                >
                  View All
                </button>
            </div>
            
            <div className="flex-1 overflow-auto">
                {stats.recentLeads && stats.recentLeads.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentLeads.map(lead => (
                            <div 
                                key={lead._id} 
                                onClick={() => navigate(`/enquiries/${lead._id}`)}
                                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm
                                    ${lead.leadType === 'commercial' ? 'bg-blue-100 text-blue-600' : 
                                      lead.leadType === 'housing_society' ? 'bg-purple-100 text-purple-600' : 
                                      'bg-green-100 text-green-600'}`
                                }>
                                   {lead.leadType === 'commercial' ? '🏢' : lead.leadType === 'housing_society' ? '🏙️' : '🏠'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-green-700">{lead.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{lead.leadType?.replace('_', ' ')} • {new Date(lead.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full font-medium
                                    ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                      lead.status === 'in_progress' ? 'bg-orange-100 text-orange-700' :
                                      'bg-green-100 text-green-700'}`
                                }>
                                    {lead.status}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-4">No recent enquiries found.</p>
                )}
            </div>
        </div>

      </div>

      {/* Bottom: Trends */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Leads Over Time (30 Days)</h3>
         </div>
         <div className="h-72 w-full">
            <Line options={trendsOptions} data={trendsData} />
         </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
