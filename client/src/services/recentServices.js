import {db} from "../config/Firebase/FirebaseConfig"
import { collection, getDocs,getDoc, addDoc,deleteDoc, doc} from "firebase/firestore"

const userCollection = collection(db,"recent")
class recentDataService {
    //adding a new user to the firebase
    addRecent=(e)=> {
        return addDoc(userCollection,e);
    }
    //to delete a user
    deleteRecent=(id)=>{
        const user = doc(db,"recent",id)
        return deleteDoc(user);
    }
        //to get all users
        getAllRrecent =()=>{
        return getDocs(userCollection);
    }
    getAmusic=()=>{
        return getDoc()
    }
    
}

export default new recentDataService();