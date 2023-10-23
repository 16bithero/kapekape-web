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
        <div className='custom-container' style={{height:'100%'}}>
          {data.details && (
            <>
              <div className='profile-banner'>
                <div className='profile-image'>
                  <img src={data.details.image} alt="profile-picture" className="custom-image" />
                </div>
                <div className='profile-text'>
                  <h1>{data.details.fname} {data.details.lname}</h1>
                  <h5>{data.details.title} {data.details.company ? `at ${data.details.company}` : ""}</h5>
                  <div className='profile-socials'>
                    {data.details.social.github ? (
                      <a href={`https://github.com/${data.details.social.github}`}>
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    ) : ""}
                    {data.details.social.facebook ? (
                      <a href={`https://facebook.com/${data.details.social.facebook}`}>
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    ) : ""}

                    {data.details.social.linkedin ? (
                      <a href={`https://www.linkedin.com/in/${data.details.social.linkedin}`}>
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </a>
                    ) : ""}

                    {data.details.social.twitter ? (
                      <a href={`https://www.twitter.com/${data.details.social.twitter}`}>
                        <FontAwesomeIcon icon={faXTwitter} />
                      </a>
                    ) : ""}

                    {data.details.social.instagram ? (
                      <a href={`https://www.instagram.com/${data.details.social.instagram}`}>
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    ) : ""}
                  </div>
                </div>
              </div>
              <br />
              <div className='profile-about'>
              <h3>About {data.details.fname}</h3>
              <div className='profile-bio'>
              <h5>"{data.details.bio}"</h5>
                </div>
              </div>
              <br />
              <div className='profile-about'>
                <h3>Contact</h3>
                <div className='profile-section'>
                  <h5><FontAwesomeIcon icon={faUser} size='lg' /> {data.details.pronouns}</h5>
                  <h5><FontAwesomeIcon icon={faLocationDot} size='lg' /> {data.details.city}, {data.details.country}</h5>
                </div>

                <div className='profile-section'>
                  <h5><FontAwesomeIcon icon={faPhone} size='lg' /> {data.details.phone}</h5>
                  <h5><FontAwesomeIcon icon={faEnvelope} size='lg' /> {data.email}</h5>
                  <h5><FontAwesomeIcon icon={faGlobe} size='lg' /> <a href={`https://www.${data.details.website}`}>{data.details.website}</a></h5>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  )
}
