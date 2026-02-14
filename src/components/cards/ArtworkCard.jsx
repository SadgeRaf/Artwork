"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { hoverScale } from '../../lib/animations';

const ArtworkCard = ({ artwork }) => {
    const cardRef = useRef(null);
    
    useEffect(() => {
        if (cardRef.current) {
            hoverScale(cardRef.current);
        }
    }, []);
    
    const { 
        _id, 
        title, 
        category, 
        description, 
        image, 
        tags 
    } = artwork;

    return (
        <Link href={`/artwork/${_id}`} className="hover-3d block w-full">
            {/* 3D Card - Full width for grid */}
            <div 
                ref={cardRef} 
                className="card w-full bg-black text-white 
                         bg-[radial-gradient(circle_at_bottom_left,#ffffff08_35%,transparent_36%),
                                 radial-gradient(circle_at_top_right,#ffffff08_35%,transparent_36%)] 
                         bg-[length:4.95em_4.95em]
                         rounded-2xl overflow-hidden
                         transition-all duration-300
                         hover:shadow-2xl hover:shadow-blue-500/10"
            >
                {/* Image Section - Taller for wide cards */}
                <figure className="relative h-64 w-full">
                    {image ? (
                        <Image 
                            src={image} 
                            alt={title} 
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-gray-500 text-lg">No image</span>
                        </div>
                    )}
                    
                    {/* Category Badge - Bank card style */}
                    <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-black/60 backdrop-blur-sm text-xs font-mono uppercase tracking-wider rounded-lg border border-white/20">
                            {category || 'ARTWORK'}
                        </span>
                    </div>
                </figure>

                {/* Card Body - More padding for wide cards */}
                <div className="p-6 space-y-4">
                    {/* Header with decorative element */}
                    <div className="flex justify-between items-center">
                        <div className="font-mono text-xs tracking-wider text-gray-400">
                            {category ? category.toUpperCase() : 'COLLECTION'}
                        </div>
                        <div className="text-6xl opacity-5 select-none">✦</div>
                    </div>

                    {/* Title - Larger for wide cards */}
                    <div className="text-2xl font-bold font-mono tracking-tight line-clamp-1">
                        {title || 'UNTITLED'}
                    </div>

                    {/* Description */}
                    <div className="text-sm text-gray-300 font-light line-clamp-2">
                        {description || 'No description available'}
                    </div>

                    {/* Tags - Bank card chip aesthetic */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tags.slice(0, 3).map((tag, index) => (
                                <span 
                                    key={index}
                                    className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Card Footer - Bank card format with better spacing for wide cards */}
                    <div className="flex justify-between items-end pt-4 mt-2 border-t border-white/10">
                        <div className="space-y-1">
                            <div className="text-xs font-mono text-gray-500 tracking-wider">ARTWORK ID</div>
                            <div className="font-mono text-lg tracking-[0.25em] text-gray-300">
                                {_id ? _id.slice(-8).toUpperCase() : 'XXXXXXXX'}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-mono text-gray-500 tracking-wider mb-1">VIEW</div>
                            <div className="flex items-center gap-2 text-blue-400 font-mono text-lg">
                                <span>DETAILS</span>
                                <span className="text-2xl leading-none">→</span>
                            </div>
                        </div>
                    </div>

                    {/* Magnetic stripe effect (optional) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                </div>
            </div>
            
            {/* 8 empty divs for 3D effect - keeping for hover-3d */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Link>
    );
};

export default ArtworkCard;