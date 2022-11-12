import React, { useEffect, useState } from 'react'
import './card.css'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Box } from '@mui/system';
import TrackDataList from '../TrackDataList'
import musicDataService from '../../services/MusicService'
import { enable} from '../../reducers/PlayerReducer'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function Index(data,titleData) {
  const [tracks, setTracks] = useState();
  const [currentItem,setCurrentItem]=useState()
  const isShow = useSelector((state => state.currentTrack.isEnable));
  const dispatch = useDispatch()
  

  const itemHandler =async(item) => {
    dispatch(enable(true))
    setCurrentItem(item)
    const Music = await musicDataService.getAllMusic();
    const musicdata = Music?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    if(data.titleData==='album'){
      const d = musicdata && musicdata?.filter(n => n.album === item?.title)
      setTracks(d)
    }else if(data.titleData==='artist'){
      const b = musicdata && musicdata?.filter(n => n.artist === item?.title)
      setTracks(b)
    }   
  }
 
  return (
    <div>
 {!isShow?   <Box>  
     <div className='library-body'>
      {data.data && data.data?.map(item => (
        <div onClick={(e) => itemHandler(item)} className='playlist-card'>
          <img src={item.src} className="playlist-image" alt='playlidt-Art' />
          <p className='playlist-title'>{item.title}</p>
          <div className='playlist-fade'>
            <PlayCircleFilledIcon sx={{ size: "80px", color: "#FFFFFF" }} />
          </div>
        </div>
      ))}
    </div>
    </Box>:
          <TrackDataList tracks={tracks} currentItem={currentItem}/>
    }
    </div>
  )
}

export default Index