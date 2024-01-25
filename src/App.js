// import './App.css';
import {Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Mypage from './components/pages/Mypage';
import Cart from './components/pages/Cart';
import CustomerService from './components/pages/CustomerService';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import BoardList from './conponents/board/BoardList';
import BoardDetail from './conponents/board/BoardDetail';
import BoardCreate from './conponents/board/BoardCreate';
import Edit from './conponents/board/Edit';

function App() {
  return (
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<HomePage/>}/>
          <Route index element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/customer-service' element={<CustomerService/>}/>
          {/* 게시판 */}
          <Route path='/board/BoardList' element={<BoardList/>}/>   
          <Route path='/board/BoardDetail/:boardSeq' element={<BoardDetail/>}/> 
          <Route path='/board/BoardCreate' element={<BoardCreate/>}/> 
          <Route path='/board/Edit/:boardSeq' element={<Edit/>}/> 
        </Route>
      </Routes>
  );
}

export default App;
