import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Navbar from './components/navbar';
import Users from './pages/users';

function App() {

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Navbar />
        <div className='wrapper_route'>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path='/' element={<Users />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
