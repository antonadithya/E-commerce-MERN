import React, { useState } from 'react'
import "./addProduct.css"
import upload_area from '../../assets/upload_area.svg'



const AddProduct = () => {

const [image ,setImage] = useState(null);

const [productDetails , setProductDetails] = useState({
  name: "",
  image:"",
  category:"women",
  new_price:"",
  old_price:""
})



  const imageHandler = (e) => {
  const selectedImage = e.target.files[0];
   setImage(selectedImage );
 }

 const changeHandler = (e) => {
  setProductDetails({...productDetails,
    [e.target.name]: e.target.value})
 }

 const Add_Product = async () => {
  try {
    let responseData;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    const response = await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    responseData = data;

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addProduct', {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(product)

      })
      .then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("product added"):alert("failed")
      })



    } else {
      console.error("Image upload failed:", responseData.error);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};


  return (
    <div className='addProduct'>
      <div className="addProduct-itemFields">
        <p>Product Title</p>
         <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>

      <div className="addProduct-price">
        <div className="addProduct-itemFields">
          <p>Price</p>
          <input value={productDetails.old_price}  onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
        </div>
        <div className="addProduct-itemFields">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
        </div>
      </div>
      
      <div className="addProduct-itemField">
        <p>Product Category</p>
        <select value={productDetails.category}  onChange={changeHandler} name="category" className='addProduct-selector' >
          <option value="woman">Woman</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
 
      <div className="addProduct-itemField">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image):upload_area} className='addProduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>

      <button onClick={() => {Add_Product()}} className='addProduct-btn'>ADD</button>
     
    </div>
  )
}

export default AddProduct
