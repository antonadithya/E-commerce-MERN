import React, { useEffect, useState } from 'react'
import "./listProduct.css"
import cross_icon from '../../assets/cross_icon.png'


const ListProduct = () => {

  const [allProduct, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allProduct')
    .then((res) => res.json())
    .then((data) => {setAllProduct(data)})
  }

  useEffect(() =>{
    fetchInfo();
  },[])

  const remove_product = async (id) => {
 await fetch('http://localhost:4000/removeProduct',{
  method: 'POST',
  headers: {
    Accept:'application/json',
    'content-type' :'application/json',
  },
  body: JSON.stringify({id:id})
 })
 await fetchInfo();
  }

  return (
    <div className='listProduct'>
      <h1>All Product List</h1>
      <div className="listProduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-allProduct">
        <hr />
        {allProduct.map((product,index) => {
           return <><div key={index} className="listProduct-format-main listProduct-format">
           <img src={product.image} alt="" className="listProduct-product-icon" />
           <p>{product.name}</p>
           <p>${product.old_price}</p>
           <p>${product.new_price}</p>
           <p>{product.category}</p>
           <img onClick={ () => {remove_product(product.id)}} src={cross_icon}alt="" className="listProduct-remove-icon" />
           </div>
           <hr />
           </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
