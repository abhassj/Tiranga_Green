import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ leadType: '', status: '' });
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        ...filter,
        search
      };
      // Clean empty filters
      if (!params.leadType) delete params.leadType;
      if (!params.status) delete params.status;
      if (!params.search) delete params.search;

      const res = await api.get('/enquiries', { params });

      setLeads(res.data.data);
      if (res.data.total) {
          setTotalPages(Math.ceil(res.data.total / 10));
      }
    } catch (err) {
      toast.error('Failed to load leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, filter, search]); // Re-fetch when dependencies change

  const handleExport = async () => {
      try {
          const res = await api.get('/enquiries/export', { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Enquiries.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
      } catch (err) {
          console.error(err);
          toast.error('Export failed');
      }
  };
  
  // Note: Route for export in backend is /api/enquiries/export but api base is /api
  // Wait, in backend routes: router.get('/export', ...) mounted at /api/enquiries.
  // So it is /api/enquiries/export. Correct.

  return (
    <div className="p-2 md:p-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Enquiries</h2>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email, phone"
          className="border p-3 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-green-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-3 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-green-500 outline-none bg-white"
          value={filter.leadType}
          onChange={(e) => setFilter({ ...filter, leadType: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="housing_society">Housing Society</option>
          <option value="residential">Residential</option>
          <option value="general">General</option>
        </select>
        <select
          className="border p-3 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-green-500 outline-none bg-white"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : leads.length === 0 ? (
               <tr>
                <td colSpan="5" className="text-center py-4">No enquiries found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {lead.name}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap text-xs">
                           {lead.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">{lead.leadType?.replace('_', ' ')}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight text-white rounded-full 
                      ${lead.status === 'new' ? 'bg-blue-500' : 
                        lead.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}
                    >
                      <span className="relative capitalize">{lead.status?.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <Link
                      to={`/enquiries/${lead._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
              Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
             onClick={() => setPage(p => Math.min(totalPages, p + 1))}
             disabled={page === totalPages}
             className="px-4 py-2 border rounded disabled:opacity-50"
          >
              Next
          </button>
      </div>
    </div>
  );
};

export default LeadList;
