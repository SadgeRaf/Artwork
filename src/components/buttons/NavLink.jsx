import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children, exact = false }) => {
    const path = usePathname();
    
    // For homepage (href === "/"), check exact match
    // For other pages, check if path starts with href
    const isActive = href === "/" 
        ? path === "/"  // Exact match for homepage
        : path.startsWith(href); // Starts with for other pages
    
    return (
        <Link 
            href={href} 
            className={`${isActive ? "text-purple-500 font-semibold" : "text-pink-500 hover:text-purple-500 transition-colors"}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;