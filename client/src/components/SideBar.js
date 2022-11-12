import { Box, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SidebarData, SidebarDatab } from './SidebarData'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <> 
      <Box 
        flex={0.8}
        sx={{ display: { xs: "block", sm: "block",  } ,overflow:'hidden', background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)" }}
      >
        <Box position="fixed" bgcolor="black"flex={0.8} sx={{width:"16.5%",height:"100vh",mt:6, background: "#0f0c29"}} >
          <nav aria-label="main mailbox folders">
            {/* <Typography variant="h6" style={{ fontWeight: 600, color: "#FFFFFF" }} sx={{ ml: 5, pt: 1 }} > Groovy </Typography> */}
            <Typography style={{ fontWeight: 600, color: "#FFFFFF", opacity: 0.5 }} sx={{
              ml: 1, mt: 5,display: { xs: "none", sm: "none",md:"block", zIndex: 'tooltip', }
            }}>
              Menu
            </Typography>
            <List sx={{ color: "#FFFFFF", pt: 2 }}>
              {SidebarData.map((item, index) => (
                <NavLink style={{ textDecoration: 'none', fontWeight: 600, color: "#FFFFFF", }} to={item.path}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{color:"#FFFFFF"}}>
                        {item.icon}
                      </ListItemIcon > 
                      <ListItemText sx={{display: { xs: "none", sm: "none",md:"block", zIndex: 'tooltip', }}}   primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </nav>
          <nav aria-label="main mailbox folders">
            <Typography style={{ fontWeight: 600, color: "#FFFFFF", opacity: 0.5 }} sx={{ ml: 1, pt: 2,display: { xs: "none", sm: "none",md:"block", zIndex: 'tooltip', } }} > Library </Typography>
            <List sx={{ color: "#FFFFFF", pt: 2 }}>
              {SidebarDatab.map((item, index) => (
                <NavLink style={{ textDecoration: 'none', fontWeight: 600, color: "#FFFFFF", }} to={item.path}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{color:"#FFFFFF"}}>
                        {item.icon}
                      </ListItemIcon >
                      <ListItemText sx={{display: { xs: "none", sm: "none",md:"block", zIndex: 'tooltip', }}} primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </nav>
        </Box>
      </Box>
    </>
  )
}
export default SideBar