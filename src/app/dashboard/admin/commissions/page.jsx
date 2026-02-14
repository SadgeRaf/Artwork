"use client"

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function AdminCommissionsPage() {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);

    useEffect(() => {
        fetchCommissions();
    }, []);

    const fetchCommissions = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/commission');
            
            if (!response.ok) {
                throw new Error('Failed to fetch commissions');
            }
            
            const data = await response.json();
            setCommissions(data);
            setError('');
        } catch (error) {
            setError(error.message);
            toast.error('Failed to load commissions');
        } finally {
            setLoading(false);
        }
    };

    const updateCommissionStatus = async (commissionId, newStatus) => {
        try {
            setUpdatingId(commissionId);
            
            const response = await fetch('/api/commission', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commissionId,
                    status: newStatus
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update local state
                setCommissions(prev => prev.map(commission => 
                    commission._id === commissionId 
                        ? { ...commission, status: newStatus }
                        : commission
                ));
                toast.success(`Commission marked as ${newStatus}`);
            } else {
                toast.error(data.error || 'Failed to update status');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Error updating commission');
        } finally {
            setUpdatingId(null);
        }
    };

    const fetchCommissionDetails = async (id) => {
        try {
            const response = await fetch(`/api/commission/${id}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch commission details');
            }
            
            const data = await response.json();
            setSelectedCommission(data);
            
            // Open modal or show details
            document.getElementById('commission_modal').showModal();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'badge-warning',
            'in-progress': 'badge-info',
            completed: 'badge-success',
            cancelled: 'badge-error'
        };
        return badges[status] || 'badge-ghost';
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'warning',
            'in-progress': 'info',
            completed: 'success',
            cancelled: 'error'
        };
        return colors[status] || 'ghost';
    };

    const filteredCommissions = commissions.filter(commission => {
        if (filter === 'all') return true;
        return commission.status === filter;
    });

    const stats = {
        total: commissions.length,
        pending: commissions.filter(c => c.status === 'pending').length,
        in_progress: commissions.filter(c => c.status === 'in-progress').length,
        completed: commissions.filter(c => c.status === 'completed').length,
        cancelled: commissions.filter(c => c.status === 'cancelled').length,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error: {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header with Refresh */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Commission Management</h2>
                <button 
                    onClick={fetchCommissions}
                    className="btn btn-primary btn-sm"
                    disabled={loading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="stat bg-base-100 rounded-lg shadow-sm border">
                    <div className="stat-title">Total</div>
                    <div className="stat-value text-3xl text-primary">{stats.total}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow-sm border border-warning/20">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-3xl text-warning">{stats.pending}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow-sm border border-info/20">
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value text-3xl text-info">{stats.in_progress}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow-sm border border-success/20">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value text-3xl text-success">{stats.completed}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow-sm border border-error/20">
                    <div className="stat-title">Cancelled</div>
                    <div className="stat-value text-3xl text-error">{stats.cancelled}</div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        className={`btn btn-sm ${filter === status ? `btn-${getStatusColor(status)}` : 'btn-ghost'}`}
                        onClick={() => setFilter(status)}
                    >
                        {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Commissions Table */}
            {filteredCommissions.length === 0 ? (
                <div className="text-center py-16 bg-base-100 rounded-lg border">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">No commissions found.</p>
                    <p className="text-sm text-gray-400 mt-2">Commissions will appear here once clients submit them.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-lg border">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Email</th>
                                <th>Project Type</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCommissions.map((commission) => (
                                <tr key={commission._id} className="hover">
                                    <td className="text-sm">
                                        {new Date(commission.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="font-medium">{commission.name}</td>
                                    <td className="text-sm">{commission.email}</td>
                                    <td>{commission.projectType || 'N/A'}</td>
                                    <td className="font-semibold">{commission.budget || 'N/A'}</td>
                                    <td>
                                        <div className={`badge ${getStatusBadge(commission.status)} gap-2`}>
                                            {updatingId === commission._id ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                commission.status
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => fetchCommissionDetails(commission._id)}
                                                className="btn btn-xs btn-ghost"
                                                title="View Details"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            
                                            {/* Status Update Dropdown */}
                                            <div className="dropdown dropdown-end">
                                                <button 
                                                    className="btn btn-xs btn-ghost"
                                                    disabled={updatingId === commission._id}
                                                    tabIndex={0}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                                    <li><button onClick={() => updateCommissionStatus(commission._id, 'pending')} className={commission.status === 'pending' ? 'active' : ''}>Pending</button></li>
                                                    <li><button onClick={() => updateCommissionStatus(commission._id, 'in-progress')} className={commission.status === 'in-progress' ? 'active' : ''}>In Progress</button></li>
                                                    <li><button onClick={() => updateCommissionStatus(commission._id, 'completed')} className={commission.status === 'completed' ? 'active' : ''}>Completed</button></li>
                                                    <li><button onClick={() => updateCommissionStatus(commission._id, 'cancelled')} className={commission.status === 'cancelled' ? 'active' : ''}>Cancelled</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Commission Details Modal */}
            <dialog id="commission_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    <h3 className="font-bold text-2xl mb-4">Commission Details</h3>
                    
                    {selectedCommission && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Client Name</p>
                                    <p className="font-semibold">{selectedCommission.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-semibold">{selectedCommission.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Project Type</p>
                                    <p className="font-semibold">{selectedCommission.projectType || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Budget</p>
                                    <p className="font-semibold">{selectedCommission.budget || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <div className={`badge ${getStatusBadge(selectedCommission.status)} mt-1`}>
                                        {selectedCommission.status}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Submitted On</p>
                                    <p className="font-semibold">
                                        {new Date(selectedCommission.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="divider">Project Details</div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="bg-base-200 p-4 rounded-lg">{selectedCommission.description || 'No description provided'}</p>
                            </div>

                            {selectedCommission.references && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">References</p>
                                    <p className="bg-base-200 p-4 rounded-lg">{selectedCommission.references}</p>
                                </div>
                            )}

                            <div className="divider">Status History</div>

                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">Last Updated</div>
                                <div className="text-sm">
                                    {selectedCommission.updatedAt 
                                        ? new Date(selectedCommission.updatedAt).toLocaleString()
                                        : new Date(selectedCommission.createdAt).toLocaleString()
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}