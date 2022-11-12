import { Card, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import UserService from '../../services/UserService';
import musicDataService from '../../services/MusicService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
)

function Dashboard() {
  const [user, setUser] = React.useState([])
  const [chartData, setChartData] = useState({
    datasets: [],
  })
  const [chartOptions, setChartOptions] = useState({})
  const [song, setSong] = useState()
  const [artist, setArtist] = useState()
  const [album, setAlbum] = useState()

  React.useEffect(() => {
    getAllMusic();
    getUser();
    setChartData({
      labels: ["Song", "Artist", "Album", "Users"],
      datasets: [
        {
          label: "hide",
          data: [song, artist, album, user],
          borderColor: "rgb(53,162,225"
        }
      ]
    })
    setChartOptions({
      responsive: true,
      Plugin: {
        legend: {
          position: "top"
        },
        Title: {
          display: true,
          text: "ehom let the dog out",
        }
      }
    })
  }, [song, artist])
  const getUser = async () => {
    const data = await UserService.getAllUser();
    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length)
  }
  const getAllMusic = async () => {
    const Music = await musicDataService.getAllMusic();
    const music = Music.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setSong(music.length)
    const d = music && music?.map((item) => item.album)
    const albumArr = [...new Set(d)]
    setAlbum(albumArr.length)
    const Artst = music && music?.map((item) => item.artist)
    const artistArr = [...new Set(Artst)]
    setArtist(artistArr.length)
  }

  return (

    <Box sx={{ color: '#FFFFFF', minWidth: '100%', minHeight: '100vh', mt: 4 }}>
      <Card>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Box>
            <Typography variant='h4' sx={{ ml: '40px', color: "black", fontWeight: 600, opacity: 0.5 }}>Hi Welcome back</Typography>
          </Box>
        </Stack>
        <Box sx={{ ml: 5, mt: 8 }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box
              sx={{ width: 170, height: 170, borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", '&:hover': { backgroundColor: 'primary.main', opacity: 0.7, display: 'block', } }}>
              <Typography sx={{ color: '#FFFFFF' }} variant='h4' ml={3} mt={5}>{song}</Typography>
              <Typography sx={{ color: '#FFFFFF' }} ml={5}>Total Songs</Typography>
            </Box>
            <Box sx={{ width: 170, height: 170, borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", '&:hover': { backgroundColor: 'primary.main', opacity: 0.7, } }}>
              <Typography sx={{ color: '#FFFFFF' }} variant='h4' ml={3} mt={5}>{artist}</Typography>
              <Typography sx={{ color: '#FFFFFF' }} ml={5}>Total Artist</Typography>
            </Box>
            <Box sx={{ width: 170, height: 170, borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", '&:hover': { backgroundColor: 'primary.main', opacity: 0.7, } }}>
              <Typography sx={{ color: '#FFFFFF' }} variant='h4' ml={3} mt={5}>{album}</Typography>
              <Typography sx={{ color: '#FFFFFF' }} ml={5}>Total Albums</Typography>
            </Box>
            <Box sx={{ width: 170, height: 170, borderRadius: 6, background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", '&:hover': { backgroundColor: 'primary.main', opacity: 0.7, } }}>
              <Typography sx={{ color: '#FFFFFF' }} variant='h4' ml={3} mt={5}>{user}</Typography>
              <Typography sx={{ color: '#FFFFFF' }} ml={5}>users</Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
      <Container maxWidth="lg">
        <Box sx={{ mt: 10 }}>
          <Bar
            height={70}
            option={chartOptions} data={chartData}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Dashboard