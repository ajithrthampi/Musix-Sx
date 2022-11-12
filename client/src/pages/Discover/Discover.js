import styled from '@emotion/styled';
import { alpha, Box, Card, CardContent, CardMedia, Grid, InputBase, MenuItem, Select, TextField, Typography, } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import musicDataService from '../../services/MusicService';
import recentDataService from '../../services/recentServices';
import favDataService from '../../services/favServices'
import { useDispatch } from 'react-redux'
import { playing, songIndex, pause, Play, musicRef, play } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



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

//SEARCH BAR STYLES //

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#FFFFFF",
  opacity: 0.8,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
      height: '5vh'
    },
  },
}));

function Discover() {
  const [search, setSearch] = useState("");
  const isPLay = useSelector((state => state.currentTrack.isPlaying));
  const [isPlay, setIsPlay] = useState(false)
  const [music, setMusic] = useState()
  const [currentSong, setCurrentSong] = useState()
  const [email, setEmail] = useState()
  const dispatch = useDispatch()
  const [favName,setFavName] = useState();
  const [favmusic, setFavMusic] = useState()
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  console.log(search)
  useEffect(() => {
    getAllMusic()
    setEmail(localStorage.getItem("email"))
    console.log("email", email)
  }, [reducerValue])

  const getAllMusic = async () => {
    const unId = localStorage.getItem("email")
    const Music = await musicDataService.getAllMusic();
    const favMusic = await favDataService.getAllfav()
    setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    const data = favMusic?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = data && data?.filter(n => n.email === unId)
    setFavMusic(fil)
    const SongName = fil && fil?.map((doc)=>{
    return doc.song
    })
    setFavName(SongName)
  }
  const handleClickPLay = async (id, e, index, item) => {
    console.log("music", e)
    dispatch(play(false))
    setCurrentSong(item)
    const rec = {
      ...item,
      email
    }
    if (!isPlay) {
      await recentDataService.addRecent(rec)
      dispatch(play(true))
      dispatch(playing(e))
      dispatch(songIndex(index))
      dispatch(musicRef(id))
    } else {
      dispatch(pause(true))
    }
  }
  const handleFav = async (e) => {
    const check = favName && favName?.includes(e.song)
    if(!check){
      const fav = {
        ...e,
        email
      }
      console.log("merged data", fav)
      await favDataService.addfav(fav)
      forceUpdate()
    }else{
      const Unlike = favmusic&&favmusic?.filter((n)=>n.song ===e.song)  
      await favDataService.deletefav(Unlike[0]?.id)
      forceUpdate()
    }
   
  }

  return (
    <Box maxHeight="800vh" sx={{ mt: 8, bgcolor: "rgba(0, 0, 0,0.31)" }}>
      <Box height="40vh" sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 5 }} >
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
          }}>Search Any Music</Typography>
          <Typography variant="h3" style={styles.overlay} sx={{
            top: '50px',
            left: '20px',
            ml:2,
            color: '#FFFFFF',
            fontWeight: 600,
          }}>Discover Songs </Typography>

          <Box mt={21} ml={4} style={styles.overlay} >
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…song by name ,artist, album"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Box>
        </Box>
      </Box>
      <Card sx={{ mt: 2, background: "rgba(0, 0, 0,0.31)" }}>
        <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>
          <Box sx={{ maxHeight: '100vh', left: 0 }} >
            {music && music.filter((item) => {
              return search.toLowerCase() === ''
                ? item : item.song.toLowerCase().includes(search)
            }).map((item, index) => (
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
                        <button onClick={() => handleClickPLay(item.musicUrl, music, index, item)} className='play-btn'>
                          {currentSong === item && isPLay ? <PauseCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <PlayCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} />}
                        </button>
                        <button className='play-btn' onClick={() => handleFav(item)}>{favName&&favName?.includes(item.song)? <FavoriteIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <FavoriteBorderIcon sx={{ mr: 8, color: "#FFFFFF" }} />}</button>
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

export default Discover