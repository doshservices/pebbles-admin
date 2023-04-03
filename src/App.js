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
            <Route path='/' element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path='booking-list' element={<BookingList />} />
            <Route path='users' element={<Users />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='user-details' element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
