import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AlbumDataService from '../../services/AlbumService'
import musicDataService from '../../services/MusicService'
import './album.css'
import { Outlet } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardBanner from '../../components/CardBanner'
import { useDispatch, useSelector } from 'react-redux'
import { enable} from '../../reducers/PlayerReducer'

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
function Album() {
  const [albumList, setAlbumList] = useState("")
  const [item, setItem] = useState("")
  const [tracks, setTracks] = useState();
  const [isenable, setIsEnable] = useState(true)
  const [showTracks, setShowTracks] = useState(false)
  const [filteredData, setFilteredData] = useState()
  const [albumdata, setAlbumData] = useState()
  const dispatch = useDispatch()
  const isShow = useSelector((state => state.currentTrack.isEnable));

  useEffect(() => {
    getAlbumList()
    getAllMusic()
  }, [])

  const getAlbumList = async () => {
    const album = await AlbumDataService.getAllAlbum();
    const data = album?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setAlbumList(data)
  }

  const getAllMusic = async () => {
    const Music = await musicDataService.getAllMusic();
    const data = Music?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setTracks(data)
    const filter = data.filter(n => n.song === "Hope")
  }
  const albumClose = () => {
    setIsEnable(true)
    setShowTracks(false)
    dispatch(enable(false))
  }
  const normalizedAlbumData = albumList && albumList?.map((item) => ({
    id: item?.id,
    title: item?.albumname,
    src: item?.imageurl,
    artist: item?.artist,
  }));
  const titleData = 'album'

  return (
    <Box sx={{ mt: 8, bgcolor: "rgba(0, 0, 0,0.31)" }}>
      {isenable ? <Box height="30vh" sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 5 }} >
        <Box position="fixed" style={styles.box} >
          <Box
            height="225"
          />
          <Typography style={styles.overlay} sx={{
            top: '10px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
            opacity: 0.5,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 100,
            ml:2
          }}>Latest Albums For You</Typography>
          <Typography variant="h3" style={styles.overlay} sx={{
            top: '50px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
            ml:2
          }}>Top Albums </Typography>
        </Box>
      </Box> : ''}
      {isShow ?
        <Box>
          <Button onClick={albumClose}><ArrowBackIcon sx={{ color: '#FFFFFF' }} /></Button>
        </Box> : ''
      }
      <Box sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 1 }} >
        <Box sx={{ overflow: 'auto' }} className='screen-container'>
          <Stack direction="row" spacing={2} >
            <Box  sx={{width:'100%'}}>
              <CardBanner  data={normalizedAlbumData} titleData={titleData} />
            </Box>:
          </Stack>
          {/* {showTracks ? <AlbumList albumdata={albumdata} filteredData={filteredData} /> : console.log("hi")} */}
        </Box>
      </Box>
    </Box>
  )
}

export default Album