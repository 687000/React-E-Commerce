import { useState} from "react";
import { signInAuthUserWithEmailAndPassword,signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button ,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import { SignInContainer,ButtonsContainer } from "./sign-in-form.styles";
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
        <SignInContainer>
            <h2>I already have an account?</h2>
            <span>Sign In With Email and Password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email}/>
            <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password}/>
            <ButtonsContainer >
                <Button type="submit">Submit</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with Google</Button>
            </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}
export default SignInForm;