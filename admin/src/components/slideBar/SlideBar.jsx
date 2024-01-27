import React from 'react'
import "./slideBar.css"
import {Link} from "react-router-dom"
import add_product_icon from "../../assets/Product_Cart.svg"
import list_product_icon from "../../assets/Product_list_icon.svg"


const SlideBar = () => {
  return (
    <div className='slideBar'>
      <Link to={'/addProduct'} style={{textDecoration:"none"}}>
        <div className="slideBar-item">
          <img src={add_product_icon} alt="" />
          <p>Add product</p>
        </div>
      </Link>

      <Link to={'/listProduct'} style={{textDecoration:"none"}}>
        <div className="slideBar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default SlideBar
