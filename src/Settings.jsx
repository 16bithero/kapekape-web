import './App.css'
import { Fab, Skeleton, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faFacebook, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';



const CustomTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderRadius: 10,
    backgroundColor: '#eef1f4',
    border: '1px solid #080808',
    borderColor: '#080808',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: '#080808',
    },
  },
});




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

  const customFont = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontWeight: 'bold',
    color: 'black',
  };

  const style = {
    button: {
      backgroundColor: '#292929',
      border: '1px solid #080808',
      color: 'white',
      fontWeight: 'bold',
    },
  };

  const getData = async () => {
    try {
      const userData = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${userID}`);
      const userDetail = userData.data.details;

      setFname(userDetail ? userDetail.fname : '');
      setLname(userDetail ? userDetail.lname : '');
      setTitle(userDetail ? userDetail.title : '');
      setCompany(userDetail ? userDetail.company : '');
      setCity(userDetail ? userDetail.city : '');
      setCountry(userDetail ? userDetail.country : '');
      setBio(userDetail ? userDetail.bio : '');
      setImage(userDetail ? userDetail.image : '');
      setPronouns(userDetail ? userDetail.pronouns : '');
      if (userDetail && userDetail.social) {
        setGithub(userDetail.social.github || '');
        setTwitter(userDetail.social.twitter || '');
        setLinkedin(userDetail.social.linkedin || '');
        setFacebook(userDetail.social.facebook || '');
        setInstagram(userDetail.social.instagram || '');
      } else {
        setGithub('');
        setTwitter('');
        setLinkedin('');
        setFacebook('');
        setInstagram('');
      }
      setPhone(userDetail ? userDetail.phone : '');
      setWebsite(userDetail ? userDetail.website : '');
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
          <div className='landing-area' style={{ height: '18dvh' }}>
            <h1>Update Profile</h1>
            <div className="container">
              {image ? (
                <img src={image} className="custom-image" />
              ) : (
                <div style={{
                  width: '125px',
                  height: '125px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: '2px solid #080808',
                }}></div>
              )}
              <div className='fab-icon'>
              <Fab size="small" component="label" style={{color: 'white', backgroundColor:'#080808'}}>
                <EditIcon />
                <input type="file" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
              </Fab>
              </div>
            </div>
          </div>
          <form onSubmit={updateDetails}>
            <div className='update-container'>
              <TabContext value={value}>
                <TabList TabIndicatorProps={{ style: { background: 'black' } }} onChange={handleChange} aria-label="update setting" variant="fullWidth" style={style.tabList}>
                  <Tab label="About me" value="1" style={customFont} />
                  <Tab label="Details" value="2" style={customFont} />
                  <Tab label="Socials" value="3" style={customFont} />
                </TabList>
                <TabPanel value="1">
                  <div>
                    <div className='update-content'>
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="fname" label='First Name' variant="filled" value={fname} onChange={(e) => setFname(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="lname" label='Last Name' variant="filled" value={lname} onChange={(e) => setLname(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="title" label="Title" variant="filled" className='custom-textfield' value={title} onChange={(e) => setTitle(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="company" label="Company" variant="filled" className='custom-textfield' value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="2">

                  <div>
                    <div className='update-content'>
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1em', width: '100%' }} id="bio" multiline rows={3} label="Bio" variant="filled" className='custom-textfield' helperText="Max 250 character limit." inputProps={{ maxLength: 250 }} value={bio} onChange={(e) => setBio(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="pronouns" label="Pronouns" variant="filled" className='custom-textfield' value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="phone" label="Phone" variant="filled" className='custom-textfield' value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="city" label="City" variant="filled" className='custom-textfield' value={city} onChange={(e) => setCity(e.target.value)} />
                      <CustomTextField InputProps={{ disableUnderline: true }} style={{ marginBottom: '1.5em', width: '100%' }} id="country" label="Country" variant="filled" className='custom-textfield' value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="3">
                  <div>
                    <div className='update-content'>
                      <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ padding: '0', margin: 'auto' }}>
                        <div className='social-icons'>
                          <FontAwesomeIcon icon={faLinkedinIn} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="linkedin"
                            label="LinkedIn"
                            variant="filled"
                            className="custom-textfield"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}

                          />
                        </div>

                        <div className='social-icons'>

                          <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="facebook"
                            label="Facebook"
                            variant="filled"
                            className="custom-textfield"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />

                        </div>
                        <div className='social-icons'>
                          <FontAwesomeIcon icon={faGithub} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="github"
                            label="GitHub"
                            variant="filled"
                            className="custom-textfield"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                          />

                        </div>

                        <div className='social-icons'>

                          <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="instagram"
                            label="Instagram"
                            variant="filled"
                            className="custom-textfield"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />

                        </div>

                        <div className='social-icons'>

                          <FontAwesomeIcon icon={faXTwitter} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="twitter"
                            label="X"
                            variant="filled"
                            className="custom-textfield"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                          />

                        </div>

                        <div className='social-icons'>

                          <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '1em', height: '30px', width: '30px' }} />
                          <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '100%' }}
                            id="website"
                            label="Website"
                            variant="filled"
                            className="custom-textfield"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>

                      </Stack>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </div>
            <br />
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" type='submit' style={style.button}>Update</Button>
            </div>

          </form>
        </div>
      </div>

    </>
  )
}
