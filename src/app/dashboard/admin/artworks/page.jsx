"use client"

import { useState, useEffect } from 'react';

export default function AdminArtworksPage() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        description: '',
        image: '',
        tags: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/allartwork');
            const data = await response.json();
            setArtworks(data);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        } finally {
            setLoading(false);
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
        setSubmitting(true);
        setMessage('');

        try {
            // Convert tags string to array
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            const artworkData = {
                ...formData,
                tags: tagsArray,
                createdAt: new Date().toISOString()
            };

            const response = await fetch('/api/allartwork', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artworkData),
            });

            if (response.ok) {
                setMessage('Artwork added successfully!');
                setFormData({
                    title: '',
                    slug: '',
                    category: '',
                    description: '',
                    image: '',
                    tags: ''
                });
                setShowForm(false);
                fetchArtworks();
            } else {
                const error = await response.json();
                setMessage(`Error: ${error.error || 'Failed to add artwork'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Artworks</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New Artwork'}
                </button>
            </div>

            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    <span>{message}</span>
                </div>
            )}

            {/* Add Artwork Form */}
            {showForm && (
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body">
                        <h3 className="card-title">Add New Artwork</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Slug *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                        placeholder="midnight-stare"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category *</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="select select-bordered"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        <option value="Portrait">Portrait</option>
                                        <option value="Landscape">Landscape</option>
                                        <option value="Character Design">Character Design</option>
                                        <option value="Illustration">Illustration</option>
                                        <option value="Concept Art">Concept Art</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image URL *</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description *</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered h-24"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Tags (comma separated)</span>
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="anime, dark, portrait"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Adding...' : 'Add Artwork'}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-ghost"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artworks.map((artwork) => (
                    <div key={artwork._id} className="card bg-base-200 shadow-md">
                        <figure className="aspect-square">
                            <img 
                                src={artwork.image} 
                                alt={artwork.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-sm">{artwork.title}</h3>
                            <div className="badge badge-sm">{artwork.category}</div>
                            <p className="text-xs text-gray-500 line-clamp-2">{artwork.description}</p>
                            {artwork.tags && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {artwork.tags.map((tag, index) => (
                                        <span key={index} className="badge badge-xs badge-outline">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {artworks.length === 0 && !showForm && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No artworks yet. Add your first artwork!</p>
                </div>
            )}
        </div>
    );
}
