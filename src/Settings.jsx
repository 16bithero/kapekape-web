import './App.css'
import { Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Settings() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('id');
  const username = localStorage.getItem('username');

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
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      setFname(userData.data.details.fname);
      setLname(userData.data.details.lname);
      setTitle(userData.data.details.title);
      setCompany(userData.data.details.company);
      setCity(userData.data.details.city);
      setCountry(userData.data.details.country);
      setBio(userData.data.details.bio);
      setImage(userData.data.details.image);
      setPronouns(userData.data.details.pronouns);
      setGithub(userData.data.details.social.github);
      setTwitter(userData.data.details.social.twitter);
      setLinkedin(userData.data.details.social.linkedin);
      setFacebook(userData.data.details.social.facebook);
      setInstagram(userData.data.details.social.instagram);
      setPhone(userData.data.details.phone);
      setWebsite(userData.data.details.website);
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
          phone: phone,
          image: imageUrl,
          social: {
            github: github,
            twitter: twitter,
            linkedin: linkedin,
            facebook: facebook,
            instagram: instagram,
            website: website,
          },
          website: website,
        };

        try {
          const response = await axios.patch(`https://kapekape-backend.vercel.app/api/detail/${userID}`, inputEmp);
          navigate(`/profile/${username}`);
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
            <div>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Personal Info" value="1" />
                    <Tab label="Preferences" value="2" />
                    <Tab label="Contact" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Stack spacing={3}>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <TextField id="fname" label='First Name' variant="outlined" className='custom-textfield' value={fname} onChange={(e) => setFname(e.target.value)} />
                    <TextField id="lname" label='Last Name' variant="outlined" className='custom-textfield' value={lname} onChange={(e) => setLname(e.target.value)} />
                    <TextField id="title" label="Title" variant="outlined" className='custom-textfield' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField id="company" label="Company" variant="outlined" className='custom-textfield' value={company} onChange={(e) => setCompany(e.target.value)} />
                  </Stack>
                </TabPanel>

                <TabPanel value="2">
                  <Stack spacing={3}>
                    <TextField id="bio" label="Bio" variant="outlined" className='custom-textfield' value={bio} onChange={(e) => setBio(e.target.value)} />
                    <TextField id="pronouns" label="Pronouns" variant="outlined" className='custom-textfield' value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                    <TextField id="city" label="City" variant="outlined" className='custom-textfield' value={city} onChange={(e) => setCity(e.target.value)} />
                    <TextField id="country" label="Country" variant="outlined" className='custom-textfield' value={country} onChange={(e) => setCountry(e.target.value)} />
                  </Stack>
                </TabPanel>

                <TabPanel value="3">
                  <Stack spacing={3}>
                    <TextField id="phone" label="Phone" variant="outlined" className='custom-textfield' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <TextField id="github" label="Github" variant="outlined" className='custom-textfield' value={github} onChange={(e) => setGithub(e.target.value)} />
                    <TextField id="twitter" label="Twitter" variant="outlined" className='custom-textfield' value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                    <TextField id="linkedin" label="Linkedin" variant="outlined" className='custom-textfield' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                    <TextField id="facebook" label="Facebook" variant="outlined" className='custom-textfield' value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                    <TextField id="instagram" label="Instagram" variant="outlined" className='custom-textfield' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                    <TextField id="website" label="Website" variant="outlined" className='custom-textfield' value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </Stack>
                </TabPanel>
              </TabContext>
              <Button variant="contained" type='submit'>Update</Button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
