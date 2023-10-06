import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

export default function SlideDrawer({ open, onClose }) {

  const getUsernameFromLocalStorage = () => {
    return localStorage.getItem('username');
  };

  const username = getUsernameFromLocalStorage();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => onClose(anchor, false)}
      onKeyDown={() => onClose(anchor, false)}
    >
      <List>
        {[
          { text: 'Home', path: '/' },
          { text: 'Profile', path: username ? `/profile/${username}` : '/profile' },
          { text: 'QR Code', path: '/qrcode' },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Settings', path: '/settings' },
          { text: 'Log-Out', path: '/logout' },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={() => onClose('left', false)}>
      {list('left')}
    </Drawer>
  );
}
