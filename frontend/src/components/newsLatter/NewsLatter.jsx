import React from 'react'
import "./newsLatter.css"


const NewsLatter = () => {
  return (
    <div className='newsletters'>
       <h1>Get Exclusive Offers on Your Email </h1>
       <p>Subscribe to our newsLatter and stay updated</p>
       <div>
        <input type="Email" placeholder='  Type you ara Email' />
        <button>Subscribe</button>
       </div>
    </div>
  )
}

export default NewsLatter
