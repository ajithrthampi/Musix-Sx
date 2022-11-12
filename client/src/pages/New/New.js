import React, { useEffect, useReducer, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import musicDataService from '../../services/MusicService';
import recentDataService from '../../services/recentServices';
import favDataService from '../../services/favServices'
import { useDispatch } from 'react-redux'
import { playing, songIndex, pause, Play, musicRef, play } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


function New() {
    const isPLay = useSelector((state => state.currentTrack.isPlaying));
    const [isPlay, setIsPlay] = useState(false)
    const [music, setMusic] = useState()
    const [currentSong, setCurrentSong] = useState()
    const [email, setEmail] = useState()
    const [favmusic, setFavMusic] = useState()
    const [favName,setFavName] = useState();
    const dispatch = useDispatch()
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        getAllMusic()
        setEmail(localStorage.getItem("email"))
        console.log("email", email)

    }, [isPlay,reducerValue])
    const getAllMusic = async () => {
        const unId = localStorage.getItem("email")
        const Music = await musicDataService.getAllMusic();
        const favMusic = await favDataService.getAllfav()
        setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const data = favMusic?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const fil = data && data?.filter(n => n.email === unId)
        setFavMusic(fil)
        console.log(fil, "filterred")
        const SongName = fil && fil?.map((doc)=>{
        return doc.song
        })
        setFavName(SongName)
        console.log(music)
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
            console.log(index)
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
            console.log("unlike",Unlike)
            await favDataService.deletefav(Unlike[0]?.id)
            forceUpdate()
        }
       
    }
    return (
        <>
            <Card sx={{ mt: 8, background: "rgba(0, 0, 0,0.31)" }}>
                <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>

                    <Box sx={{ maxHeight: '100vh', left: 0 }} >
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
                                                <button className='play-btn'onClick={() => handleFav(item)}>{ favName&&favName?.includes(item.song)? <FavoriteIcon sx={{ mr: 8, color: "#FFFFFF" }} />:<FavoriteBorderIcon sx={{ mr: 8, color: "#FFFFFF" }} />}</button>
                                                <button onClick={() => handleClickPLay(item.musicUrl, music, index, item)} className='play-btn'>
                                                    {currentSong === item && isPLay ? <PauseCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <PlayCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} />}
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
        </>
    )
}

export default New