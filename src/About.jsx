import React from 'react'
import { Stack } from '@mui/material';
import './App.css'
import QR from './assets/QRCup.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'


export default function About() {
    return (
        <>
            <div className='custom-body'>
                <div className='custom-container'>
                    <div className='landing-area'>
                        <h1>About</h1>
                        <Stack spacing={2} alignItems="center" justifyContent="center">
                            <img src={QR} alt='QR' className='login-image' style={{ width: '50%', transform: 'rotate(20deg)' }} />
                        </Stack>
                        <div style={{color:'black', padding: '1em'}}>
                            <h3 className='intro-text'>'Kape-Kape' is a Filipino phrase commonly used when people invite each other for small talk and coffee.
                                This phrase inspired our app, a digital business card app that allows users to create meaningful connections with just a click of a QR code.</h3>
                            <h3 className='intro-text'>Developed by 16BitHero.</h3>
                            <a href="https://www.renzzi.ca" style={{ marginLeft: '1em',color: '3d42b3'}}><FontAwesomeIcon icon={faStar} size="xl" /></a>
                            <a href="https://github.com/16bithero" style={{ marginLeft: '1em',color: '3d42b3'}}><FontAwesomeIcon icon={faGithub} size="xl" /></a>
                            <a href="https://www.linkedin.com/in/renzziadorador" style={{ marginLeft: '1em',color: '3d42b3'}}><FontAwesomeIcon icon={faLinkedin} size="xl" /></a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
