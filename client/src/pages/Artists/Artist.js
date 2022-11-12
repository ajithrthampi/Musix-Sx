import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState, } from 'react'
import { Outlet } from 'react-router-dom'
import ArtistDataService from '../../services/ArtistService'
import musicDataService from '../../services/MusicService'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './artist.css'
import CardBanner from '../../components/CardBanner'
import { useDispatch, useSelector } from 'react-redux'
import {enable} from '../../reducers/PlayerReducer'

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  box: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
  }
}

function Artist() {
  const [artist, setArtist] = useState()
  const [item, setItem] = useState("")
  const [isenable, setIsEnable] = useState(true)
  const [showTracks, setShowTracks] = useState(false)
  const [filteredData, setFilteredData] = useState()
  const [artistData, setArtistData] = useState()
  const [music, setMusic] = useState("")
  const dispatch = useDispatch()
  const isShow = useSelector((state => state.currentTrack.isEnable));


  useEffect(() => {
    getAllMusic()
    getAllArtists()
   
  }, [])
  const getAllMusic = async () => {
    const Music = await musicDataService.getAllMusic();
    const data = Music?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setMusic(data)
  }
  const getAllArtists = async () => {
    const Artist = await ArtistDataService.getAllArtist();
    const data = Artist?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setArtist(data)
  }

  const ArtistHandler = (artistData) => {
    setShowTracks(!showTracks)
    setItem("")
    setItem(item.name)
    const d = music && music?.filter(n => n.artist === artistData.name)
    setFilteredData(d)
    setArtistData(artistData)
  }
  const albumClose = () => {
    setIsEnable(true)
    setShowTracks(false)
    dispatch(enable(false))
  }
  const normalizedAlbumData = artist && artist?.map((item) => ({
    id: item?.id,
    title: item?.name,
    src: item?.imageurl,
    artist: item?.artist,
  }));
  
  return (
    <Box sx={{ mt: 8, bgcolor: "rgba(0, 0, 0,0.31)" }}>
      <Box height="30vh" sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 5 }} >
        <Box position="fixed" style={styles.box} >
          <Box
            height="225"
          />
          <Typography style={styles.overlay} sx={{
            top: '10px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
            opacity: 0.5
          }}>Latest Albums For You</Typography>
          <Typography variant="h3" style={styles.overlay} sx={{
            top: '50px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
          }}>Top Artists </Typography>
          <Typography style={styles.overlay} sx={{
            top: '110px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
            ml: 1
          }}></Typography>
        </Box>
      </Box>
      {isShow ?
        <Box>
          <Button onClick={albumClose}><ArrowBackIcon sx={{color:'#FFFFFF'}}/></Button>
        </Box> : ''
      }
      <Box sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 1 }} >
        <Outlet />
        <Box sx={{ mt: 1, overflow: 'auto' }} className='screen-container'>
          <Stack direction="row" spacing={1} >
            <Box  sx={{width:'100%'}}>
               <CardBanner  data={normalizedAlbumData} titleData={'artist'} />
            </Box>
          </Stack> 
        </Box>
      </Box>
    </Box>
  )
}

export default Artist