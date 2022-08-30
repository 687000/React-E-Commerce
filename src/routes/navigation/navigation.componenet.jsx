import { async } from '@firebase/util';
import {Fragment ,useContext} from 'react';
import {Outlet,Link} from 'react-router-dom';
import { ReactComponent as CrwLogo} from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.componenet';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.componenet';
import './navigation.styles.jsx'
import { CartContext } from '../../contexts/cart.context';
import { NavigationContainer,NavLink,NavLinks,LogoContainer} from './navigation.styles.jsx';
const Navigation=()=>{
  const {currentUser}=useContext(UserContext);
  const {isCartOpen}=useContext(CartContext);
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwLogo className="logo"/>
            </LogoContainer>   
            <NavLinks>
                <NavLink to='/shop'>SHOP</NavLink>
                {currentUser?(<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>):
                (<NavLink to='/auth'>SIGN IN</NavLink>)}
                <CartIcon/>
            </NavLinks>
            {isCartOpen&&<CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }
  export default Navigation;