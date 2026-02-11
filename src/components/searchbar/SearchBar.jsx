"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const debounceTimerRef = useRef(null);

    // Initialize input from URL - ONLY on initial load
    useEffect(() => {
        const query = searchParams.get("query") || '';
        setInputValue(query);
    }, []); // Empty dependency array - only run once on mount

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        // Clear any existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        // Set new timer for URL update
        debounceTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            
            if (value.trim()) {
                params.set('query', value);
            } else {
                params.delete('query');
            }
            
            router.replace(`${pathname}?${params.toString()}`);
        }, 500); // Increased debounce time
    };

    const handleClear = () => {
        setInputValue('');
        
        // Clear timer if exists
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        // Immediately update URL when clearing
        const params = new URLSearchParams(searchParams.toString());
        params.delete('query');
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Clear any pending debounce
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        // Immediate search on Enter key or button click
        const params = new URLSearchParams(searchParams.toString());
        
        if (inputValue.trim()) {
            params.set('query', inputValue);
        } else {
            params.delete('query');
        }
        
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto my-6">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>
                
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search gallery..."
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                />
                
                {/* Clear Button */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center 
                                 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Optional: Add a search button for explicit search */}
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;