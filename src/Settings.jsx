import './App.css'
import { Paper, Stack, TextField } from '@mui/material'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faFacebook, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


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

  const HideInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '100%',
  });

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
          <div className='landing-area' style={{height:'18dvh'}}>
          <h1>Update Profile</h1>
          <div class="container">
          <img src={image} className="custom-image" style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div className='update-container'>
            <h3>About Me</h3>
            <Stack spacing={3} alignItems="center">
                  
                        <TextField id="fname" label='First Name' variant="outlined" className='custom-textfield' value={fname} onChange={(e) => setFname(e.target.value)} />
                   
                        <TextField id="lname" label='Last Name' variant="outlined" className='custom-textfield' value={lname} onChange={(e) => setLname(e.target.value)} />
                   
                        <TextField id="title" label="Title" variant="outlined" className='custom-textfield' value={title} onChange={(e) => setTitle(e.target.value)} />
                    
                        <TextField id="company" label="Company" variant="outlined" className='custom-textfield' value={company} onChange={(e) => setCompany(e.target.value)} />
                  </Stack>
          </div>
            </div>
          <form onSubmit={updateDetails}>
            {/* <div className='update-profile'>
              <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="update setting" variant="fullWidth" >
                  <Tab label="About me" value="1" />
                  <Tab label="Info" value="2" />
                  <Tab label="Socials" value="3" />
                </TabList>
                <TabPanel value="1">
                  <Stack spacing={3} alignItems="center" sx={{ padding: '1em', margin: 'auto' }}>
                    <img src={image} className="custom-image" style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '50%' }} />
                    <Button component="label" variant="contained" startIcon={<EditIcon />}>
                      <HideInput type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Button>
                    <Grid container spacing={2} alignContent='center'>
                      <Grid item xs={6}>
                        <TextField id="fname" label='First Name' variant="outlined" className='custom-textfield' value={fname} onChange={(e) => setFname(e.target.value)} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="lname" label='Last Name' variant="outlined" className='custom-textfield' value={lname} onChange={(e) => setLname(e.target.value)} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="title" label="Title" variant="outlined" className='custom-textfield' value={title} onChange={(e) => setTitle(e.target.value)} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="company" label="Company" variant="outlined" className='custom-textfield' value={company} onChange={(e) => setCompany(e.target.value)} />
                      </Grid>
                    </Grid>
                  </Stack>
                </TabPanel>

                <TabPanel value="2">
                  <Stack spacing={3} alignItems="center">
                    <TextField fullWidth id="bio" multiline rows={3} label="Bio" variant="outlined" className='custom-textfield' helperText="Max 250 character limit." inputProps={{ maxLength: 250 }} value={bio} onChange={(e) => setBio(e.target.value)} />
                    <TextField fullWidth id="pronouns" label="Pronouns" variant="outlined" className='custom-textfield' value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                    <TextField fullWidth id="phone" label="Phone" variant="outlined" className='custom-textfield' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <TextField fullWidth id="city" label="City" variant="outlined" className='custom-textfield' value={city} onChange={(e) => setCity(e.target.value)} />
                    <TextField fullWidth id="country" label="Country" variant="outlined" className='custom-textfield' value={country} onChange={(e) => setCountry(e.target.value)} />
                  </Stack>
                </TabPanel>

                <TabPanel value="3">
                  <div className='profile-section'>
                    <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ padding: '0', margin: 'auto' }}>
                      <div className='social-icons'>
                        <FontAwesomeIcon icon={faLinkedinIn} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="linkedin"
                          label="LinkedIn"
                          variant="outlined"
                          className="custom-textfield"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}

                        />
                      </div>

                      <div className='social-icons'>

                        <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="facebook"
                          label="Facebook"
                          variant="outlined"
                          className="custom-textfield"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />

                      </div>
                      <div className='social-icons'>
                        <FontAwesomeIcon icon={faGithub} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="github"
                          label="GitHub"
                          variant="outlined"
                          className="custom-textfield"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                        />

                      </div>

                      <div className='social-icons'>

                        <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="instagram"
                          label="Instagram"
                          variant="outlined"
                          className="custom-textfield"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                        />

                      </div>

                      <div className='social-icons'>

                        <FontAwesomeIcon icon={faXTwitter} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="twitter"
                          label="X"
                          variant="outlined"
                          className="custom-textfield"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                        />

                      </div>

                      <div className='social-icons'>

                        <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                        <TextField
                          id="website"
                          label="Website"
                          variant="outlined"
                          className="custom-textfield"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>

                    </Stack>
                  </div>
                </TabPanel>
              </TabContext>
            </div> */}
            <br />
            {/* <div style={{ justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" type='submit'>Update</Button>
            </div> */}

          </form>
        </div>
      </div>

    </>
  )
}
