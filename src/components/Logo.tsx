import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'}>
        <Image className='rounded-3xl'
         alt=""
         src={'/pfp.png'}
         width={50}
         height={40}
        />
    </Link>
  )
}

export default Logo