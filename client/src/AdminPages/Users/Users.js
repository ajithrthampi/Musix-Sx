import { Avatar, Box, Typography, } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import UserTable from './UserTable'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

function Users() {
  return (
    <Box>
      <Box position="sticky" sx={{ maxWidth: "100%", maxHeight: '100vh', boxShadow: 3 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Box sx={{ mt: 3 }}>
            <Typography variant='h5' sx={{ fontWeight: 500 }}>MusicSx</Typography>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ mt: 4, boxShadow: 3, overflow: 'auto' }}>
        <UserTable />
      </Box>
    </Box>
  )
}

export default Users