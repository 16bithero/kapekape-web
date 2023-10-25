import React from 'react'
import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QR from './assets/QR.png'
import styled from '@mui/material/styles/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomTextField = styled(TextField)({
    '& .MuiFilledInput-root': {
        borderRadius: 10,
        backgroundColor: '#eef1f4',
        border: '1px solid #080808',
        borderColor: '#080808',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            borderColor: '#080808',
        },
    },
});

export default function Login({ setIsAuthenticated }) {
    let navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const style = {
        button: {
            backgroundColor: '#292929',
            border: '1px solid #080808',
            color: 'white',
            fontWeight: 'bold',
            width: '250px',
        },
    };

    const notify = () => toast.success('Login Success', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });

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

            notify();
            setTimeout(() => {
                setIsAuthenticated(true);
                navigate('/home');
            }, 2500);
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
                                    <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '250px' }} id="email" label="Email" variant="filled" name="email" value={data.email} onChange={onValueChanged} />
                                    <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '250px' }} id="password" label="Password" type='password' variant="filled" name="password" value={data.password} onChange={onValueChanged} />
                                    <Button fullWidth variant="contained" type='submit' style={style.button}>Login</Button>
                                    <h3>New to Kape-Kape? <Link to={"/signup"}>Sign Up</Link></h3>
                                </Stack>
                            </FormControl>
                        </form>
                        <h4 style={{ color: '#E32636', fontWeight: 'bold', textAlign: 'center' }}>{error}</h4>
                    </Stack>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
            </div>
        </>
    )
}
