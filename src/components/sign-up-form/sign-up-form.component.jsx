import { useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import { SignUpContainer } from "./sign-up-form.styles";
const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm=()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;
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
            switch(error.code){
                case 'auth/email-already-in-use':
                    alert('Cannot create user, email already in use');
                    break;
                case 'auth/weak-password':
                    alert('Cannot create user, password shoule be at least 6 characters');
                    break;
                default:
                    console.log('user creation encountered an error',error);
            }
        }
    };
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({
            ...formFields,[name]:value})};
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up With Email and Password</span>
            <form onSubmit={handleSubmit}>
            <FormInput  label='Display Name' type='text' required onChange={handleChange} name="displayName" value={displayName}/>
            <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email}/>
            <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password}/>
            <FormInput label='Comfirm Password' type='password' required  onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Submit</Button>
            </form>
        </SignUpContainer>
    )
}
export default SignUpForm;