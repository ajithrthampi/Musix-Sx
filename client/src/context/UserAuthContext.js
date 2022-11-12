import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {auth,} from "../config/Firebase/FirebaseConfig"



const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const [user,setUser] = useState("")
    const [email,setEmail] = useState()
    
    //for Authenticating Sign Up and creating new user/
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email, password)
  
    }    
    //for Authenticating Login
    function signIn(email,password){
        return signInWithEmailAndPassword(auth,email, password,)
    }
   
    //for Logout
    function logOut(){
        return signOut(auth)
    }
    //for adding userdetails to firestore
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
           setUser(currentUser);
        })
        return()=>{
            unsubscribe();
        }
    }, [])
    return(
        <userAuthContext.Provider 
        value={{user, signUp, signIn ,logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}
export function useUserAuth(){
    return useContext(userAuthContext)
}
