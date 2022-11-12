import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Slide, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import './playlist.css'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { TransitionProps } from '@mui/material/transitions';
import musicDataService from '../../services/MusicService';
import AddIcon from '@mui/icons-material/Add';
import PlaylistDataService from '../../services/PlaylistService'
import { async } from '@firebase/util';
import PlaylistTrackList from './PlaylistTrackList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { db, storage } from '../../config/Firebase/FirebaseConfig';
import SearchIcon from '@mui/icons-material/Search';
import { addDoc, collection, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import styled from '@emotion/styled';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BackspaceIcon from '@mui/icons-material/Backspace';

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  box: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
  }
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//SEARCH BAR STYLES //

const Search = styled('div')(({ theme }) => ({

  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#FFFFFF",
  opacity: 0.8,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
      height: '5vh'
    },
  },
}));

function Playlist() {
  const [token, setToken] = useState();
  const [playlist, setPlaylist] = useState();
  const [tracklist, setTracklist] = useState(false);
  const [image, setImage] = useState();
  const [track, setTrack] = useState()
  const [open, setOpen] = React.useState(false);
  const [music, setMusic] = useState()
  const navigate = useNavigate();
  const [email, setEmail] = useState()
  const [playlistName, setPlaylistName] = useState('')
  const [showTracks, setShowTracks] = useState(false)
  const [filteredData, setFilteredData] = useState()
  const [listdata, setListdata] = useState()
  const [todos, setTodos] = useState('')
  const [enable,setEnable] = useState(true)
  const [message, setMessage] = useState();
  const [imageurl, setImageUrl] = useState();
  const [search, setSearch] = useState("");
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


  useEffect(() => {
    getAllMusic()
    setToken(localStorage.getItem('token'))
    getPlayListData();
  }, [reducerValue])

  //GETTING ALL MUSIC DATA //

  const getAllMusic = async () => {
    setEmail(localStorage.getItem("email"))
    console.log("email", email)
    const Music = await musicDataService.getAllMusic();
    setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log(music)
  }

  //GETING PLAYLIST DATA//

  const getPlayListData = async () => {
    const unId = localStorage.getItem("email")
    console.log(unId)
    const PlayListsData = await PlaylistDataService.getAllfav()
    const data = PlayListsData?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const filteredData = data && data?.filter(n => n.email === unId)
    console.log('filteredData', filteredData)
    setPlaylist(filteredData)
  }

  //FOR CREATING PLAYLIST //

  const createPlaylist = () => {
    console.log("this is playlist")
    console.log('playlistData', playlist)
    setOpen(true);

  }
  //IMAGE UPLOADING TO FIREBASE //

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    console.log("umagefile", imageFile)
    setImage(imageFile)
    const storageRef = ref(storage, `Images/ &{Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setMessage("Error While upoading image")
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(getDownloadURL => {
        console.log("thisisurl", getDownloadURL)
        const profileImage = getDownloadURL
        console.log("This is profile image", profileImage)
        console.log("imageprofile", profileImage)
        //  updateDoc(doc(db, "users", currentUser[0]?.id), {
        //    profileImage
        // });
        setImageUrl(getDownloadURL)

      })
    })
  }

  //ADDING SONG TO PLAYLIST //

  const addToPlaylist = async () => {

    console.log("playlistname", playlistName)
    console.log('playlistitem', todos)
    const songdata = {
      email,
      todos,
      playlistName,
      imageurl
    }
    await PlaylistDataService.addfav(songdata)
    setOpen(false);
    forceUpdate()
  }

  //PLAYLIST HANDLER //

  const playlistHandler = (playlist) => {
    setEnable(false)
    console.log("this is play", playlist)
    setListdata(playlist)
    setShowTracks(!showTracks)

  }
  const discardList = () => {
    setOpen(false)
  }
  const deleteItem=(id)=>{
  const removeItems = todos&&todos?.filter((todo)=> todo.id !== id)
  setTodos(removeItems)
  }
  const playlistClose=()=>{
    setEnable(true)
    setShowTracks(false)
  }

  return (
    <Box sx={{ mt: 8, bgcolor: "rgba(0, 0, 0,0.31)" }}>
      { enable ? <Box height="38vh" sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 5 }} >
        <Box position="fixed" style={styles.box} >
          <Box
            height="225"
          />
          <Typography style={styles.overlay} sx={{
            top: '10px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
            opacity: 0.5
          }}>Your Playlists</Typography>
          <Typography variant="h3" style={styles.overlay} sx={{
            top: '50px',
            left: '20px',
            color: '#FFFFFF',
            fontWeight: 600,
          }}>Top PlayLists</Typography>
         <Box sx={{ pt: 20, color: '#FFFFFF', mb: 2 }} >
          <button className='play-btn' onClick={createPlaylist} ><AddCircleOutlineOutlinedIcon fontSize='large' sx={{ ml: 3, mt: 1, color: '#FFFFFF' }} />Create Playlist</button>
        </Box>
        </Box>
      </Box>:''}
      {!enable? 
         <Box>
          <Button sx={{ml:3}} onClick={playlistClose}><ArrowBackIcon sx={{color:'#FFFFFF'}}/></Button>
         </Box> :'' 
      }
      <Box sx={{ bgcolor: "rgba(0, 0, 0,0.31)", mt: 1 }} >
        {tracklist ? <Outlet /> :
          <Box sx={{ mt: 4, overflow: 'auto' }} className='screen-container'>

            <Stack spacing={2}>
             { enable?  <Box>
              <div className='library-body'>
                {playlist && playlist?.map(playlist => (
                  <div className='playlist-card' key={playlist.id} onClick={(e) => playlistHandler(playlist)} >
                    <img src={playlist.imageurl} className="playlist-image" alt='playlidt-Art' />
                    <p className='playlist-title'>{playlist.playlistName}</p>
                    {/* <p className='playlist-subtitle' > Songs</p> */}
                    <div className='playlist-fade'>
                      <PlayCircleFilledIcon sx={{ size: "80px", color: "#FFFFFF" }} />
                    </div>
                  </div>
                ))}
              </div>
              </Box>:''}
            </Stack>
            {showTracks ? <PlaylistTrackList listdata={listdata} filteredData={filteredData} /> : console.log("hi")}
          </Box>
        }
      </Box>
      <Dialog
      fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{
          background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
          maxHeight: '80vh', minHeight: '100vh', maxWidth: '100%'
        }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Box>
              <Typography variant='h4' sx={{ color: '#FFFFFF' }}>Create Playlist</Typography>
            </Box>
            <Box mt={2} ml={3}>
              <TextField sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }} id="standard-basic" label="My PLaylist #1" variant="standard"
                defaultValue={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <Button sx={{ mt: 1, ml: 3 }} variant="contained" component="label">
                Upload cover image
                <input hidden accept="image/*" multiple type="file" onChange={uploadImage} />
              </Button>
              <Box >
                <img className='previewimage' src={imageurl} />
              </Box>
            </Box>
            <Stack direction='row' >
              <Button sx={{ mt: 2, ml: 2 }} onClick={addToPlaylist}>Save</Button>
              <Button sx={{ mt: 2, ml: 2 }} onClick={discardList}>Discard</Button>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <Box> <Search >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…song "
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => setSearch(e.target.value)}
                />
               </Search>
              </Box>
              <Box mt={1}>
                { todos&&todos?.map((item,index)=>(
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography  sx={{color:'#FFFFFF',mt:2}}>{item?.song}</Typography>
                    <Box>
                      <button className='play-btn' onClick={(e)=>deleteItem(item.id)}><BackspaceIcon sx={{color:'#FFFFFF',mt:2}}/></button>
                    </Box>
                  </Stack>
                ))}
              </Box>
              <Card sx={{ mt:4, background: "rgba(0, 0, 0,0.31)" }}>
                <CardContent style={{ overflow: 'auto', background: "rgba(0, 0, 0,0.31)" }}>
                  <Box sx={{ maxHeight: '100vh', left: 0 }} >
                    {music && music?.filter((item) => {
                      return search.toLowerCase() === ''
                        ? item : item.song.toLowerCase().includes(search)
                    }).map((item, index) => (
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
                              <button className='play-btn' onClick={() => setTodos(todos => [...todos, item])}><AddIcon sx={{ color: "#FFFFFF" }} /></button>
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
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Playlist