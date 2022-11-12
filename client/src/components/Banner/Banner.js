import React, { useEffect, useState } from 'react'
import { Box, ButtonBase, Grid, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import './banner.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import musicDataService from '../../services/MusicService';
import styled from '@emotion/styled';

const Img = styled('img')({
    display: 'block',
    marginLeft: "30px",
    maxWidth: '140%',
    maxHeight: '200%',
});

function Banner() {

    const [music, setMusic] = useState()
    const [slideIndex, setSlideIndex] = useState(0)

    useEffect(() => {
        getAllMusic()
    }, [])
    const getAllMusic = async () => {
        const Music = await musicDataService.getAllMusic();
        setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const nextSlide = async () => {
        if (slideIndex === music.length) {
            setSlideIndex(0)
        } else {
            setSlideIndex(slideIndex + 1)
        }
    }
    const prevSlide = async () => {
        if (slideIndex === 0) {
            setSlideIndex(0)
        } else {
            setSlideIndex(slideIndex - 1)
        }
    }

    return (
        <div>
            <Box className='container-slider' >
                <Paper
                    sx={{
                        p: 2,
                        pt: 5,
                        margin: 'auto',
                        maxWidth: 800,
                        flexGrow: 1,
                        backgroundColor: 'transparent'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 131, height: 129, ml: 4 }}>
                                <Img alt="complex" src={music && music[slideIndex]?.imageurl} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography sx={{
                                        top: '10px',
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                        ml: 6,
                                        opacity: 0.5,

                                    }} gutterBottom variant="subtitle1" component="div">
                                        Trending New Hits
                                    </Typography>
                                    <Typography variant="h3" sx={{
                                        top: '50px',
                                        ml: 6,
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                    }} gutterBottom>
                                        {music && music[slideIndex]?.song}
                                    </Typography>
                                    <Typography sx={{
                                        top: '110px',
                                        ml: 6,
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                    }}>{music && music[slideIndex]?.artist}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">

                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Stack direction='row' justifyContent='space-between'>
                    <Box> <button className='play-btn' onClick={prevSlide} ><KeyboardArrowLeftIcon fontSize='large' sx={{ color: '#FFFFFF' }} /></button></Box>
                    <Box><button className='play-btn' onClick={nextSlide}><KeyboardArrowRightIcon fontSize='large' sx={{ color: '#FFFFFF' }} /></button></Box>
                </Stack>
            </Box>
        </div>
    )
}

export default Banner