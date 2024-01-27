import React, { useContext, useState } from 'react' 
import './navbar.css'

import { useRef } from 'react';
import logo from "../assets/logo.png"
import cart_icon from "../assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { shopContext } from '../../context/ShopContext'
import nav_dropdown from "../assets/down-arrow.png"


const linkStyle = {
    textDecoration: 'none', 
    color: 'inherit', 
  
  };

const Navbar = () => {
  
  const [menu ,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(shopContext);
  const menuRef = useRef();

const dropdown_toggle = (e) => {
  menuRef.current.classList.toggle('nav-menu-visible');
  e.target.classList.toggle('open')
}


  return (

    <div className='navbar'>

      <div className="nav-logo">
         <img src={logo} alt="logo" />
         <p>SHOPPER</p>  
      </div>

  
     <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}> <Link style={linkStyle} to="/">Shop    </Link>   {menu === "shop" ? <hr/> : <> </>}  </li>
        <li onClick={()=>{setMenu("mens")}}> <Link style={linkStyle}to="/mens"> Men </Link>  {menu === "mens" ? <hr/> : <> </>}  </li>
        <li onClick={()=>{setMenu("woman")}}><Link style={linkStyle}to="/womans">Women </Link>{menu === "woman" ? <hr/> : <> </>}</li>
        <li onClick={()=>{setMenu("kids")}}> <Link style={linkStyle}to="/kids">Kids</Link>   {menu === "kids" ? <hr/> : <> </>}  </li>
      </ul>

        
           <img onClick={dropdown_toggle} src={nav_dropdown} alt="" className='nav-dropdown'/>
         

       <div className="nav-login-cart">
       {localStorage.getItem('auth-token') ? <button onClick={() =>{localStorage.removeItem('auth-token');
       window.location.replace("/")}}> Logout </button> 
       : <Link style={linkStyle}to="/login"> <button>Login</button> </Link>}
         
         <Link style={linkStyle}to="/cart"><img src={cart_icon} alt="cart" /></Link>
         <div className="nav-cart-count">{getTotalCartItems()}</div>
       </div>

        
    </div>
  )
}

export default Navbar
