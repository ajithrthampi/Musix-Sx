import { Box, Stack, TextField } from '@mui/material'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../../config/Firebase/FirebaseConfig';
import musicDataService from '../../services/MusicService'
import './addmusic.css'
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function AddMusic() {

    const [song, setSong] = useState();
    const [artist, setArtist] = useState();
    const [loading, setIsLoading] = useState(false)
    const [album, setAlbum] = useState();
    const [genre, setGenre] = useState();
    const [image, setImage] = useState();
    const [imageurl, setImageUrl] = useState();
    const [musicUrl, setMusicUrl] = useState();
    const [message, setMessage] = useState();


    //MUSIC UPLOADING TO FIREBASE//

    const uploadMusic = (e) => {
        const musicFile = e.target.files[0];
        const storageRef = ref(storage, `Musics/ &{Date.now()}-${musicFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, musicFile);
        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log("ERROR OCCURED");
            setMessage("Error While upoading Music")
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(getDownloadURL => {
                setMusicUrl(getDownloadURL)
                setMessage("Music Upload Succesfully")
            })
        })
    }

    //IMAGE UPLOADING TO FIREBASE //

    const uploadImage = (e) => {
        const imageFile = e.target.files[0];
        console.log(imageFile)
        const storageRef = ref(storage, `Images/ &{Date.now()}-${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setMessage("Error While upoading image")
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(getDownloadURL => {
                console.log(getDownloadURL)
                setImageUrl(getDownloadURL)
                setMessage("Image Upload Succesfully")
            })
        })
    }
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        const newMusic = {
            song,
            artist,
            album,
            genre,
            imageurl,
            musicUrl
        }
        try {
            await musicDataService.addMusic(newMusic)
            toast.success("music Uploaded Successfully", {
            })
        } catch (error) {
            toast.error("Error Uploading Music", {
            })
        }
        setIsLoading(false) 
        setSong("")
        setArtist("")
        setAlbum("")
        setGenre("")
        setImageUrl("")
        setMusicUrl("")
    }
    return (
        <Box sx={{ color: '#FFFFFF', minWidth: '100%', minHeight: '100vh', mt: 4 }}>
            <div className='maincontent'>
                <div class="form1">
                    <div class="titlehead">Add Music</div>
                    <div class="subtitle">Let's Add some Music!</div>
                    <div class="input-container ic1">
                        <input id="songname" class="input" type="text" placeholder=" "
                            value={song}
                            onChange={(e) => setSong(e.target.value)}
                        />
                        <div class="cut"></div>
                        <label for="songname" class="placeholder">Song Name</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="artistname" class="input" type="text" placeholder=" "
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        />
                        <div class="cut"></div>
                        <label for="artistname" class="placeholder">Artist Name</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="albumname" class="input" type="text" placeholder=" "
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                        />
                        <div class="cut cut-short"></div>
                        <label for="albumname" class="placeholder">Album Name</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="Genre" class="input" type="text" placeholder=" "
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                        <div class="cut cut-short"></div>
                        <label for="genre" class="placeholder">Genre Name</label>
                    </div>
                    <div class="input-container ic2">
                        <div class="input-file-container">
                            <label tabindex="0" for="my-file" class="input-file-trigger">Select Song</label>
                            <div class="file">
                                <input
                                    onChange={uploadMusic}
                                    id="my-file" type="file" />
                            </div>
                        </div>
                        <p class="file-return"></p>
                    </div>
                    <div class="input-container ic2">
                        <div class="input-file-container">
                            <label tabindex="0" for="my-file" class="input-file-trigger">Select Cover image</label>
                            <input class="file" id="my-file" type="file"
                                value={image}
                                onChange={uploadImage}
                            />
                        </div>
                        <p class="file-return"></p>
                    </div>
                    <button onClick={handleSubmit} type="text" class="submit">{loading ? <CircularProgress color="secondary" /> : "Submit"} </button>
                </div>
            </div>
        </Box>
    )
}

export default AddMusic