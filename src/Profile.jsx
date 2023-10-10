import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@mui/material';

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
              <div className='profile-banner'>
                <div className='profile-image'>
                  {/* <Skeleton variant="circular" className="custom-skeleton" height={200} width={200}/> */}
                  <img src={'https://i1.sndcdn.com/avatars-otulnqaphpqS98tn-SPPp4A-t500x500.jpg'} alt="profile" className="custom-image" />
                </div>
                <div className='profile-text'>
                  <Stack spacing={1}>
                  <h1>{data.details.name}</h1>
                  <h3>{data.details.city}, {data.details.country}</h3>
                  <h5 style={{fontStyle: 'italic'}}>"{data.details.bio}"</h5>
                  </Stack>
                 
                </div>
              </div>
              

            </>
          )}


        </div>

      </div>
    </>
  )
}
