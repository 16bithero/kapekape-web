import './App.css'
import { Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'




export default function Settings() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('id');

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [social, setSocial] = useState('');
  const [url, setUrl] = useState('');

  const uploadImg = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append("upload_preset", "kapekape")
    formData.append("cloud_name","dleaws1hu")
    fetch("https://api.cloudinary.com/v1_1/dleaws1hu/image/upload",{
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => console.log(err));
  }

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      setName(userData.data.details.name);
      setCity(userData.data.details.city);
      setCountry(userData.data.details.country);
      setBio(userData.data.details.bio);
      setImage(userData.data.details.image);
      setSocial(userData.data.details.social);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  useEffect(() => {
    getData();
  }, []);

  const updateDetails = async (event) => {
    event.preventDefault();

    const id = userID;
    const inputEmp = {
      userId: id,
      name: name,
      city: city,
      country: country,
      bio: bio,
      image: url,
      social: social
    };

    try {
      uploadImg();
      const response = await axios.post('https://kapekape-backend.vercel.app/api/detail/', inputEmp);
      navigate('/home');
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  return (
    <>
      <div className='custom-body'>
        <div className='custom-container'>
          <h1>Update Profile</h1>
          <form onSubmit={updateDetails}>
            <Stack spacing={3} alignItems="center" justifyContent="center">
              <TextField id="name" label='Name' variant="outlined" className='custom-textfield' value={name} onChange={(e) => setName(e.target.value)} />
              <TextField id="city" label="City" variant="outlined" className='custom-textfield' value={city} onChange={(e) => setCity(e.target.value)} />
              <TextField id="country" label="Country" variant="outlined" className='custom-textfield' value={country} onChange={(e) => setCountry(e.target.value)} />
              <TextField id="bio" label="Bio" variant="outlined" className='custom-textfield' value={bio} onChange={(e) => setBio(e.target.value)} />
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              <TextField id="social" label="Social" variant="outlined" className='custom-textfield' value={social} onChange={(e) => setSocial(e.target.value)} />
              <Button variant="contained" type='submit'>Update</Button>
            </Stack>
          </form>
        </div>
      </div>

    </>
  )
}
