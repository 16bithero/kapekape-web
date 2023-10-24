import React from 'react'
import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QR from './assets/QR.png'

export default function Login({ setIsAuthenticated }) {
    let navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    const userLogin = async (event) => {
        event.preventDefault();
        const login = {
            email: data.email,
            password: data.password,
        };
        try {
            await axios.post('https://kapekape-backend.vercel.app/api/user/login', login)
                .then(async (res) => {

                    const getUsername = await axios.get(`https://kapekape-backend.vercel.app/api/user/`);
                    //Checks if the email is in the database, then stores username in localstorage
                    const username = getUsername.data.filter((user) => user.email === data.email);
                    localStorage.setItem('username', username[0].username);
                    localStorage.setItem('id', username[0]._id);

                    const getDetail = await axios.get(`https://kapekape-backend.vercel.app/api/detail/${localStorage.getItem('id')}`);
                    if (getDetail.data.details) {
                        const details = getDetail.data.details;
                        if (details.name) localStorage.setItem('name', details.name);
                        if (details.city) localStorage.setItem('city', details.city);
                        if (details.country) localStorage.setItem('country', details.country);
                        if (details.bio) localStorage.setItem('bio', details.bio);
                        if (details.image) localStorage.setItem('image', details.image);
                        if (details.social) localStorage.setItem('social', details.social);
                    }
                })
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Invalid Credentials');
        }
    };

    const onValueChanged = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    return (
        <>
            <div className='custom-body'>
                <div className='login-container'>
                    <div className='login-brand'>
                        <h1>Kape-Kape!</h1>
                        <img src={QR} alt='QR' className='login-image' style={{ width: '50%' }} />
                    </div>
                    <Stack spacing={4} alignItems="center" justifyContent="center">
                        <form onSubmit={userLogin}>
                            <FormControl>
                                <Stack spacing={3} alignItems="center" justifyContent="center">
                                    <TextField id="email" label="Email" variant="outlined" className='login-textfield' name="email" value={data.email} onChange={onValueChanged} />
                                    <TextField  id="password" label="Password" type='password' variant="outlined" className='login-textfield' name="password" value={data.password} onChange={onValueChanged} />
                                    <Button fullWidth variant="contained"  type='submit'>Login</Button>
                                    <h3>New to Kape-Kape? <Link to={"/signup"}>Sign Up</Link></h3>
                                </Stack>
                            </FormControl>
                        </form>
                        <h4 style={{ color: '#E32636', fontWeight: 'bold', textAlign: 'center' }}>{error}</h4>
                    </Stack>
                </div>
            </div>
        </>
    )
}
