import React from 'react'
import "./relatedProduct.css"
import data_product from "../assets/data"
import Item from "../items/Items"

const RelatedProduct = () => {
  return (
    <div className='relatedProducts'> 
      <h1> Related Product</h1>
      <hr />
      <div className="relatedProduct-item">
          {data_product.map((item ,i)=>{
      return <Item 
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

export default RelatedProduct
