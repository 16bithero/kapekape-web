import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faFacebook, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';



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
      <div className='custom-body' style={{ backgroundColor: 'blue' }}>
        <div className='custom-container' style={{ height: '100%' }}>
          {data.details && (
            <>
              <div className='profile-banner'>
                {data.details.image ? (
                  <div className='profile-image'>
                    <img src={data.details.image} alt="profile-picture" />
                  </div>
                ) : (
                  <div className='profile-image'>
                    <Skeleton variant="circular" className='image-skeleton' sx={{ bgcolor: 'grey.200'}} />
                  </div>

                )}

        
                <div className='profile-text'>
                  <h1>{data.details.fname} {data.details.lname ? data.details.lname.charAt(0) + "." : 'Kape Kape'}</h1>
                  <h5>{data.details.title} {data.details.company ? `at ${data.details.company}` : "Digital Business Card App"}</h5>
               
                  {data.details.social ? (
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
                  ) : ""}
                </div>
                <br />
              </div>
              <br />
              <div className='bio-section'>
                <div className='profile-bio'>
                {data.details.bio ? (<h5>"{data.details.bio}"</h5>) : (<h5>"What's brewing today?"</h5>)}
                </div>
              </div>
              <br />




              <div className='profile-about'>
                <div className='info-row'>
                  <div className='label'>Name</div>
                  <div className='value'>{data.details.fname} {data.details.lname ? data.details.lname : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</div>
                </div>
                <hr />
                <div className='info-row'>
                  <div className='label'>Pronouns</div>
                  <div className='value'>{data.details.pronouns ? data.details.pronouns : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</div>
                </div>
                <hr />
                <div className='info-row'>
                  <div className='label'>Location</div>
                  <div className='value'>{data.details.city}, {data.details.country ? data.details.country : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</div>
                </div>
                <hr />
                <div className='info-row'>
                  <div className='label'>Phone</div>
                  <div className='value'>{data.details.phone? data.details.phone : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</div>
                </div>
                <hr />
                <div className='info-row'>
                  <div className='label'>Email</div>
                  <div className='value'>{data.email ? data.email : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</div>
                </div>
                <hr />
                <div className='info-row'>
                  <div className='label'>Website</div>
                  <div className='value'><a href={`https://www.${data.details.website}`}>{data.details.website ? data.details.website : <Skeleton variant="text" sx={{ fontSize: '1rem'}} />}</a></div>
                </div>

              </div>

            </>
          )}
        </div>

      </div>
    </>
  )
}
