"use client"

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { fadeInUp, staggerChildren } from '../../../lib/animations';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingProfile, setFetchingProfile] = useState(true);
    
    const containerRef = useRef(null);

    useEffect(() => {
        if (session) {
            fetchProfile();
        }
    }, [session]);
    
    useEffect(() => {
        if (!fetchingProfile && containerRef.current) {
            fadeInUp(containerRef.current);
        }
    }, [fetchingProfile]);

    const fetchProfile = async () => {
        try {
            setFetchingProfile(true);
            const response = await fetch('/api/user/profile');
            
            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({
                    ...prev,
                    name: data.user.name || '',
                    email: data.user.email || ''
                }));
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setFetchingProfile(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        // Validate passwords match
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const updateData = {
                name: formData.name
            };

            // Only include password fields if user is changing password
            if (formData.currentPassword && formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Profile updated successfully!');
                setMessage('');
                
                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                toast.error(data.error || 'Failed to update profile');
                setMessage('');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingProfile) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>

            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    <span>{message}</span>
                </div>
            )}

            <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title">Account Information</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                disabled
                            />
                            <label className="label">
                                <span className="label-text-alt">Email cannot be changed</span>
                            </label>
                        </div>

                        <div className="divider">Change Password</div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Current Password</span>
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title text-error">Danger Zone</h3>
                    <p className="text-sm text-gray-500">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="btn btn-error btn-outline mt-4">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
