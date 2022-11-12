import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"artists")
class ArtistDataService {
    //adding a new artist to the firebase
    addArtist=(newArtist)=> {
        return addDoc(userCollection,newArtist);
    }
    //to delete an artist
    deleteArtist=(id)=>{
        const user = doc(db,"artists",id)
        return deleteDoc(user);
    }
        //to get all artists
        getAllArtist =()=>{
        return getDocs(userCollection);
    }
    getAartist=()=>{
        return getDoc()
    }
    
}

export default new ArtistDataService();