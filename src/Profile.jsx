import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Profile({ setIsAuthenticated }) {
  const { username } = useParams();
  const [data, setData] = useState({})

  const getProfile = async () => {
    try {
      const userInfo = await axios.get(`https://kapekape-backend.vercel.app/api/user/${username}`);
      console.log(userInfo.data);
      setData(userInfo.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [username]);

  return (
    <>
      <div className='custom-body'>
        <div className='custom-container'>
        {data.details && (
          <>
          <h1>Name: {data.details.name}</h1>
          <h1>City: {data.details.city}</h1>
          <h1>Country: {data.details.country}</h1>
          <h1>Bio: {data.details.bio}</h1>
          <h1>Image: {data.details.image}</h1>
          <h1>Social: {data.details.social}</h1>
          </>
          
        )}
        

          </div>
      
      </div>
    </>
  )
}
