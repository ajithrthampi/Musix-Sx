import React, { useEffect, useReducer, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import { Artists } from '../../data/Artists';
import './explore.css';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import musicDataService from '../../services/MusicService';
import { useDispatch } from 'react-redux'
import recentDataService from '../../services/recentServices'
import favDataService from '../../services/favServices'
import { playing, songIndex, pause, Play, musicRef, play } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import Banner from '../../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { connectStorageEmulator } from 'firebase/storage';



function Explore() {
    const dispatch = useDispatch()
    const [isPlay, setIsPlay] = useState(false)
    const [music, setMusic] = useState()
    const [favmusic, setFavMusic] = useState()
    const [song, setCurrentSong] = useState();
    const [favName, setFavName] = useState();
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    const currentSong = useSelector((state) => state.currentTrack.value);
    const isPLay = useSelector((state => state.currentTrack.isPlaying));


    useEffect(() => {
        getAllMusic()
        const user = localStorage.getItem("email")
        setEmail(localStorage.getItem("email"))
        user ? navigate('/home/explore') : navigate('/login')
    }, [reducerValue])

    const getAllMusic = async () => {
        const unId = localStorage.getItem("email")
        const Music = await musicDataService.getAllMusic();
        const favMusic = await favDataService.getAllfav()
        setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const data = favMusic?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const fil = data && data?.filter(n => n.email === unId)
        setFavMusic(fil)
        const SongName = fil && fil?.map((doc) => {
            return doc.song
        })
        setFavName(SongName)
    }

    //ON CLICK PLAY BUTTON//

    const handleClickPLay = async (id, e, index, item) => {
        dispatch(play(true))
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

    //ADDING TO FAVOURITES //

    const handleFav = async (e) => {
        const check = favName && favName?.includes(e.song)
        if (!check) {
            setCurrentSong(e)
            const fav = {
                ...e,
                email,
            }
            await favDataService.addfav(fav)
            forceUpdate()
        }else{
            const Unlike = favmusic&&favmusic?.filter((n)=>n.song ===e.song)
           await favDataService.deletefav(Unlike[0]?.id)
           forceUpdate()
        }
    }


    return (
        <Box sx={{ mt: 8 }} >
            <Banner />
            <Card sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block", overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }, }} >
                <CardContent height="725"
                    bgcolor="rgba(0, 0, 0,0.31)"
                >
                    <Typography justifyContent="space-between" style={{ fontWeight: 600, }} color="#FFFFFF" sx={{
                        ml: 1, mb: 2
                    }} > Top Artists </Typography>
                    <Stack direction="row" spacing={4} >
                        {Artists.map((item, index) => (
                            <Card sx={{ maxWidth: 150, background: "rgba(0, 0, 0,0.31)" }}>
                                <CardMedia
                                    component="img"
                                    height="75"
                                    image={item.links.images[0].url}
                                    alt="Artists"
                                />
                                <CardContent sx={{ background: "rgba(0, 0, 0,0.31)" }}   >
                                    <Typography variant="body2" color="#FFFFFF">
                                        {item.artist}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </CardContent>
            </Card>

            {/* TOP CHART */}

            <Card sx={{ background: "rgba(0, 0, 0,0.31)" }}>
                <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>
                    <Box sx={{ height: '50vh', left: 0 }} >
                        {music && music.map((item, index) => (

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
                                                <button className='play-btn' onClick={() => handleFav(item)}>{favName && favName?.includes(item.song) ? <FavoriteIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <FavoriteBorderIcon sx={{ mr: 8, color: "#FFFFFF" }} />}</button>
                                                {/* {favName&&favName?.includes(item.song)===item ? setLike(false):setLike(true)} */}
                                                <button onClick={() => handleClickPLay(item.musicUrl, music, index, item)} className='play-btn'>
                                                    {song === item && isPLay ? <PauseCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <PlayCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} />}
                                                </button>
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
export default Explore