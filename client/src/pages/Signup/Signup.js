import styled from '@emotion/styled';
import { Box, Container, CssBaseline, InputBase, Typography, alpha, Button, Alert } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import userDataServices from '../../services/UserService'
import './signup.css'

export default function Signup({ }) {
  const [name, setName] = useState('')
  const [emailReg, setEmailReg] = useState()
  const [passEx, setPassEx] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = React.useState("")
  const [message, setMessage] = useState(false)
  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  useEffect(()=>{
    const user =localStorage.getItem("email")
    console.log("email", email)
    user? navigate('/home/explore'):navigate('/signup')
  },[])

  const handleSubmit = async (e) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmailReg(regEx)
    const nameEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const passwordEx = /^(?=.*{8, 20})$/
    setPassEx(passwordEx)
    if (regEx.test(email) && nameEx.test(name) && password) {
      try {
        await signUp(email, password)
        const newUser = {
          name,
          email,
        }
        localStorage.setItem("email", email)
        try {
          await userDataServices.addUser(newUser)
        } catch (error) {
          console.log("ERROR")
        }
        navigate('/home/explore')
      } catch (error) {
        setError(error)
        e.preventDefault()
      }
    } else if (!regEx.test(email)) {
      setMessage(true)
      e.preventDefault()
    } else if (!nameEx.test(name)) {
      setMessage(true)
    } else if (!passwordEx.test(password)) {
      setMessage(true)
    }
    else if (confirmPassword !== password) {
      setMessage(true)
    }
    e.preventDefault();
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
          <Box mt={1}>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Box mt={2}>
                <Typography variant="h7"
                  sx={{ fontWeight: 600, mt: 2, ml: 1, mr: 4 }}
                  color="#FFFFFF"
                ><Link to={'/'} style={{ textDecoration: 'none', color: "black", }}> Home </Link>
                </Typography>
              </Box>

            </Stack>
          </Box>
        </Stack>
        <Container maxWidth="md">
          <Box mt={4} >
            <Box sx={{ bgcolor: "transparent", }}>
              <Container maxWidth="xs">
                <Box sx={{ borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", height: '80vh', }} >
                  <div className="signup">
                    <h1> Create new account</h1>
                    <input type="text" placeholder="Name" required="required" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    <Box sx={{ color: 'red' }}>{message && !name ? "Enter a valid Name" : ""}</Box>
                    <input type="text" placeholder="Email" required="required" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                    <Box sx={{ color: 'red' }}>{message && !emailReg.test(email) ? "Enter a valid Email" : ""}</Box>
                    <input type="password" placeholder="Password" required="required" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                    <Box sx={{ color: 'red' }}>{message && !password ? "Enter Password" : ''}</Box>
                    <input type="password" placeholder="Confirm Password" required="required" defaultValue={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Box sx={{ color: 'red' }}>{message && confirmPassword !== password ? "Confirm Your Password" : ''}</Box>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block btn-large">Get Started</button>
                    <Box mt={2}> {error && <Alert severity="error">Error Occured Try Again!</Alert>}</Box>
                    <Typography sx={{ mt: 6, ml: 7, color: '#FFFFFF', opacity: 0.5 }}>Already an User ?<Link to={'/login'} style={{ textDecoration: 'none', color: "#FFFFFF" }}>Login Now </Link> </Typography>
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

