import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
