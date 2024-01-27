import React from 'react'
import "./descriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
      <div className="descriptionBox-navigator">
        <div className="description-nav-box">Description</div>
         <div className="description-nav-box fade"> Reviews (125)</div>
      </div>
      <div className="descriptionBox-description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aspernatur placeat, est hic rem quod! Consequuntur voluptate nam optio explicabo, nesciunt aliquid ea similique corporis ullam aspernatur id ex temporibus!</p>
      </div>
    </div>
  )
}

export default DescriptionBox
