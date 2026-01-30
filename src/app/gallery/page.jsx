import ArtworkCard from '../../components/cards/ArtworkCard';
import React from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const getAllArtworks = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/allartwork`)
    const data = await res.json();
    return data;
}

const page = async () => {

    const allArtworks = await getAllArtworks();

    return (
        <div>
            <h1 className='text-purple-500 font-extrabold flex justify-center mb-6 text-3xl'>My Works!!!</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8 mb-8'>
                {
                    allArtworks.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork}></ArtworkCard>)
                }
            </div>
        </div>
    );
};

export default page;