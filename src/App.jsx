import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Login'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SlideDrawer from './SlideDrawer';
import Home from './Home'
import ShareQR from './ShareQR'
import Profile from './Profile'
import Settings from './Settings'
import SignUp from './SignUp'


function App() {

  
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);


  const toggleLeftDrawer = () => {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  };

  return (
    <div className='custom-body'>
      <BrowserRouter>
        <SlideDrawer open={isLeftDrawerOpen} onClose={toggleLeftDrawer} />
        <AppBar position="relative" className='custom-appbar'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleLeftDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kape-Kape!
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/qrcode" element={<ShareQR />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
