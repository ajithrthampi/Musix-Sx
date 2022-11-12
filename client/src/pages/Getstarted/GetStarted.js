import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

function GetStarted() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('email')
    user ? navigate('/home/explore') : navigate('/')
  }, [])

  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#FFFFFF', height: '100vh', borderRadius: 14 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant='h5' sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 5, mt: 2 }}>MusicSx</Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Box>
                  <Typography sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 5, mt: 3, display: { xs: 'none', sm: 'block' } }}><NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/login'}>Login</NavLink></Typography>
                </Box>
                <Box>
                  <Typography sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 5, mt: 3, mr: 5 }}><NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/signup'}>Signup</NavLink></Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Box>
            <Typography variant='h3' sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 10, mt: 5, display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>Listen To Your <br />  Favorite Music <br />  With Your <br />  Friends</Typography>
          </Box>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box>
              <Typography variant='h6' sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 10, mt: 5, display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' }, opacity: 0.6 }}>Listen to your Favorite music with your friends with  <br />  MusicSx, anywhere, anytime 100% free </Typography>
              <Button sx={{ ml: 10, mt: 3 }} variant="contained"><NavLink style={{ textDecoration: 'none', color: '#FFFFFF' }} to={'/signup'}>Get Started</NavLink></Button>
            </Box>
            <Box sx={{ mt: 10 }}>
              <Typography variant='h4' sx={{ top: '10px', left: '20px', color: 'black', fontWeight: 800, ml: 10, mt: 8, mr: 5, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>Start Listening <br />  From Now <br />  On</Typography>
              <Button sx={{ ml: 10, mt: 3, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} variant="contained"><NavLink style={{ textDecoration: 'none', color: '#FFFFFF' }} to={'/signup'}>Signup Now</NavLink></Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </div>
  )
}

export default GetStarted