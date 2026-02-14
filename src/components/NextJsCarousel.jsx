"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const NextJsCarousel = () => {
    return (
        <div className="relative min-h-screen min-w-screen">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showStatus={false}
                stopOnHover={false}
                emulateTouch={true}
                swipeable={true}
                showThumbs={false}
            >
                <div className="relative h-screen w-full flex items-center justify-center bg-black/10">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src="/3.png" 
                            alt="image1" 
                            fill
                            className="object-contain p-4"
                            priority
                        />
                    </div>
                </div>
                <div className="relative h-screen w-full flex items-center justify-center bg-black/10">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src="/2.png" 
                            alt="image2" 
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                </div>
                <div className="relative h-screen w-full flex items-center justify-center bg-black/10">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src="/1.png" 
                            alt="image2" 
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                </div>
                <div className="relative h-screen w-full flex items-center justify-center bg-black/10">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src="/4.png" 
                            alt="image2" 
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                </div>
                <div className="relative h-screen w-full flex items-center justify-center bg-black/10">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src="/5.png" 
                            alt="image2" 
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default NextJsCarousel;