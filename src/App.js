import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/navbar';

function App() {

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Navbar />
        <div className='wrapper_route'>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path='/' element={<Dashboard />} ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
