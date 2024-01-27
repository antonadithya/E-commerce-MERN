import React, { useContext } from 'react'
import {shopContext }from "../context/ShopContext"
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/bredcrums/Breadcrumb';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionBox/DescriptionBox';
import RelatedProduct from '../components/relatedProducts/RelatedProduct';

const Product = () => {
  const {all_product} = useContext(shopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId))

    if (!product) {
    // Handle the case where the product is not found
    return <div>Product not found</div>;
  }
  return (
    <div>
       <Breadcrumb product= {product}/>
       <ProductDisplay product ={product}/>
       <DescriptionBox />
       <RelatedProduct />
    </div>
  )
}

export default Product

