import { Stack } from '@mui/material';
import React from 'react'
import QRCode from 'react-qr-code';

export default function ShareQR() {

    const username = localStorage.getItem('username');
    const url = `https://kapekape.netlify.app/profile/${username}`;

    return (
        <>
            <div className='custom-body'>
                <div className='custom-container'>
                    <div className='landing-area' style={{height:'40dvh'}}>
                    <h1>QR Code</h1>
                    <Stack spacing={2} alignItems="center" justifyContent="center">
                    <QRCode
                            title="Profile QR Code"
                            value={url}
                            bgColor='white'
                            fgColor="black"
                            size={200}
                            
                        />
                        </Stack>
                    </div>
                    <Stack spacing={2} alignItems="center" justifyContent="center">
                       
                        <br />
                        <h3>Passes Coming Soon!</h3>
                        <img src='https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/add-to-apple-wallet-logo.png' alt='Apple Pass coming soon' style={{filter:'grayscale(100%)'}}height={50}></img>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Add_to_Google_Wallet_badge.svg/1024px-Add_to_Google_Wallet_badge.svg.png'   alt='Google Pass coming soon' style={{filter:'grayscale(100%)'}}height={50}></img>
                    </Stack>
                </div>
            </div>
        </>
    )
}
