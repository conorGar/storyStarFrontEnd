import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import './FeaturedCarousel.css'
import BeetleSteveImg from '../../assets/projectTemplate_beetle.jpg';
import AlmostSomebodyImg from '../../assets/seriesBanner.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";


function FeaturedCarousel(){
    return(
        <div>
            <Carousel showThumbs={false} autoPlay={true} className='featured-carousel'>
                <div>
                    <img alt="featured-carousel-story" src={BeetleSteveImg} />
                </div>
                <div>
                <img alt="featured-carousel-story" src={AlmostSomebodyImg} />

                </div>
            </Carousel>

        </div>
    )
}


export default FeaturedCarousel;