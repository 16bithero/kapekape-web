import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Login'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SlideDrawer from './SlideDrawer';
import Home from './Home'
import ShareQR from './ShareQR'
import Profile from './Profile'
import Settings from './Settings'
import SignUp from './SignUp'
import { useState } from 'react'
import { useEffect } from 'react'


function App() {

  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);
  const toggleLeftDrawer = () => {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className='custom-body'>
      <BrowserRouter>
      {isAuthenticated && (
        <>
        <SlideDrawer open={isLeftDrawerOpen} onClose={toggleLeftDrawer} />
          <IconButton
              aria-label="menu"
              onClick={toggleLeftDrawer}
              style={{marginLeft: '5px'}}
            >
              <MenuIcon style={{fontSize: 40, color: 'white'}} />
            </IconButton>
        </>
         )}
        <Routes>
          <Route path="/"  element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/qrcode" element={<ShareQR />} />
          <Route path="/profile/:username" element={<Profile setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
