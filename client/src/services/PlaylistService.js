import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"playlist")
class PlaylistDataService {
    //adding a new song to the playlist list//
    addfav=(list)=> {
        return addDoc(userCollection,list);
    }
    //to delete a song from favourites
    deletefav=(id)=>{
        const user = doc(db,"playlist",id)
        return deleteDoc(user);
    }
        //to get all songs from favourites
        getAllfav =()=>{
        return getDocs(userCollection);
    }
    getAfav=()=>{
        return getDoc()
    }
    
}

export default new PlaylistDataService();