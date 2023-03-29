import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { isAuthenticated } from './utils/helpers';
// import { useState, useEffect } from 'react';
import Login from './pages/login';
import SideNav from './components/@navigation/sidenav';
import Overview from './pages/overview/overview';
import BookingList from './pages/@bookinglist/bookinglist';
import Users from './pages/@users/users';
import Analytics from './pages/@analytics/analytics';
import UserDetails from './pages/@userdetails/userDetails';
// import BuisnessHost from './components/hosts/buisnessHost';
// import IndividualHost from './components/hosts/individualHost';

function App() {

  // const authenticated = isAuthenticated();
  // const [showNav, setShowNav] = useState(true)

  // useEffect(() => {
  //   if (!authenticated) {
  //     setShowNav(false)
  //   }
  // }, [authenticated]);
  return (
    <BrowserRouter>
      <div className='App'>
        <SideNav />
        <main>
          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path='overview' element={<Overview />} />
            <Route path='booking-list' element={<BookingList />} />
            <Route path='users' element={<Users />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='user-details' element={<UserDetails />} />
            {/* <Route path='/buisness' element={<BuisnessHost />} />
            <Route path='/individual' element={<IndividualHost />} />
            <Route path='/transactions' element={<IndividualHost />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
