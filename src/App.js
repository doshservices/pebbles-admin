import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './utils/helpers';
import { useState, useEffect } from 'react';
import Login from './pages/login';
import SideNav from './components/@navigation/sidenav/sidenav';
import Overview from './pages/overview/overview';
import BookingList from './pages/@bookinglist/bookinglist';
import Users from './pages/@users/users';
import Analytics from './pages/@analytics/analytics';
import UserDetails from './pages/@userdetails/userDetails';
import BookingDetails from './pages/@bookinglist/bookingDetails/details';
import Apartment from './pages/apartment/apartment';

function App() {

  const authenticated = isAuthenticated();
  const [showNav, setShowNav] = useState(true)
  const [mainClass, setMainClass] = useState('main')

  useEffect(() => {
    if (!authenticated) {
      setShowNav(false)
      setMainClass('')
    }
  }, [authenticated]);

  return (
    <BrowserRouter>
      <div className='App'>
        <SideNav />
        <main className={mainClass}>
          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path='booking-list' element={<BookingList />} />
            <Route path='users' element={<Users />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='user-details' element={<UserDetails />} />
            <Route path='booking-detail' element={<BookingDetails />} />
            <Route path='apartment' element={<Apartment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
