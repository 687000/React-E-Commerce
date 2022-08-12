import { createContext,useState,useEffect} from "react";
import { onAuthStateChangedLintener ,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//as the actual value you want to access
//Initialize this to null.
export const UserContext =createContext({
    currentUser:null,
    setCurrentUser:()=>null,
});
//Use <UserContext.Provider> wrap so we can use data we want
//Now we set currentUser and pass this value to provide
//Then any child componenet inside the provider can access the data
export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const value={currentUser,setCurrentUser};
    useEffect(()=>{
        const unsubscribe =onAuthStateChangedLintener((user)=>{ 
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
        })
        return unsubscribe;
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}