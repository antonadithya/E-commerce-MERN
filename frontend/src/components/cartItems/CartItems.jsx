import React, { useContext } from 'react'
import "./cartItems.css"
import { shopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'


const CartItems = () => {

   const {getTotalCartAmount,all_product, cartItems , removeFromCart} = useContext(shopContext)
  return (
    <div className='cartItems'>
      <div className='cartItems-format-main'>
         <p>Product</p>
         <p>Title</p>
         <p>Price</p>
         <p>Quantity</p>
         <p>Total</p>
      </div>
      <hr />
      {all_product.map((e) => {
          if(cartItems[e.id] > 0 ){
        return (<div>
        <div  className="cartItems-format-main cartItems-format">
          <img src={e.image} alt="" className='cartIcon-product' />
          <p>{e.name}</p>
          <p>${e.new_price}</p>
          <button className='cartItems-quantity'>{cartItems[e.id]}</button>
          <p>{e.new_price * cartItems[e.id]}</p>
          <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" className='cartItems-remove-icon'/>
        </div>
        <hr />
      </div>)
          }

          return null;
      })}

        <div className="cartItems-down">
          <div className="cartItems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartItems-total-item">
                 <p>Subtotal</p>
                 <p>${0}</p>
              </div>
              <hr />
              <div className="cartItems-total-item">
                <p>Shipping Free</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartItems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartItems-promoCode">
           <p>you have a promo code, Enter it here</p>
            <div className="cartItems-promoBox">
              <input type="text " placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CartItems
