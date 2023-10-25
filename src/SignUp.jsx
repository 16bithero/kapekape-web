import React from 'react'
import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import QR from './assets/QR.png'
import { Link } from 'react-router-dom';
import styled from '@mui/material/styles/styled';

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

export default function SignUp() {
  const style = {
    button: {
      backgroundColor: '#292929',
      border: '1px solid #080808',
      color: 'white',
      fontWeight: 'bold',
      width: '250px',
    },
  };

  const INITIAL_VALUE = {
    username: '',
    email: '',
    password: '',
  }

  let navigate = useNavigate();
  const [data, setData] = useState(INITIAL_VALUE)
  const [error, setError] = useState('')
  const validInput = new RegExp('^[A-Za-z]+$');
  const [fnameErr, setFnameErr] = useState(false);
  const [lnameErr, setLnameErr] = useState(false);


  const addUser = async (event) => {
    event.preventDefault()
    if (validInput.test(data.first_name) && validInput.test(data.last_name)) {
      const signup = {
        username: data.username,
        email: data.email,
        password: data.password,
      }
      axios.post('https://kapekape-backend.vercel.app/api/user/add', signup)
        .then(res => navigate('/login'))
        .catch(function (error) {
          setError(' (Username already exists)')
        })
    } setLnameErr(!validInput.test(data.last_name))
    setFnameErr(!validInput.test(data.first_name))
  }

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
            <form onSubmit={addUser}>
              <FormControl>
                <Stack spacing={3} alignItems="center" justifyContent="center">
                <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '250px'}} id="username" label="Username" variant="filled" name="username" value={data.username} onChange={onValueChanged} />
                <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '250px'}} id="email" label="Email" variant="filled" name="email" value={data.email} onChange={onValueChanged} />
                <CustomTextField InputProps={{ disableUnderline: true }} style={{ width: '250px'}} id="password" label="Password" type='password' variant="filled" name="password" value={data.password} onChange={onValueChanged} />
                  <Button fullWidth variant="contained" type='submit' style={style.button}>Sign Up</Button>
                <h3>Already have an account? <Link to={"/login"}>Log In</Link></h3>
                </Stack>
              </FormControl>
            </form>
            <h4 style={{ color: '#E32636', fontWeight: 'bold', textAlign: 'center' }}>{ }</h4>
          </Stack>
        </div>
      </div>
    </>
  )
}
