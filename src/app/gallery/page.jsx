"use client"

import ArtworkCard from '../../components/cards/ArtworkCard';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fadeInUp, staggerChildren } from '../../lib/animations';
import GalleryLoading from './loading';

// Items per page for pagination
const ITEMS_PER_PAGE = 4;

const Page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || '';
    const [allArtworks, setAllArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [displayedArtworks, setDisplayedArtworks] = useState([]);
    
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    
    useEffect(() => {
        if (titleRef.current) fadeInUp(titleRef.current);
    }, []);
    
    useEffect(() => {
        if (!loading && gridRef.current && displayedArtworks.length > 0) {
            staggerChildren(gridRef.current, '.artwork-card-item', 0.1);
        }
    }, [loading, displayedArtworks]);

    // Fetch all artworks once
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                setLoading(true);
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                
                const res = await fetch(`${baseUrl}/api/allartwork`, {
                    cache: 'no-store'
                });
                
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                
                const data = await res.json();
                setAllArtworks(data || []);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    // Filter artworks based on search
    useEffect(() => {
        if (!allArtworks.length) return;
        
        if (!query) {
            setFilteredArtworks(allArtworks);
        } else {
            const searchLower = query.toLowerCase();
            const filtered = allArtworks.filter(item => 
                item.title?.toLowerCase().includes(searchLower) ||
                item.category?.toLowerCase().includes(searchLower) ||
                item.description?.toLowerCase().includes(searchLower) ||
                item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
            );
            setFilteredArtworks(filtered);
        }
        
        // Reset pagination when search changes
        setPage(1);
        setDisplayedArtworks([]);
        setHasMore(true);
    }, [allArtworks, query]);

    // Load more items for infinite scroll
    const loadMoreArtworks = useCallback(() => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const nextItems = filteredArtworks.slice(startIndex, endIndex);
        
        setDisplayedArtworks(prev => [...prev, ...nextItems]);
        
        // Check if there are more items to load
        if (endIndex >= filteredArtworks.length) {
            setHasMore(false);
        } else {
            setPage(prev => prev + 1);
        }
    }, [page, filteredArtworks]);

    // Initial load
    useEffect(() => {
        if (filteredArtworks.length > 0 && displayedArtworks.length === 0) {
            loadMoreArtworks();
        }
    }, [filteredArtworks, loadMoreArtworks]);

    if (loading && allArtworks.length === 0) {
        return (
            <div className="min-h-screen">
                <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>
                <SearchBar />
                <GalleryLoading></GalleryLoading>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <h1 ref={titleRef} className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>
            
            <SearchBar />
            
            {/* Search info */}
            {query && (
                <div className="text-center mb-6">
                    <p className="text-gray-600">
                        Found {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} 
                        {query && ` for "${query}"`}
                    </p>
                </div>
            )}
            
            {/* Infinite Scroll Container */}
            <InfiniteScroll
                dataLength={displayedArtworks.length}
                next={loadMoreArtworks}
                hasMore={hasMore}
                loader={
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="text-gray-600 mt-2">Loading more...</p>
                    </div>
                }
                endMessage={
                    displayedArtworks.length > 0 && (
                        <div className="text-center py-8 border-t">
                            <p className="text-gray-500">You've seen all {filteredArtworks.length} artworks!</p>
                        </div>
                    )
                }
                scrollThreshold={0.8}
            >
                {/* Artworks Grid */}
                {displayedArtworks.length > 0 ? (
                    <div ref={gridRef} className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8 mb-8'>
                        {displayedArtworks.map(artwork => (
                            <div key={artwork._id} className="artwork-card-item">
                                <ArtworkCard artwork={artwork} />
                            </div>
                        ))}
                    </div>
                ) : !loading && (
                    <div className="text-center py-12">
                        {query ? (
                            <>
                                <p className="text-gray-600 text-lg">No artworks found for "{query}"</p>
                                <p className="text-gray-500 mt-2">Try a different search term</p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 text-lg">No artworks available at the moment.</p>
                                <p className="text-gray-500 mt-2">Please check back later!</p>
                            </>
                        )}
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
};

export default Page;