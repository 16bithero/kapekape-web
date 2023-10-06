import React from 'react'
import QRCode from 'react-qr-code';

export default function ShareQR() {
    const id = '6509454cd67ca264879118dd';
    const url = `https://kapekape-backend.vercel.app/api/user/${id}`;

    return (
        <>
            <div>ShareQR</div>
            <QRCode
                title="Your Profile"
                value={url}
                bgColor='black'
                fgColor="white"
            />
        </>
    )
}
