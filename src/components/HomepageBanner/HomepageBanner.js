import React from 'react'
import FeaturedCarousel from '../FeaturedCarousel/FeaturedCarousel'
import StarMan from '../../assets/mrstar.png'
import './HomepageBanner.css'

function HomepageBanner(){
    return(
        <div className= 'homepage-banner-container'>
            <div>
            <FeaturedCarousel />
            <img className="starman-image" alt="star man" src={StarMan}/>
            </div>
        </div>
    )
}

export default HomepageBanner