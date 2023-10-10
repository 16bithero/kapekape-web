import * as React from 'react';
import './App.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';


export default function SlideDrawer({ open, onClose }) {

  const getUsername = () => {
    return localStorage.getItem('username');
  };
  const username = getUsername();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const list = (anchor) => (
    <Box
      className='custom-drawer'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, p: '0.5em', height: '100dvh'}}
      role="presentation"
      onClick={() => onClose(anchor, false)}
      onKeyDown={() => onClose(anchor, false)}
    >
      <List>
        
        {[
          { text: 'Home', path: '/home', icon: <HomeIcon /> },
          { text: 'Profile', path: username ? `/profile/${username}` : '/profile', icon: <AccountCircleIcon />},
          { text: 'QR Code', path: '/qrcode', icon: <QrCodeIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path} >
            <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
              primaryTypographyProps={{fontWeight:'bold', fontFamily:'Gabarito', fontSize:'1.5em'}}
              primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Update Profile', path: '/settings', icon: <EditNoteIcon /> },
          { text: 'Log Out', path: '/', onClick: handleLogout, icon: <LogoutIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path}  onClick={item.onClick}>
            <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primaryTypographyProps={{fontWeight:'bold', fontFamily:'Gabarito', fontSize:'1.5em'}}
                primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={() => onClose('left', false)} sx={{backdropFilter: 'blur(3px)'}}>
      {list('left')}
    </Drawer>
  );
}
