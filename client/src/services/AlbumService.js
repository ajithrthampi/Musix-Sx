import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"albums")
class AlbumDataService {

    addAlbum=(newAlbum)=> {
        return addDoc(userCollection,newAlbum);
    }
    deleteAlbum=(id)=>{
        const user = doc(db,"albums",id)
        return deleteDoc(user);
    }
        getAllAlbum =()=>{
        return getDocs(userCollection);
    }
    getAalbum=()=>{
        return getDoc()
    }  
}

export default new AlbumDataService();