import { Box, ButtonBase, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper, Slide, Stack, TextField, Typography } from '@mui/material'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import recentDataService from '../../services/recentServices'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useReducer, useState } from 'react'
import musicDataService from '../../services/MusicService';
import { useDispatch } from 'react-redux'
import { playing, songIndex, pause, Play, musicRef, play } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { TransitionProps } from '@mui/material/transitions';
import PlaylistDataService from '../../services/PlaylistService'
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../config/Firebase/FirebaseConfig';
import styled from '@emotion/styled';

const Transition = React.forwardRef(function Transition(
    props: TransitionHandlerProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function PlaylistTrackList(props) {
    const dispatch = useDispatch()
    const [isPlay, setIsPlay] = useState(false)
    const [smlBanner, setSmlBanner] = useState()
    const [track, setTrack] = useState()
    const [bannerTitle, setBannerTitle] = useState()
    const [music, setMusic] = useState()
    const [email, setEmail] = useState()
    const [currentSong, setCurrentSong] = useState()
    const [open, setOpen] = React.useState(false);
    const [song, setSong] = useState()
    const [playlistMusic, setPlaylistMusic] = useState()
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    const isPLay = useSelector((state => state.currentTrack.isPlaying));


    useEffect(() => {
        console.log("props", props.listdata)
        setMusic(props.listdata.todos)
        setSmlBanner(props.listdata.imageurl)
        setBannerTitle(props.listdata.playlistName)
        getAllMusic()
        setEmail(localStorage.getItem("email"))
        console.log("email", email)
    }, [reducerValue])

    const getAllMusic = async () => {
        const Music = await musicDataService.getAllMusic();
        setSong(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(music)
        const unId = localStorage.getItem('email')
        const data = await PlaylistDataService.getAllfav()
        const tobeFiltered = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setPlaylistMusic(tobeFiltered && tobeFiltered?.filter(n => n.email === unId))
    }

    const handleClickPLay = async (id, e, index, item) => {
        console.log("music", e)
        setIsPlay(!isPlay)
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
            console.log("whyyyyyyyyyyyyy")
        } else {
            dispatch(pause(true))
        }
    }
    //  const handleFav = async (e) => {
    //     const fav = {
    //         ...e,
    //         email
    //     }
    //     console.log("merged data", fav)
    //     await favDataService.addfav(fav)
    // }

    // ADDING SONGS TO PLAYLIST //

    const addSongs = async () => {
        setOpen(true);

    }
    const addToPlaylist = async (item) => {
        console.log(playlistMusic)
        //    console.log(console.log(d)
        // const cityRef = doc(db, 'playlist', props.listdata.id);
        // updateDoc(cityRef, {data});

        // await PlaylistDataService.addfav(add)
        alert('Added to playlist')
    }
    const handleClose = () => {
        setOpen(false)
    }
    // DELETE PLAYLIST //

    const deletePlaylist = async () => {
        await PlaylistDataService.deletefav(props.listdata.id)
        forceUpdate()
        alert('delete successfully')
    }
    return (
        <div>

            <Box height="40vh" sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 5 }}>
             
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: "transparent"
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 128, height: 128,ml:2 }}>
                                <Img  alt="complex" src={smlBanner} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="h3" sx={{
                                        color: '#FFFFFF', top: '110px',
                                        fontWeight: 600,
                                    }}>{bannerTitle}</Typography>
                                    <Typography variant="h6" sx={{
                                        top: '10px',
                                        left: '20px',
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                        opacity: 0.5,

                                    }}>
                                        <button onClick={deletePlaylist} className='play-btn'><DeleteIcon fontSize='large' sx={{ mt: 2,ml:2 }} /></button> Delete PLaylist

                                    </Typography>

                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            <Card sx={{ mt: 2, background: "rgba(0, 0, 0,0.31)" }}>
                <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>

                    <Box sx={{ maxHeight: '100vh', left: 0 }} >
                        {music && music?.map((item, index) => (
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

                                            <button onClick={() => handleClickPLay(item.musicUrl, music, index, item)} className='play-btn'>
                                                {/* <audio src={currentSong} ref={audioElm} /> */}
                                                {currentSong === item && isPlay ? <PauseCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} /> : <PlayCircleFilledIcon sx={{ mr: 8, color: "#FFFFFF" }} />}
                                            </button>
                                            {/* <AddIcon sx={{ color: "#FFFFFF" }} /> */}
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogContent sx={{
                    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                    maxHeight: '80vh', minHeight: '100vh', maxWidth: '100%'
                }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box>
                            <Typography sx={{ color: '#FFFFFF' }}> Select Songs</Typography>
                            <button onClick={handleClose} className='play-btn'><CloseIcon /></button>
                            <Card sx={{ mt: 2, background: "rgba(0, 0, 0,0.31)" }}>
                                <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>
                                    <Box sx={{ maxHeight: '100vh', left: 0 }} >
                                        {song && song?.map((item, index) => (
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
                                                            <button className='play-btn' onClick={() => addToPlaylist(item)}><AddIcon sx={{ color: "#FFFFFF" }} /></button>
                                                        </Box>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        ))}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Box>




                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PlaylistTrackList