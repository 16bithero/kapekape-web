import React from 'react'
import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import QR from './assets/QR.png'
import { Link } from 'react-router-dom';

export default function SignUp() {

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
          <Stack spacing={4} alignItems="center" justifyContent="center">
            <h1>Kape-Kape!</h1>
            <img src={QR} alt='QR' className='login-image' style={{ width: '80%' }} />
            <form onSubmit={addUser}>
              <FormControl>
                <Stack spacing={3} alignItems="center" justifyContent="center">
                  <TextField fullWidth id="username" label="Username" variant="outlined" className='custom-textfield' name="username" value={data.username} onChange={onValueChanged} />
                  <TextField fullWidth id="email" label="Email" variant="outlined" className='custom-textfield' name="email" value={data.email} onChange={onValueChanged} />
                  <TextField fullWidth id="password" label="Password" type='password' variant="outlined" className='custom-textfield' name="password" value={data.password} onChange={onValueChanged} />
                  <Button variant="contained" fullWidth type='submit'>Sign Up</Button>
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