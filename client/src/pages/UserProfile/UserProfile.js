import styled from '@emotion/styled';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogTitle, IconButton, Paper, Typography } from '@mui/material'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import userDataServices from '../../services/UserService'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { db } from '../../config/Firebase/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import './styles.css'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function UserProfile() {
  const [currentUser, setCurrentUser] = useState();
  const [open, setOpen] = useState()
  const [image, setImage] = useState();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [completedCrop, setCompletedCrop] = useState()
  const imageRef = useRef()
  const canvasRef = useRef()
  const [result, setResult] = useState()
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    userData();
  }, [reducerValue])

  //FOR GETTING USER DATA//

  const userData = async () => {
    const unId = localStorage.getItem("email")
    const data = await userDataServices.getAllUser()
    const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = userData && userData?.filter(n => n.email === unId)
    setCurrentUser(fil)
  }

  //IMAGE UPLOADING TO FIREBASE //

  const uploadImage = (file) => {
    setSrc(URL.createObjectURL(file));
    setOpen(true)
  }

  const handleSaveImage = () => {
    try {
      const profileImage = result
      updateDoc(doc(db, "users", currentUser[0]?.id), {
        profileImage
      });
    } catch (error) {
      console.log("ERROR")
    }
    setOpen(false)
    forceUpdate()
  }
  useEffect(() => {
    try {
      const canvas = canvasRef.current
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        imageRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResult(base64Image);
    } catch (e) {
      console.log("ERROR");
    }
  }, [crop])
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box height="90vh" sx={{ mt: 8, bgcolor: "rgba(0, 0, 0,0.31)" }}>
        <Card sx={{ bgcolor: "transparent" }}>
          <CardMedia>
            {currentUser && currentUser?.map((item) => (
              <Avatar
                alt="Remy Sharp"
                src={currentUser ? item?.profileImage : "/broken-image.jpg"}
                sx={{ width: 200, height: 200, ml: 6, mt: 3 }}
              >
              </Avatar>
            ))}
            <IconButton sx={{ ml: 15 }} color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" value={image} accept="image/*"
                onChange={(e) => uploadImage(e.target.files[0])} />
              <PhotoCamera sx={{ fontSize: '2rem', }} />
            </IconButton>
          </CardMedia>
          {currentUser && currentUser?.map((item, index) => (
            <CardContent key={index}>
              <Typography sx={{ fontWeight: 600, color: "#FFFFFF", opacity: 0.5, }} gutterBottom variant="h5" component="div">
                Profile
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#FFFFFF", }}>
                {item?.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "#FFFFFF", }} gutterBottom component="div">
                {item?.email}
              </Typography>
              <Typography sx={{ fontWeight: 500, color: "#FFFFFF", }} gutterBottom variant="h5" component="div">
                {Item?.followers}
              </Typography>
            </CardContent>
          ))}
          <CardActions>
          </CardActions>
        </Card>
      </Box>
      <Dialog
        onClose={handleClose}
        open={open}>
        <DialogTitle>
          <Box>
            <ReactCrop
              crop={crop}
              onChange={e => setCrop(e)}
              onComplete={e => setCompletedCrop(e)}
              onImageLoaded={setImage}
              style={{ maxWidth: "50%" }}
            >
              <img src={src} ref={imageRef} />
            </ReactCrop>
            <canvas ref={canvasRef} className='canvas-can' ></canvas>
            <button className='play-btn' onClick={handleSaveImage}><Button>Save</Button></button>
          </Box>
        </DialogTitle>
      </Dialog>
    </>
  )
}

export default UserProfile