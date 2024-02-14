import {Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Mypage from './components/pages/Mypage';
import Cart from './components/pages/Cart';
import CustomerService from './components/pages/CustomerService';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail';
import BoardCreate from './components/board/BoardCreate';
import Edit from './components/board/Edit';
import SearchBook from './components/pages/SearchBook';
import BookDetail from './components/pages/BookDetail';
import LoginCallback from './components/oauth/Logincallback';
import Order from './components/order/order';
import OrderSuccess from './components/order/OrderSuccess';
import InquiryArea from './components/board/InquiryArea';
import InquiryList from './components/board/InquiryList';
import InquiryDetail from './components/board/InquiryDetail';

function App() {
  return (
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/login/callback' element={<LoginCallback />}/>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/order/success' element={<OrderSuccess/>}/>
          <Route path='/customer-service' element={<CustomerService/>}/>
          {/* 책 검색 */}
          <Route path='/book-search/:keyword' element={<SearchBook />}/>   
          <Route path='/book-detail/:isbn' element={<BookDetail/>}/>   
          {/* 게시판 */}
          <Route path='/board/BoardList' element={<BoardList/>}/>   
          <Route path='/board/BoardDetail/:boardSeq' element={<BoardDetail/>}/> 
          <Route path='/board/BoardCreate' element={<BoardCreate/>}/> 
          <Route path='/board/Edit/:boardSeq' element={<Edit/>}/>
          {/* 1대1문의 */}
          <Route path='/board/InquiryArea' element={<InquiryArea/>}/> 
          <Route path='/board/InquiryList' element={<InquiryList/>}/> 
          <Route path='/board/InquiryDetail/:inquiryId' element={<InquiryDetail/>}/> 
        </Route>
      </Routes>
  );
}

export default App;
