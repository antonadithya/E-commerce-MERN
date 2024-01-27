import React, { useEffect, useState } from 'react'
import "./popular.css"
import Items from '../items/Items'

const Popular = () => {

   const [popularProducts ,setPopularProduct] = useState([]);

   useEffect(() => {
    fetch('http://localhost:4000/popularInWomen')
    .then((res) => res.json())
    .then((data) => {
      setPopularProduct(data)
    }
  
    
    )
   },[])

  return (

    <div className='popular'>
      <h1>POPULAR IN WOMAN</h1>
      <hr />
       <div className="popular-item">
         {popularProducts.map((item, i)=> {
            return <Items 
            key={i} 
            id={item.id}
            name={item.name} 
            img={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            />
         })}
       </div>
    </div>
  )
}

export default Popular
