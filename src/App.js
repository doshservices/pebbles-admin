import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Dashboard from './components/dashboard/dashboard';
import SideNav from './components/sidenav';
import BuisnessHost from './components/hosts/buisnessHost';
import IndividualHost from './components/hosts/individualHost';
import OverviewNav from './components/overviewNav';
import Overview from './pages/overview/overview';
import { isAuthenticated } from './utils/helpers';
import { useState, useEffect } from 'react';

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
      {showNav && <OverviewNav />
      }
      <div className='grid-col'>
        <div>
          {showNav && <SideNav />}
        </div>
        <div>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/buisness' element={<BuisnessHost />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/individual' element={<IndividualHost />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
