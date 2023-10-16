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

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [social, setSocial] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [website, setWebsite] = useState('');
  const [url, setUrl] = useState('');
  const [phone, setPhone] = useState('');

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      setFname(userData.data.details.fname);
      setLname(userData.data.details.lname);
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


   

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append("upload_preset", "kapekape");
      formData.append("cloud_name", "dleaws1hu");
  
      const imageUploadResponse = await fetch("https://api.cloudinary.com/v1_1/dleaws1hu/image/upload", {
        method: 'POST',
        body: formData
      });
  
      if (imageUploadResponse.ok) {
        const imageData = await imageUploadResponse.json();
        const imageUrl = imageData.url;
        console.log("Image uploaded:", imageUrl);
  
        const id = userID;
        const inputEmp = {
          userId: id,
          fname: fname,
          lname: lname,
          title: title,
          company: company,
          bio: bio,
          pronouns: pronouns,
          city: city,
          country: country,
          image: imageUrl,
          social: social,
          website: website,
        };
  
        try {
          const response = await axios.patch(`https://kapekape-backend.vercel.app/api/detail/${userID}`, inputEmp);
          navigate('/home');
        } catch (error) {
          console.error('Error updating details:', error);
        }
      } else {
        console.log('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <div className='custom-body'>
        <div className='custom-container'>
          <h1>Update Profile</h1>
          <form onSubmit={updateDetails}>
            <Stack spacing={3} alignItems="center" justifyContent="center">
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              <TextField id="fname" label='First Name' variant="outlined" className='custom-textfield' value={fname} onChange={(e) => setFname(e.target.value)} />
              <TextField id="lname" label='Last Name' variant="outlined" className='custom-textfield' value={lname} onChange={(e) => setLname(e.target.value)} />
              <TextField id="title" label="Title" variant="outlined" className='custom-textfield' value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextField id="company" label="Company" variant="outlined" className='custom-textfield' value={company} onChange={(e) => setCompany(e.target.value)} />
              <TextField id="bio" label="Bio" variant="outlined" className='custom-textfield' value={bio} onChange={(e) => setBio(e.target.value)} />
              <TextField id="pronouns" label="Pronouns" variant="outlined" className='custom-textfield' value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
              <TextField id="city" label="City" variant="outlined" className='custom-textfield' value={city} onChange={(e) => setCity(e.target.value)} />
              <TextField id="country" label="Country" variant="outlined" className='custom-textfield' value={country} onChange={(e) => setCountry(e.target.value)} />
              <TextField id="social" label="Social" variant="outlined" className='custom-textfield' value={social} onChange={(e) => setSocial(e.target.value)} />
              <TextField id="website" label="Website" variant="outlined" className='custom-textfield' value={website} onChange={(e) => setWebsite(e.target.value)} />
              <Button variant="contained" type='submit'>Update</Button>
            </Stack>
          </form>
        </div>
      </div>

    </>
  )
}
