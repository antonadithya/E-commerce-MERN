import React from 'react'
import "./admin.css"
import {Routes, Route} from 'react-router-dom'
import SlideBar from '../../components/slidebar/Slidebar'
import AddProduct from '../../components/addProduct/AddProduct'
import ListProduct from '../../components/listProduct/ListProduct'



const Admin = () => {
  return (
    <div className='admin'>
      <SlideBar/>
       <Routes>
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/listProduct' element={<ListProduct />} />
       </Routes>
    </div>
  )
}

export default Admin
