import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const LeadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('');
    
    // Reply State
    const [showReply, setShowReply] = useState(false);
    const [replySubject, setReplySubject] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await api.get(`/enquiries/${id}`);
                setLead(res.data.data);
                setNotes(res.data.data.internalNotes || '');
                setStatus(res.data.data.status);
            } catch (err) {
                toast.error('Failed to load enquiry');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    // Update Initials when lead loads
    useEffect(() => {
        if (lead) {
            setReplySubject(`Re: Your enquiry regarding ${lead.leadType?.replace('_', ' ')}`);
        }
    }, [lead]);

    const handleUpdate = async () => {
        try {
            await api.patch(`/enquiries/${id}`, {
                internalNotes: notes,
                status
            });
            toast.success('Updated successfully');
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
            try {
                await api.delete(`/enquiries/${id}`);
                toast.success('Deleted successfully');
                navigate('/enquiries');
            } catch (err) {
                toast.error('Delete failed');
            }
        }
    };

    const handleReply = async () => {
        if (!replyMessage.trim()) {
            toast.error('Please enter a message');
            return;
        }

        setSendingReply(true);
        try {
            await api.post(`/enquiries/${id}/reply`, {
                subject: replySubject,
                message: replyMessage
            });
            toast.success('Reply sent successfully!');
            setReplyMessage('');
            setShowReply(false);
            
            // Refresh logic
            const res = await api.get(`/enquiries/${id}`);
            setLead(res.data.data); // Update lead to potentially show new logs if we had them
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to send reply');
        } finally {
            setSendingReply(false);
        }
    };
    
    const handleCopyInfo = () => {
        const info = `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nCity: ${lead.city}`;
        navigator.clipboard.writeText(info);
        toast.success('Contact info copied to clipboard');
    };

    const handleLogCall = async () => {
        const timestamp = new Date().toLocaleString();
        const newNote = notes ? `${notes}\n[Call Logged - ${timestamp}]` : `[Call Logged - ${timestamp}]`;
        setNotes(newNote);
        toast.success('Call log added to notes. Click Update to save.');
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-green-600 animate-pulse">Loading Profile...</div>;
    if (!lead) return <div className="p-8 text-center text-red-500">Enquiry not found</div>;

    const initials = lead.name ? lead.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'NA';

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans text-gray-800">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/enquiries')} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Enquiry Details</h1>
                        <p className="text-sm text-gray-500">Manage lead profile and interactions</p>
                    </div>
                </div>
                <div className="flex gap-3">
                     <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                    <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Left Column: Lead Profile (Sticky) */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-8 flex flex-col gap-6">
                    
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-green-500/10 to-blue-500/10 z-0"></div>
                        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-gray-700 relative z-10 mb-4">
                            {initials}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 relative z-10">{lead.name}</h2>
                        <p className="text-gray-500 mb-6 relative z-10">{lead.companyName || 'Individual / Society'}</p>

                        {/* Quick Actions */}
                        <div className="flex gap-4 mb-8 relative z-10">
                            <a 
                                href={`tel:${lead.phone}`}
                                className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all cursor-pointer"
                                title="Call"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </a>
                            <a 
                                href={`mailto:${lead.email}`}
                                className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 hover:scale-110 transition-all cursor-pointer"
                                title="Email"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                             <button
                                onClick={handleCopyInfo}
                                className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all cursor-pointer"
                                title="Copy Details"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            </button>
                        </div>

                        {/* Badges Info */}
                        <div className="flex flex-wrap gap-2 justify-center relative z-10 w-full px-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 uppercase tracking-wide border border-green-200">
                                {lead.leadType?.replace('_', ' ')}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase tracking-wide border border-blue-200">
                                {lead.city || 'Unknown City'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 uppercase tracking-wide border border-orange-200">
                                Bill: {lead.avgMonthlyBill || 'NA'}
                            </span>
                             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border
                                ${status === 'new' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                                  status === 'in_progress' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                  'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                                {status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content Sections */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">

                     {/* 1. Summary Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Enquiry Summary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                                <p className="text-sm text-gray-600"><strong className="text-gray-900">Submitted via:</strong> {lead.source}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                                <p className="text-sm text-gray-600"><strong className="text-gray-900">Email:</strong> {lead.email || 'N/A'}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                                <p className="text-sm text-gray-600"><strong className="text-gray-900">Phone:</strong> {lead.phone}</p>
                            </div>
                             <div className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                                <p className="text-sm text-gray-600"><strong className="text-gray-900">Date:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
                            </div>
                             <div className="flex gap-4 items-center">
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                                <p className="text-sm text-green-700 font-medium">Consent Given: Yes</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Message</h4>
                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {lead.message || 'No additional message provided.'}
                            </p>
                        </div>
                    </div>

                    {/* 2. Internal Management Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Internal Notes & Actions</h3>

                        {/* Status Dropdown */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Current Status</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed - Won</option>
                                <option value="closed_lost">Closed - Lost</option>
                            </select>
                        </div>

                        {/* Notes Area */}
                        <div className="mb-6">
                             <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Admin Notes</label>
                                <span className="text-xs text-gray-400">{notes.length} chars</span>
                             </div>
                            <textarea
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
                                rows="4"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add internal notes, call logs, or follow-up tasks..."
                            ></textarea>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-gray-400">Last updated: {new Date(lead.updatedAt).toLocaleDateString()}</p>
                                <button
                                    onClick={handleUpdate}
                                    className="text-sm text-green-600 hover:text-green-700 font-bold hover:underline"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setShowReply(!showReply)}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-medium transition-all ${showReply ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {showReply ? 'Cancel Reply' : 'Send Reply'}
                            </button>
                            <button
                                onClick={handleLogCall}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Log Call
                            </button>
                        </div>
                        
                        {/* Reply Form Collapse */}
                        {showReply && (
                            <div className="mt-6 p-4 bg-gray-50 border border-green-200 rounded-xl animate-fade-in-down">
                                <h4 className="text-sm font-bold text-gray-700 mb-3">Compose Email Reply</h4>
                                <input
                                    type="text"
                                    className="w-full mb-3 p-3 border border-gray-200 rounded-lg text-sm bg-white"
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    placeholder="Subject"
                                />
                                <textarea
                                    className="w-full mb-3 p-3 border border-gray-200 rounded-lg text-sm bg-white"
                                    rows="4"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Write your message here..."
                                ></textarea>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleReply}
                                        disabled={sendingReply}
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                                    >
                                        {sendingReply ? 'Sending...' : 'Send Email'}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
