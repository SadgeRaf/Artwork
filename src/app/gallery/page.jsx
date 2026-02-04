import ArtworkCard from '../../components/cards/ArtworkCard';
import React from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Art Gallery - Browse All Artworks",
  description: "Browse Raf's complete collection of digital artworks including portraits, anime-style illustrations, character designs, and custom commissioned pieces.",
  keywords: ["art gallery", "digital artwork collection", "anime illustrations", "portrait gallery", "character art", "commissioned artwork"],
  openGraph: {
    title: "Art Gallery - Browse All Artworks | Rafs Artworks",
    description: "Browse Raf's complete collection of digital artworks including portraits, anime-style illustrations, and character designs.",
    images: ['/og-gallery.jpg'],
  },
  twitter: {
    title: "Art Gallery - Browse All Artworks | Rafs Artworks",
    description: "Browse Raf's complete collection of digital artworks including portraits and anime-style illustrations.",
  },
}

const getAllArtworks = async () => {
    try {
        // Use relative URL for internal API calls in production
        const baseUrl = process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}` 
            : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        
        const res = await fetch(`${baseUrl}/api/allartwork`, {
            cache: 'no-store' // Ensure fresh data
        })
        
        if (!res.ok) {
            throw new Error(`Failed to fetch artworks: ${res.status}`)
        }
        
        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return []; // Return empty array on error
    }
}

const page = async () => {
    try {
        const allArtworks = await getAllArtworks();

        return (
            <div>
                <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>

                {allArtworks.length > 0 ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8 mb-8'>
                        {
                            allArtworks.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork}></ArtworkCard>)
                        }
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No artworks available at the moment.</p>
                        <p className="text-gray-500 mt-2">Please check back later!</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Gallery page error:', error)
        return (
            <div className="text-center py-12">
                <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>
                <div className="text-center py-12">
                    <p className="text-red-600 text-lg">Unable to load artworks at the moment.</p>
                    <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
                </div>
            </div>
        )
    }
};

export default page;