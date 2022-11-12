import { Box, LinearProgress, Slider, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import './player.css'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { pause, play, songIndex } from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'


function PLayer() {
  const audioPlayer = useRef();
  const clickRef = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentTrack.value);
  const isPlay = useSelector((state => state.currentTrack.isPlaying));
  const trackIndex = useSelector((state) => state.currentTrack.index);
  const [isPlaying, setIsPLaying] = useState(false);
  const [nowPlayingSong, setNowplayingSong] = useState()
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = useState(30);
  const [Duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    setNowplayingSong(currentSong[trackIndex])
  }, [audioPlayer?.current, currentSong,trackIndex]);

  //DURATION//

  useEffect(() => {
    setIsPLaying(false)
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds;
    audioPlayer.current.play()
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState,])

  //FOR CONVERTING SECONDS INTO MINUTRES//

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  //VOLUME //

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100
    }
  }, [volume])

  //PLAY AND PAUSE//

  const handlePlay = () => {
    setIsPLaying(!isPlaying)
    if (isPlaying) {
      audioPlayer.current.play()
      dispatch(pause(false))
    } else {
      audioPlayer.current.pause()
      dispatch(play(false))
    }
  }

  //PROGRESS BAR UPDATION//

  const onPLaying = () => {
    const duration = audioPlayer.current.duration;
    const ct = audioPlayer.current.currentTime
    setProgress({ ...progress, "progres": ct / duration * 100, "length": duration })
    setCurrentTime(ct)
  }

  //ONCLICKING THE PROGRESS BAR //

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    audioPlayer.current.currentTime = divprogress / 100 * progress.length;
  }

  //CHANGING THE RANGE OF THE SLIDER WHILE ONCLICKING THE PROGRESBAR//

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.setValue(audioPlayer.current.currentTime)
  }
  
  //PREV & NEXT//

  const handlePrev = () => {
    dispatch(songIndex(trackIndex - 1))
  }
  const handleNext = () => {
    if (trackIndex <= currentSong?.length) {
      dispatch(songIndex(trackIndex + 1))
    } else {
      dispatch(songIndex(0))
    }
  }
  return (
    <>
      <Box>
        <Box position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height: '80px', background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", width: "100%" }}>
          <Box sx={{ width: `${progress.length}` }} onClick={checkWidth} ref={clickRef}>
            <LinearProgress variant="determinate" defaultValue={currentTime} value={progress.progres} ref={progressBar} onChange={changeRange} />
          </Box>
          <Box mt={1} ml={3} mr={3}>
            <Stack direction="row" spacing={2} justifyContent="space-between" >
              <Box>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ bgcolor: 'transparent', height: '100px', display: { xs: "none", sm: "block", md: "block", zIndex: 'tooltip', } }}>
                    <img className='img-img' src={nowPlayingSong?.imageurl} onTimeUpdate={onplaying} />
                  </Box>
                  <Stack direction="column" spacing={0}>
                    <Box sx={{ mt: 1 }}>
                      <Typography style={{ fontSize: 16, fontWeight: 450, }} color="#FFFFFF" sx={{ ml: 1, }}>{nowPlayingSong?.song}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ display: { xs: "none", sm: "block" } }} style={{ fontSize: 12, fontWeight: 400, }} color="#FFFFFF" sx={{ ml: 1, display: { xs: "none", sm: "block", md: 'block' } }} >{nowPlayingSong?.artist}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              <Box >
                <Stack direction="row" spacing={10}>
                  <Box>
                    <Typography sx={{ color: "#FFFFFF", mt: 2, display: { xs: "none", sm: "none", md: 'block' } }}>{calculateTime(currentTime)}</Typography>
                  </Box>
                  <Box>
                    <div className='nxtpre-container'>
                      <button onClick={handlePrev} className='play-btn'>
                        <SkipPreviousIcon sx={{ fontSize: 30, color: '#FFFFFF', mt: 2 }} />
                      </button>
                      <button onClick={handlePlay} className='play-btn'>
                        {!isPlaying ? <PauseCircleFilledIcon sx={{ fontSize: 40, color: '#FFFFFF', mt: 2, display: { xs: "block", sm: "none", md: 'none' } }} /> : <PlayCircleFilledIcon sx={{ fontSize: 40, color: '#FFFFFF', mt: 2, display: { xs: "block", sm: "none", md: 'none' } }} />}
                      </button>
                      <button onClick={handleNext} className='play-btn'>
                        <SkipNextIcon sx={{ fontSize: 30, color: '#FFFFFF', mt: 2, display: { xs: "block", sm: "none", md: 'none' } }} />
                      </button>
                    </div>
                  </Box>
                  <Box >
                    <button onClick={handlePlay} className='play-btn'>
                      {!isPlaying ? <PauseCircleFilledIcon sx={{ fontSize: 40, color: '#FFFFFF', mt: 2, display: { xs: "none", sm: "block", md: 'block' } }} /> : <PlayCircleFilledIcon sx={{ fontSize: 40, color: '#FFFFFF', mt: 2, display: { xs: "none", sm: "block", md: 'block' } }} />}
                    </button>
                  </Box>
                  <Box>
                    <audio ref={audioPlayer} src={nowPlayingSong?.musicUrl} onTimeUpdate={onPLaying} />
                    <button onClick={handleNext} className='play-btn'>
                      <SkipNextIcon sx={{ fontSize: 30, color: '#FFFFFF', mt: 2 }} />
                    </button>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#FFFFFF", mt: 2, display: { xs: "none", sm: "none", md: 'block' } }}>{currentTime ? calculateTime(Duration) : '00:00'}</Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={1}>
                  <Box >
                    <Box sx={{ width: 200, mt: 2, display: { xs: "none", sm: "none", md: "block", zIndex: 'tooltip', } }}>
                      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown sx={{ fontSize: 30, color: '#FFFFFF' }} />
                        <Slider size="small" min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)} aria-label="Volume" />
                        <VolumeUp sx={{ fontSize: 30, color: '#FFFFFF' }} />
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box >
      </Box >
    </>
  )
}

export default PLayer