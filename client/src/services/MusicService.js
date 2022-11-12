import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"musics")
class musicDataService {
    //adding a new user to the firebase
    addMusic=(newMusic)=> {
        return addDoc(userCollection,newMusic);
    }
    //to delete a user
    deleteMusic=(id)=>{
        const user = doc(db,"musics",id)
        return deleteDoc(user);
    }
        //to get all users
        getAllMusic =()=>{
        return getDocs(userCollection);
    }
    getAmusic=()=>{
        return getDoc()
    }
    
}

export default new musicDataService();