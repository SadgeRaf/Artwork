"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MyCommissionsPage() {
    const { data: session } = useSession();
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session) {
            fetchCommissions();
        }
    }, [session]);

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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Commissions</h2>
                <div className="badge badge-primary">{commissions.length} Total</div>
            </div>

            {commissions.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">You haven't submitted any commissions yet.</p>
                    <a href="/commission" className="btn btn-primary">
                        Request a Commission
                    </a>
                </div>
            ) : (
                <div className="grid gap-4">
                    {commissions.map((commission) => (
                        <div key={commission._id} className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="card-title">{commission.projectType || 'Commission Request'}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Submitted: {new Date(commission.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`badge ${getStatusBadge(commission.status)}`}>
                                        {commission.status}
                                    </div>
                                </div>
                                
                                <div className="mt-4 space-y-2">
                                    <p><strong>Name:</strong> {commission.name}</p>
                                    <p><strong>Email:</strong> {commission.email}</p>
                                    {commission.budget && (
                                        <p><strong>Budget:</strong> {commission.budget}</p>
                                    )}
                                    {commission.deadline && (
                                        <p><strong>Deadline:</strong> {new Date(commission.deadline).toLocaleDateString()}</p>
                                    )}
                                    <div>
                                        <strong>Description:</strong>
                                        <p className="mt-1 text-sm">{commission.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
