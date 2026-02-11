"use client"

import { useState, useEffect } from 'react';

export default function AdminCommissionsPage() {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

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
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'badge-warning',
            in_progress: 'badge-info',
            completed: 'badge-success',
            cancelled: 'badge-error'
        };
        return badges[status] || 'badge-ghost';
    };

    const filteredCommissions = commissions.filter(commission => {
        if (filter === 'all') return true;
        return commission.status === filter;
    });

    const stats = {
        total: commissions.length,
        pending: commissions.filter(c => c.status === 'pending').length,
        in_progress: commissions.filter(c => c.status === 'in_progress').length,
        completed: commissions.filter(c => c.status === 'completed').length,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <span>Error: {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">All Commissions</h2>

            {/* Stats */}
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">Total</div>
                    <div className="stat-value text-primary">{stats.total}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-warning">{stats.pending}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value text-info">{stats.in_progress}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value text-success">{stats.completed}</div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                <button 
                    className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button 
                    className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-ghost'}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button 
                    className={`btn btn-sm ${filter === 'in_progress' ? 'btn-info' : 'btn-ghost'}`}
                    onClick={() => setFilter('in_progress')}
                >
                    In Progress
                </button>
                <button 
                    className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-ghost'}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            {/* Commissions List */}
            {filteredCommissions.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No commissions found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCommissions.map((commission) => (
                                <tr key={commission._id}>
                                    <td>{new Date(commission.createdAt).toLocaleDateString()}</td>
                                    <td>{commission.name}</td>
                                    <td>{commission.email}</td>
                                    <td>{commission.projectType || 'N/A'}</td>
                                    <td>{commission.budget || 'N/A'}</td>
                                    <td>
                                        <div className={`badge ${getStatusBadge(commission.status)}`}>
                                            {commission.status}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-ghost">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
