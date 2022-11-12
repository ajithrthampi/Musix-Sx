import { AppBar, Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import Logout from '@mui/icons-material/Logout';
import userDataServices from '../services/UserService'

//TOOLBAR STYLES//

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
})

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [show, setShow] = useState(false)
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    userData();
  }, [currentUser?.profileImage])

  //FOR GETTING USER DATA//

  const userData = async () => {
    const unId = localStorage.getItem("email")
    const data = await userDataServices.getAllUser()
    const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = userData && userData?.filter(n => n.email === unId)
    setCurrentUser(fil)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // LOGOUT //

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate('/login')
  }
  const handleSideBar = () => {
    setShow(!show)
  }

  return (
    <>
      <Box>
        <Box sx={{ position: "absolute" }}>
          <AppBar sx={{ bgcolor: "rgba(0, 0, 0,0.31)", background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", top: 0 }} top={0}>
            <Box position="sticky">
              <StyledToolbar>
                <button className='play-btn' onClick={handleSideBar}><Typography variant="h6"
                  sx={{ fontWeight: 600, mt: 1, ml: 1, }}
                  color="#FFFFFF"
                > MusicSx
                </Typography>
                </button>
                <motion.div whileTap={{ scale: 0.8 }}>
                  {currentUser && currentUser?.map((item) => (
                    <Avatar src={currentUser ? item?.profileImage : "/broken-image.jpg"} onClick={handleClick} />
                  ))}
                </motion.div>
              </StyledToolbar>
            </Box>
          </AppBar>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink style={{ textDecoration: 'none', color: "grey", }} to={'profile'}>
          <MenuItem >
            <Avatar /> Profile
          </MenuItem>
        </NavLink>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
export default Navbar