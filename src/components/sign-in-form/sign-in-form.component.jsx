import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword,signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
const defaultFormFields={
    email:'',
    password:'',
}
const SignInForm=()=>{
    
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {email,password}=formFields;
    /*
    //confirm password
    //call createAuthUserWithEmailAndPassword
    //create userDoc
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            alert("passwords do not match");
            return;
        }
        try{
            const {user}=await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            setFormFields(defaultFormFields);
        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else if(error.code==='auth/weak-password'){
                alert('Cannot create user, password shoule be at least 6 characters');
            }
            else{
                console.log('user creation encountered an error',error);
            }
        }
    };
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({
            ...formFields,[name]:value})};
            */
    const signInWithGoogle =async()=>{
        const {user}=await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
            const response=await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response)
            setFormFields(defaultFormFields);
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found':
                    alert("No user associates with this email");
                    break;
                default:
                    console.log('sign in encountered an error',error);
            }
        }
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({
            ...formFields,[name]:value})
        };
    
    return (
        <div className="sign-in-container">
            <h2>I already have an account?</h2>
            <span>Sign In With Email and Password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email}/>
            <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password}/>
            <div className="buttons-container">
                <Button type="submit">Submit</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
            </form>
        </div>
    )
}
export default SignInForm;