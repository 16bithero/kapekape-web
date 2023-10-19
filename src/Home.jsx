import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Landing from './assets/Landing.jpg'


export default function Home() {
  const userID = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const [name, setName] = useState('');

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      setName(userData.data.details.name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='custom-body'>
      <div className='custom-container'>
        <h1>Hey there{name? ` ${name}!`: "!"}</h1>
        <img src={Landing} alt='Landing' className='landing-image' />
        <h3 className='intro-text'>'Kape-Kape' is a Filipino phrase commonly used when people invite each other for small talk and coffee. 
          This phrase inspired our app, a digital business card app that allows users to create meaningful connections with just a click of a QR code.</h3>
          <h3 className='intro-text'>Developed by 16BitHero.</h3>
        <br />
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" useFlexGap flexWrap="wrap">
        <Link to={`/profile/${username}`}><Button variant="contained">View Profile</Button></Link>
        <Link to="/settings"><Button variant="contained">Update Profile</Button></Link>
        <Link to="/qrcode"><Button variant="contained">Share QR Code</Button></Link>
        </Stack>
      </div>
    </div>
  )
}