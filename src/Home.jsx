import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material';


export default function Home() {
  const userID = localStorage.getItem('id');
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
        <h2>Welcome to Kape-Kape!</h2>
        <Stack spacing={2} direction="row">
         <Button>Hahahaha</Button>
        </Stack>
      </div>
    </div>
  )
}