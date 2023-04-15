import { createContext,useContext,useEffect,useState } from "react";
import {auth,db} from '../firebase'
import {reateUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'
import{doc,setDoc}from 'firebase/firestore'

const UserContext= createContext();

export const AuthContextProvider=({children})=>{
    
    const [user,setUser] =useState({});

    const signUp=(email,passowrd)=>{
        createUserWithEmailAndPassword(auth, email,passowrd)
        return setDoc(doc(db,'users',email),{
            watchList:[],
        }).catch(e=>{
            console.log(e.code.split('auth/')[1])
        })
        ;
    };

    const signIn = (email,passowrd)=>{
        return signInWithEmailAndPassword(auth,email,passowrd);
    };

    const logOut=()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribre= onAuthStateChanged(auth, (currentUser)=>{
         setUser(currentUser);    
        }) ;

        return ()=> { unsubscribre(); void 
            unsubscribre () }

    },[]);
    
    return (
        <UserContext.Provider value={{signUp,signIn,logOut,user}}>
            {children}
        </UserContext.Provider>
    )

};

export const UserAuth=()=>{
    return useContext(UserContext);
}