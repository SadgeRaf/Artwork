import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href, children}) => {
    const path = usePathname();
    return (
        <Link href={href} className={`${path.startsWith(href) && "text-purple-500"}`}>{children}</Link>
    );
};

export default NavLink;