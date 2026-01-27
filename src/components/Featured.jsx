import React from 'react'
import ArtworkCard from './cards/ArtworkCard';

const getArtwork = async () => {
  const res = await fetch("http://localhost:3000/api/featuredArtwork")
  return await res.json();
}

export default async function Featured() {
  const artworks = await getArtwork();
  return (
    <div>
      <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8'>
        {
          artworks.map(artwork=><ArtworkCard key={artwork._id} artwork={artwork}></ArtworkCard>)
        }
      </div>
    </div>
  )
}
