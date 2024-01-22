import './App.css';
import {Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Mypage from './components/pages/Mypage';
import Cart from './components/pages/Cart';
import CustomerService from './components/pages/CustomerService';
import Layout from './components/layout/Layout';

function App() {
  return (
      <Routes>
        <Route element={<Layout />} >
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/customer-service' element={<CustomerService/>}/>
        </Route>
      </Routes>
  );
}

export default App;
