import styled from '@emotion/styled';
import { Box, Container, CssBaseline, InputBase, Typography, alpha, Button, Alert } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailReg,setEmailReg] = useState()
  const [error, setError] = useState('');
  const { signIn } = useUserAuth();
  const [loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    const user =localStorage.getItem("email")
    console.log("email", email)
    user? navigate('/home/explore'):navigate('/login')
  },[])
  
  const handleSubmit = async (e) => {
    setIsLoading(true)
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmailReg(regEx)
    if(regEx.test(email)){
         try {
      console.log(email)
      localStorage.setItem("email", email)
      await signIn(email, password)
      navigate('/home/explore')
    } catch (error) {
      setError("Invalid Password ")
    }
    }else if(!regEx.test(email)){
       setMessage(true)
    }else if(!password){
      setMessage(true)
    }
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#FFFFFF", width: '100%', height: '100vh', }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Box ml={3}>
            <Typography variant="h6"
              sx={{ fontWeight: 600, mt: 1, ml: 1, }}
              color="black"
            > MusicSx
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Box mt={2}>
                <Typography variant="h7"
                  sx={{ fontWeight: 600, mt: 2, ml: 1, mr: 4 }}
                  color="#FFFFFF"
                > <Link to={'/'} style={{ textDecoration: 'none', color: "black", }}>Home</Link>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Container maxWidth="md">
          <Box mt={4} >
            <Box sx={{ bgcolor: "transparent", }}>
              <Container maxWidth="xs">
                <Box sx={{ borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", height: '80vh' }} >
                  <div className="login">
                    <h1>Welcome back !</h1>
                    <input type="text" placeholder="Email" required="required" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                    <Box sx={{color:'red'}}>{message && !emailReg.test(email)? "Enter a valid Email":""}</Box>
                    <input type="password" placeholder="Password" required="required" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                    <Box sx={{color:'red'}}>{message && !password?"Enter Password":''}</Box>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                    <Box mt={2}> {error && <Alert severity="error">{error}</Alert>}</Box>
                    <Typography sx={{ mt: 6, ml: 7, color: '#FFFFFF', opacity: 0.5 }}>New User ?<Link to={'/signup'} style={{ textDecoration: 'none', color: "#FFFFFF" }}>Sign up Now </Link> </Typography>
                  </div>
                </Box>
              </Container>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
export default Login