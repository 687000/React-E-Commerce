import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Outlet,Link} from 'react-router-dom';
import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import './sign-in.styles.scss'
const Signin=()=>{
    const logGoogleUser =async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef=await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }
    return(
        <div className='sign-in'>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    )
  }
  export default Signin;