import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import men_banner from "./components/assets/banner_mens.png"
import women_banner from "./components/assets/banner_women.png"
import kid_banner from "./components/assets/banner_kids.png"

import { Shop, Cart, LoginSignup, Product,  ShopCategory} from "./pages/index";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path='/womans' element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory  banner={kid_banner} category="kid" />}/>
          <Route path='/product' element={<Product />}>
             <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<LoginSignup />}/> 
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
