import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SideNav from './components/@navigation/sidenav';
import BuisnessHost from './components/hosts/buisnessHost';
import IndividualHost from './components/hosts/individualHost';
import Overview from './pages/overview/overview';
import { isAuthenticated } from './utils/helpers';
import { useState, useEffect } from 'react';
import BookingList from './pages/@bookinglist/bookinglist';

function App() {

  const authenticated = isAuthenticated();
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    if (!authenticated) {
      setShowNav(false)
    }
  }, [authenticated]);
  return (
    <BrowserRouter>
      <div className='App'>
        <SideNav />
        <main>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path='/' element={<Overview />} />
            <Route path='booking-list' element={<BookingList />} />
            <Route path='/buisness' element={<BuisnessHost />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/individual' element={<IndividualHost />} />
            <Route path='/transactions' element={<IndividualHost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
