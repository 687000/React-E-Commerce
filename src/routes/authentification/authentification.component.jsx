import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import { AutehntificationContainer } from './authentification.styles'
const Authentification=()=>{

    return(
        <AutehntificationContainer>
            <SignInForm/>
            <SignUpForm/>
        </AutehntificationContainer>
    )
  }
  export default Authentification;