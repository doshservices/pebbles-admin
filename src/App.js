import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/helpers';
import BookingDetails from './pages/@bookinglist/bookingDetails/details';
import BookingList from './pages/@bookinglist/bookinglist';
import UserDetails from './pages/@userdetails/userDetails';
import Analytics from './pages/@analytics/analytics';
import Apartment from './pages/apartment/apartment';
import Overview from './pages/overview/overview';
import SideNav from './components/@navigation/sidenav/sidenav';
import Login from './pages/login';
import Users from './pages/@users/users';
import Hosts from './pages/@hosts/host';
import Details from './pages/@hosts/details';
import ApartmentDetails from './pages/apartment/apardetails';

function App() {

  const authenticated = isAuthenticated();
  const [mainClass, setMainClass] = useState('main')

  useEffect(() => {
    if (!authenticated) {
      setMainClass('')
    }
  }, [authenticated]);

  const clearStorage = () => {
    localStorage.removeItem("Pebbles__Super_Admin___toKen")
    localStorage.removeItem("Pebbles__Super_Admin___iD");
  }

  useEffect(() => {
    setTimeout(clearStorage, 86400000)
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
            <Route path='booking-detail' element={<BookingDetails />} />
            <Route path='apartment' element={<Apartment />} />
            <Route path='hosts' element={<Hosts />} />
            <Route path='host-details' element={<Details />} />
            <Route path='apartment-details' element={<ApartmentDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
