import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyDCwXu5MW_LiP0f4Htn6fPh9RsVtcX-_EA",
  
    authDomain: "l-makeup-db.firebaseapp.com",
  
    projectId: "l-makeup-db",
  
    storageBucket: "l-makeup-db.appspot.com",
  
    messagingSenderId: "431536209963",
  
    appId: "1:431536209963:web:18e267b8c080a720e36a6e",
  
    measurementId: "G-NXVK54QN8R"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  const googleProvider=new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt:"select_account"
  });
  export const auth =getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth, googleProvider);
  export const db= getFirestore();

  export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot=await getDoc(userDocRef);
    //console.log(userSnapshot);
    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  };

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email||!password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}
export const signOutUser=()=>signOut(auth);
export const onAuthStateChangedLintener=(callback)=>onAuthStateChanged(auth,callback);