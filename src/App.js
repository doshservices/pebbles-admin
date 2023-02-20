import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Users from './pages/users';
import Dashboard from './components/dashboard/dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
