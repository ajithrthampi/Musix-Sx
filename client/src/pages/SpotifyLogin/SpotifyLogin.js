// import { Box, Button, Card, CardActions, CardContent, Container, Paper } from '@mui/material'
// import { Stack } from '@mui/system'
// import React from 'react'


// function SpotifyLogin() {
//   const handleClick = () => {
//     window.location = 'http://localhost:8888/login'
//   }
//   return (
//     <Box >
//       <Card sx={{ minWidth: 275, bgcolor: '#1DB954', height: '100vh' }}>
//         <CardContent>
//           <Box display="flex"
//             justifyContent="center"
//             alignItems="center"
//             top={45}
//             sx={{ bgcolor: '#1DB954', height: '100vh' }} >
//             <Stack sx={{
//               height: 200,
//               flexDirection: "column",
//               justifyContent: "center"
//             }}>
//               <Box sx={{ bgcolor: '#1DB954', height: '100vh' }} >
//                 <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black-768x230.png' />
//                 <Box ml={40} >
//                   <Button sx={{ background: '#000000', color: '#FFFFFF', borderRadius: 14 }} onClick={handleClick}>Login with Sotify</Button>
//                 </Box>
//               </Box>
//             </Stack>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   )
// }
// export default SpotifyLogin

import React from 'react'
import styled from "styled-components"
import './spotify.css'

export default function SpotifyLogin() {
  const handleClick=()=>{
    const clientId = "896ce5f70a0e4579a6aebe9efde8e036";
    const redirectUrl="http://localhost:3000/home/explore";
    const apiUrl ="https://accounts.spotify.com/authorize";
    const scope =[
       'user-read-email', 
       'user-read-private',
       'user-modify-playback-state',
        'user-read-playback-state', 
        'user-read-currently-playing', 
        'user-read-recently-played', 
        'user-read-playback-position',
         'user-top-read'
    ];
    window.location.href =`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
 
  }
  return (
   <div className='main'>
    <img className='imgtag' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black-768x230.png' alt='spotify'/>
    <button className='btn' onClick={handleClick}>Connect Spotify</button>
   </div>
  )
}


