import './App.css';
import Login from './pages/login';
import Users from './pages/@users/users';
import Hosts from './pages/@hosts/host';
import Events from './pages/events/events';
import Details from './pages/@hosts/details';
import SideNav from './components/@navigation/sidenav/sidenav';
import Overview from './pages/overview/overview';
import Services from './pages/addons/services';
import Analytics from './pages/@analytics/analytics';
import Apartment from './pages/apartment/apartment';
import UserDetails from './pages/@userdetails/userDetails';
import BookingList from './pages/@bookinglist/bookinglist';
import BookingDetails from './pages/@bookinglist/bookingDetails/details';
import ApartmentDetails from './pages/apartment/apardetails';
import { isAuthenticated } from './utils/helpers';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const authenticated = isAuthenticated();
  const [mainClass, setMainClass] = useState('main')

  useEffect(() => {
    if (!authenticated) {
      setMainClass('')
    }
  }, [authenticated]);

  const clearStorage = () => {
    localStorage.removeItem("pstk")
    localStorage.removeItem("psid");
  }

  useEffect(() => {
    setTimeout(clearStorage, 1000 * 60 * 60 * 10)
  }, [])

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
            <Route path='booking-list/details' element={<BookingDetails />} />
            <Route path='apartment' element={<Apartment />} />
            <Route path='hosts' element={<Hosts />} />
            <Route path='hosts/details' element={<Details />} />
            <Route path='apartment/details' element={<ApartmentDetails />} />
            <Route path='events' element={<Events />} />
            <Route path='services' element={<Services />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
