import React from 'react'
import { useState } from 'react'
import './Login.css'
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function  Login({ setIsAuthenticated }) {
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
                console.log(username[0].username);
                console.log(username[0]._id);
                localStorage.setItem('username', username[0].username);
                localStorage.setItem('id', username[0]._id);
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
            <div className='body-login'>
                <div className='body-container'>
                    <div className='body-content'>
                        <Stack spacing={4} alignItems="center" justifyContent="center">
                            <Skeleton variant="circular" width={200} height={200} />
                            <form onSubmit={userLogin}>
                                <FormControl>
                                    <Stack spacing={3} alignItems="center" justifyContent="center">
                                        <TextField id="email" label="Email" variant="outlined" className='custom-textfield' name="email" value={data.email} onChange={onValueChanged} />
                                        <TextField id="password" label="Password" fullWidth type='password' variant="outlined" className='custom-textfield' name="password" value={data.password} onChange={onValueChanged} />
                                        <Button variant="contained" fullWidth type='submit'>Login</Button>
                                        <h3>New to Kape-Kape? <Link to={"/signup"}>Sign Up</Link></h3> 
                                    </Stack>
                                </FormControl>
                            </form>
                            <h4 style={{ color: '#E32636', fontWeight: 'bold', textAlign: 'center' }}>{error}</h4>
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    )
}
