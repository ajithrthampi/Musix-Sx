import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import favDataService from '../../services/favServices'
import recentDataService from '../../services/recentServices'
import { useDispatch } from 'react-redux'
import { playing, songIndex, pause, Play, musicRef, play } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { async } from '@firebase/util';


const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  card: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
  },
}

function Favourite() {
  const dispatch = useDispatch()
  const [isPlay, setIsPlay] = useState(false)
  const [currentSong, setCurrentSong] = useState()
  const [song, setSong] = useState()
  const isPLay = useSelector((state => state.currentTrack.isPlaying));
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [Delete, setDelete] = useState(false)

  useEffect(() => {
    getRrecent()
    localStorage.getItem("email")
  }, [reducerValue])

  const getRrecent = async () => {
    const unId = localStorage.getItem("email")
    console.log(unId)
    const Music = await favDataService.getAllfav();
    const music = Music.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = music && music?.filter(n => n.email === unId)
    console.log(fil)
    setSong(fil)
  }
  const handleClickPLay = async (id, e, index, item) => {
    console.log("music", e)
    dispatch(play(true))
    setCurrentSong(item)
    if (!isPlay) {
      await recentDataService.addRecent(e)
      console.log(index)
      dispatch(play(true))
      dispatch(playing(e))
      dispatch(songIndex(index))
      dispatch(musicRef(id))
    } else {
      dispatch(pause(true))
    }
  }
  const handleDeleteFavorite = async (id) => {
    forceUpdate();
    await favDataService.deletefav(id)
    setDelete(true)

  }

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
            ml:2,
            color: '#FFFFFF',
            fontWeight: 600,
            opacity: 0.5
          }}>Favourite Tracks</Typography>
          <Typography variant="h3" style={styles.overlay} sx={{
            top: '50px',
            left: '20px',
            ml:2,
            color: '#FFFFFF',
            fontWeight: 600,
          }}>Favourites </Typography>
        </Box>
      </Box>
      <Card sx={{ background: "rgba(0, 0, 0,0.31)" }}>
        <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>
          <Box sx={{ height: '50vh', left: 0 }} >
            {song && song.map((item, index) => (
              <Box key={index} sx={{ mt: 4 }}>
                <Stack direction="row" spacing={0} justifyContent="space-between" >
                  <Box>
                    <Stack direction="row" spacing={0} justifyContent="space-between" >
                      <Typography color="#FFFFFF" sx={{ fontSize: 13, mt: 2 }}> </Typography>
                      <Box sx={{ height: 20, width: 80, bgcolor: "#FFFFFF", borderRadius: 2, ml: 2 }}>
                        <CardMedia
                          component="img"
                          height="60"
                          image={item.imageurl}
                          alt="Artists"
                        />
                      </Box>
                      <Box>
                        <Typography style={{ fontSize: 14, fontWeight: 400, }} color="#FFFFFF" sx={{
                          ml: 1, mt: 1
                        }} >{item.song}</Typography>
                        <Typography sx={{ display: { xs: "none", sm: "block" } }} style={{ fontSize: 12, fontWeight: 400, }} color="#FFFFFF" sx={{
                          ml: 1,
                        }} >{item.artist}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box sx={{ display: { xs: "none", sm: "block" } }} >
                    <Typography style={{ fontSize: 14, fontWeight: 400, }} color="#FFFFFF" sx={{
                      ml: 1, mt: 1
                    }} ></Typography>
                  </Box>
                  <Box >
                    <Box sx={{ mt: 1 }}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <button onClick={() => handleClickPLay(item.musicUrl, song, index, item)} className='play-btn'>
                          {/* <audio src={currentSong} ref={audioElm} /> */}
                          {currentSong === item && isPLay ? <PauseCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <PlayCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} />}
                        </button>
                        <button className='play-btn' onClick={() => handleDeleteFavorite(item.id)}><DeleteIcon sx={{ mr: 8, color: "#FFFFFF" }} /></button>
                        </Grid>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Favourite