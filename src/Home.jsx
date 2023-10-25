import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Landing from './assets/Landing.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare, faQrcode } from '@fortawesome/free-solid-svg-icons';



export default function Home() {
  const userID = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const [name, setName] = useState('');

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      setName(userData.data.details.fname);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const greeting = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) return 'Good morning';
    else if (hour < 18) return 'Good afternoon';
    else return 'Good evening';
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='custom-body'>
      <div className='custom-container'>
        <div className='landing-area'>
          <h1>{greeting()}{name ? `, ${name}!` : "!"}</h1>
        </div>
        <div className='navi-links'>
          <FontAwesomeIcon icon={faUser} size="2x" style={{ color: "#4a4a4a", }} />
          <Link to={`/profile/${username}`}>
            <h5>View Profile</h5>
          </Link>
        </div>

        <div className='navi-links'>
          <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{ color: "#4a4a4a", }} />
          <Link to="/settings">
            <h5>Update Profile</h5>
          </Link>
        </div>

        <div className='navi-links'>
          <FontAwesomeIcon icon={faQrcode} size="2x" style={{ color: "#4a4a4a", }} />
          <Link to="/qrcode">
            <h5>Share QR Code</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}