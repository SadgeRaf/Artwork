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
                <div>
                    <Image src="/3.png" alt="image1" width={300} height={300} />

                    <p className="legend">
                        Image 1
                    </p>
                </div>
                <div>
                    <Image src="/2.png" alt="image1" fill />

                    <p className="legend">
                        Image 2
                    </p>
                </div>
                <div>
                    <Image src="/1.png" alt="image1" fill />

                    <p className="legend">
                        Image 3
                    </p>
                </div>
                <div>
                    <Image src="/4.png" alt="image1" fill />

                    <p className="legend">
                        Image 4
                    </p>
                </div>
                <div>
                    <Image src="/5.png" alt="image1" fill />

                    <p className="legend">
                        Image 5
                    </p>
                </div>
            </Carousel>
        </div>
    );
};

export default NextJsCarousel;