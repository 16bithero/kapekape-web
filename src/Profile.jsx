import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faFacebook, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';



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
                  <img src={'https://i1.sndcdn.com/avatars-otulnqaphpqS98tn-SPPp4A-t500x500.jpg'} alt="profile" className="custom-image" />
                </div>
                <div className='profile-text'>
                  <h1>{data.details.name}</h1>
                  <h5>Artist at Universal Music Group</h5>
                  <div className='profile-socials'>
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                    <FontAwesomeIcon icon={faXTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                </div>
              </div>
              <div className='profile-bio'>
                <h5>"{data.details.bio}"</h5>
              </div>
              <div className='profile-about'>
                <h3>About</h3>
                <div className='profile-section'>
                  <h5><FontAwesomeIcon icon={faUser} size='xl' /> he/him</h5>
                  <h5><FontAwesomeIcon icon={faLocationDot} size='xl' /> {data.details.city}, {data.details.country}</h5>
                </div>
                <br />
                <h3>Contact</h3>
                <div className='profile-section'>
                  <h5><FontAwesomeIcon icon={faPhone} size='xl' /> 647-261-9091</h5>
                  <h5><FontAwesomeIcon icon={faEnvelope} size='xl' /> nicki@minaj.com</h5>
                  <h5><FontAwesomeIcon icon={faGlobe} size='xl' /> renzzi.ca</h5>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  )
}
