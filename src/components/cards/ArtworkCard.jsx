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
        <Link href={`/artwork/${_id}`} className="hover-3d my-12 mx-2 cursor-pointer block">
            {/* 3D Card - Made wider (changed from w-96 to w-[400px] or w-full) */}
            <div ref={cardRef} className="card w-full max-w-md bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
                
                {/* Image Section - Made taller to match proportions */}
                <figure className="relative h-56 w-full">
                    {image ? (
                        <Image 
                            src={image} 
                            alt={title} 
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                        </div>
                    )}
                </figure>

                {/* Card Body */}
                <div className="card-body">
                    {/* Header with Category */}
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-sm uppercase tracking-wider text-gray-300">
                            {category}
                        </div>
                        <div className="text-5xl opacity-10">❁</div>
                    </div>

                    {/* Title */}
                    <div className="text-xl font-bold mb-2 line-clamp-1">
                        {title}
                    </div>

                    {/* Description */}
                    <div className="text-sm opacity-70 mb-4 line-clamp-2">
                        {description}
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 3).map((tag, index) => (
                                <span 
                                    key={index}
                                    className="text-xs bg-white/10 px-3 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Card Footer - Mimicking bank card format */}
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <div className="text-xs opacity-40">ARTWORK ID</div>
                            <div className="font-mono text-sm">{_id.slice(-8).toUpperCase()}</div>
                        </div>
                        <div>
                            <div className="text-xs opacity-40">VIEW</div>
                            <div className="text-sm">DETAILS →</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 8 empty divs needed for the 3D effect */}
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