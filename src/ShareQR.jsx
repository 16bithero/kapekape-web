import { Button, Stack } from '@mui/material';
import React from 'react'
import QRCode from 'react-qr-code';

export default function ShareQR() {

    const username = localStorage.getItem('username');
    const url = `http://192.168.2.48:5173/profile/${username}`;

    return (
        <>
            <div className='custom-body'>
            <h1 style={{textAlign:'center'}}>Share your QR Code</h1>
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <QRCode
                        title="Your Profile"
                        value={url}
                        bgColor='black'
                        fgColor="white"
                    />
                    <br />
                    <Button>Save to Device</Button>
                    <Button>Save to Apple Wallet</Button>
                    <Button>Save to Google Pass</Button>
                </Stack>
            </div>
        </>
    )
}
