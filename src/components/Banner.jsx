import React from 'react'
import NextJsCarousel from './NextJsCarousel'
import Link from 'next/link'

export default function Banner() {
  return (
    <div
  className="hero min-h-screen">
  <NextJsCarousel></NextJsCarousel>

  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-black">Hello there</h1>
      <p className="mb-5">
        
      </p>
      <Link href='/allart'><button className="btn btn-primary">Get Started</button></Link>
    </div>
  </div>
</div>
  )
}
