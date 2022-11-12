import { Box, Container, CssBaseline, Alert } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userDataServices from '../../services/UserService'

function AdminLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false)
  const [emailReg, setEmailReg] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmailReg(regEx)
    if (regEx.test(email)) {
      try {
        const unId = localStorage.getItem("email")
        console.log(unId)
        const data = await userDataServices.getAllUser()
        const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const fil = userData && userData?.filter(n => n.emaiil === email)
        if (fil && fil?.filter(n => n.isAdmin === true)) {
          localStorage.setItem("admin", email)
          navigate('/admin/dashboard')
        } else {
          navigate('/adminlogin')
        }
      } catch (error) {
        setError("do not have Authorization")
      }
    } else if (!regEx.test(email)) {
      setMessage(true)
    } else if (!password) {
      setMessage(true)
    }
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#FFFFFF", width: '100%', height: '100vh', }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Box ml={3}>
          </Box>
          <Box>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Box mt={2}>
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
                    <h1>Admin Login</h1>
                    <Box sx={{ color: 'red' }}>{message && !emailReg.test(email) ? "Enter a valid Email" : ""}</Box>
                    <input type="text" placeholder="Username" required="required" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                    <Box sx={{ color: 'red' }}>{message && !password ? "Enter Password" : ''}</Box>
                    <input type="password" placeholder="Password" required="required" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                    <Box mt={2}> {error && <Alert severity="error">{error}</Alert>}</Box>
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
export default AdminLogin