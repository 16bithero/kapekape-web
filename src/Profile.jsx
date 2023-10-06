import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Profile() {
  const id = '6509454cd67ca264879118dd';
  const [data, setData] = useState({})

  const getProfile = async () => {
    try {
      const userInfo = await axios.get(`https://kapekape-backend.vercel.app/api/user/${id}`);
      console.log(userInfo.data);
      setData(userInfo.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <>
    {data.details && (
      <h1>Name: {data.details.name}</h1>
    )}
  </>
  )
}
