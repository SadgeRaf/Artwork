import React from 'react'
import ArtworkCard from './cards/ArtworkCard';

const getArtwork = async () => {
  try {
    // Use relative URL for internal API calls in production
    const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const res = await fetch(`${baseUrl}/api/featuredArtwork`, {
        cache: 'no-store' // Ensure fresh data
    })
    
    if (!res.ok) {
        throw new Error(`Failed to fetch featured artworks: ${res.status}`)
    }
    
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching featured artworks:', error)
    return []; // Return empty array on error
  }
}

export default async function Featured() {
  try {
    const artworks = await getArtwork();
    
    return (
      <div>
        <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>

        {artworks.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8'>
            {
              artworks.map(artwork=><ArtworkCard key={artwork._id} artwork={artwork}></ArtworkCard>)
            }
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No featured artworks available at the moment.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Featured component error:', error)
    return (
      <div>
        <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>
        <div className="text-center py-8">
          <p className="text-red-600">Unable to load featured artworks.</p>
          <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    )
  }
}
