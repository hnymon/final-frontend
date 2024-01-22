import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
      <Route path='signUp' element={<SignUp/> } />
    </Routes>
  );
}

export default App;
