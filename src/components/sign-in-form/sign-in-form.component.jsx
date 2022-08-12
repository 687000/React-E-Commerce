import { useState} from "react";
import { createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword,signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
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
    const signInWithGoogle =async()=>{
        await signInWithGooglePopup();
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email,password);
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