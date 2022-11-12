import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"favourites")
class favDataService {
    //adding a new song to the favourite list//
    addfav=(fav)=> {
        return addDoc(userCollection,fav);
    }
    //to delete a song from favourites
    deletefav=(id)=>{
        const user = doc(db,"favourites",id)
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

export default new favDataService();