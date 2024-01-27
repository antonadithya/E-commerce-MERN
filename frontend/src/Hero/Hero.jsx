import React from 'react'
import "./hero.css"
import hand_icon from "../assets/hand_icon.png"
import arrow_icon from "../assets/arrow.png"
import hero_img from "../assets/hero_image.png"

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
             <h2> NEW ARRIVALS ONLY</h2>
             <div>
               <div className="hero-hand-icon">
                 <p>New</p>
                 <img src={hand_icon} alt="hand_icon" />
               </div>
               <p>Collection</p>
               <p>For Everyone</p>
             </div>
            
            <div className="hero-latest-btn">
              <div> Latest collection</div>
              <img src={arrow_icon} alt="" />
            </div>

          </div>

            
        <div className="hero-right">
           <img src={hero_img} alt="hero-img" />
        </div>
        
    </div>
  )
}

export default Hero
