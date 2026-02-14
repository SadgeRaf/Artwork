import React from 'react'
import FeaturedClient from './FeaturedClient'

const getArtwork = async () => {
   try {
    // Use relative URL - works in both dev and production
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/featuredArtwork`, {
        cache: 'no-store'
    })
    
    if (!res.ok) {
        throw new Error(`Failed to fetch featured artworks: ${res.status}`)
    }
    
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching featured artworks:', error)
    return []; 
  }
}

export default async function Featured() {
  const artworks = await getArtwork();
  return <FeaturedClient artworks={artworks} />
}