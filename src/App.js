import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardCreate from './conponents/board/BoardCreate';
import Main from './conponents/Main';
import BoardList from './conponents/board/BoardList';
import BoardDetail from './conponents/board/BoardDetail';
function App() {
  return (
        <BrowserRouter>
          <Routes>

            <Route index element={<Main/>}/>
            <Route path='/board/BoardCreate' element={<BoardCreate/>}></Route>
            <Route path='/board/BoardList' element={<BoardList/>}></Route>
            <Route path='/board/BoardDetail/:boardSeq' element={<BoardDetail/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
