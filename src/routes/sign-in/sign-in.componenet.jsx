import {
    signInWithGooglePopup,
    createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import './sign-in.styles.scss'
const Signin=()=>{
    const logGoogleUser =async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef=await createUserDocumentFromAuth(user);
    }
    return(
        <div className='sign-in'>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <SignUpForm/>
        </div>
    )
  }
  export default Signin;