import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import musicDataService from '../../services/MusicService'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { doc } from 'firebase/firestore'
import { db } from '../../config/Firebase/FirebaseConfig';

export default function EditMusic() {
    const [isPlay, setIsPlay] = useState(false);
    const [music, setMusic] = useState();
    const [open, setOpen] = React.useState(false);
    const [reducer, forceUpdate] = React.useReducer(x => x + 1, 0);

    useEffect(() => {
        getAllMusic()
    }, [reducer])

    //GET ALL MUSIC

    const getAllMusic = async () => {
        const Music = await musicDataService.getAllMusic();
        setMusic(Music.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    //DELETE A MUSIC

    const deleteHandler = async (id) => {
        setOpen(true);
        await musicDataService.deleteMusic(id)
        forceUpdate();
    }
    const handleClose = () => {
        setOpen(false);
        forceUpdate();
    };

    return (
        <>
            <Box>
                <Card sx={{ background: "#FFFFFF" }}>
                    <CardContent style={{
                        overflow: 'auto',
                        background: "#FFFFFF"
                    }}>
                        <Box sx={{ maxHeight: '100vh', left: 0 }} >
                            {music && music.map((item, index) => (
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
                                                    <Typography style={{ fontSize: 14, fontWeight: 400, }} color="black" sx={{
                                                        ml: 1, mt: 1
                                                    }} >{item.song}</Typography>
                                                    <Typography sx={{ display: { xs: "none", sm: "block" } }} style={{ fontSize: 12, fontWeight: 400, }} color="black" sx={{
                                                        ml: 1,
                                                    }} >{item.artist}</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                        <Box sx={{ display: { xs: "none", sm: "block" } }} >
                                            <Typography style={{ fontSize: 14, fontWeight: 400, }} color="black" sx={{
                                                ml: 1, mt: 1
                                            }} ></Typography>
                                        </Box>
                                        <Box >
                                            <Box sx={{ mt: 1 }}>
                                            <button className='play-btn' onClick={(e) => deleteHandler(item.id)} ><DeleteIcon sx={{ mr: 8, color: "black" }}/></button>
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure yo want to delete this music"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete Music
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

