import React from 'react'
import "./productDisplay.css"
import  star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png"
import {shopContext } from "../../context/ShopContext"
import { useContext } from "react"

const ProductDisplay = (props) => {

  const {product} = props
  const {addToCart} = useContext(shopContext);
  return (
    <div className='productDisplay'>

      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt="" />
           <img src={product.image} alt="" />
            <img src={product.image} alt="" />
             <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-img"></div>
           <img src={product.image} alt=""  className='product-display-main-img'/>
      </div>

      <div className="productDisplay-right">
          <h1>{product.name}</h1>
          <div className="productDisplay-right-stars">
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_dull_icon} alt="" />
              <p>(122)</p>
          </div>
          <div className="productDisplay-right-price">
            <div className="productDisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productDisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>  
          <div className="productDisplay-right-description">
             Explore fashion-forward T-shirts at Trendy Threads Emporium. From timeless classics to the latest trends, our high-quality tees offer comfort and style. Elevate your wardrobe effortlessly. Shop now for secure transactions and swift delivery.
          </div>
          <div className="productDisplay-right-size">
             <h1> Select Size</h1>
             <div className='productDisplay-right-sizes'>
                 <div>S</div>
                 <div>M</div>
                 <div>L</div>
                 <div>XL</div>
                 <div>XXL</div>
             </div>
          </div>
            <button onClick={()=> { addToCart(product.id)}}>ADD TO CARD</button>
            <p className='productDisplay-right-category'>
              <span>Category :</span> Women, T-Shirt, Crop Tap
            </p>
            <p className='productDisplay-right-category'>
              <span>Tags :</span> Modern, Latest, 
            </p>
      </div>

    </div>
  )
}

export default ProductDisplay
