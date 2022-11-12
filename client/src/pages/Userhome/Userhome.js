import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import MusicFeed from '../../components/MusicFeed'
import SideBar from '../../components/SideBar'
import Navbar from '../../components/Navbar'
import PLayer from '../../components/Player/PLayer'
import { useSelector } from 'react-redux';

function Userhome() {
  const isSideBar = useSelector((state => state?.currentTrack?.showSidebar));
  const [open, setOpen] = useState(false);

  const just = () => {
    console.log("isSIdebar", isSideBar)
    setOpen(!open)
  }

  return (
    <>
      <Box>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <SideBar />
          <MusicFeed />
        </Stack>
        <Navbar />
        <PLayer />
      </Box>
    </>
  )
}

export default Userhome