import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminFeed() {
  return (
   <Box bgcolor='#FFFFFF' flex={4}>
    <Outlet/>
   </Box>
  )
}

export default AdminFeed