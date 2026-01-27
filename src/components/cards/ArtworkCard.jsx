import React from 'react';
import Image from 'next/image'; // If using Next.js
import Link from 'next/link';

const ArtworkCard = ({ artwork }) => {
    const { 
        _id, 
        title, 
        slug, 
        category, 
        description, 
        image, 
        tags 
    } = artwork;

    return (
        <div className="artwork-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
                {image ? (
                    // If using Next.js Image component
                    <Image 
                        src={image} 
                        alt={title} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    // If using regular img tag:
                    // <img 
                    //     src={image} 
                    //     alt={title} 
                    //     className="w-full h-full object-cover"
                    // />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags?.map((tag, index) => (
                        <span 
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                
                {/* View Details Button/Link */}
                <div className="pt-4 border-t border-gray-100">
                    <Link 
                        href={`/artwork/${_id}`}
                        className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors"
                    >
                        View Details
                        <svg 
                            className="w-4 h-4 ml-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;