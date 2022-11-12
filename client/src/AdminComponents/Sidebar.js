import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar() {
  return (
    <Box flex={0.8} sx={{ display: { xs: "none", sm: "block", md: "block", zIndex: 'tooltip', } }}>
      <Box position="fixed" background="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
        flex={0.8}
      >
        <Box sx={{ mt: 5, }}>
          <Stack direction="row" spacing={1} >
            <Box sx={{ ml: 2 }}>
              <Avatar src="/broken-image.jpg" />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 600, color: "#FFFFFF", }} sx={{
                ml: 1, mt: 1
              }}>
                Suryajith Ms
              </Typography>
            </Box>
          </Stack>
        </Box>
        <List sx={{ color: "#FFFFFF", pt: 2, mt: 5 }}>
          {SidebarData.map((item, index) => (
            <NavLink style={{ textDecoration: 'none', fontWeight: 600, color: "#FFFFFF", }} to={item.path}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#FFFFFF" }}>
                    {item.icon}
                  </ListItemIcon >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
           <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#FFFFFF" }}>
                  
                  </ListItemIcon >
                  <ListItemText primary='Logout'/>
                </ListItemButton>
              </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar