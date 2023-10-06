import React from 'react'
import './Login.css'
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

export default function Login() {
    return (
        <>
            <div className='body-login'>
                <div className='body-container'>
                    <div className='body-content'>
                        <Stack spacing={4} alignItems="center" justifyContent="center">
                        <Skeleton variant="circular" width={200} height={200}/>
                        <TextField id="outlined-basic" label="Email" variant="outlined" className='custom-textfield'/>
                        <TextField id="outlined-basic" label="Password" fullWidthtype='password' variant="outlined"  className='custom-textfield'/>
                        <Button variant="contained" fullWidth>Login</Button>
                        </Stack>
                    </div>
                </div>


            </div>
        </>
    )
}
