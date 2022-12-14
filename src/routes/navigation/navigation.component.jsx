import {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import { ReactComponent as CrwLogo} from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.styles.jsx'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'

import { NavigationContainer,NavLink,NavLinks,LogoContainer} from './navigation.styles.jsx';
import { useSelector } from 'react-redux';
const Navigation=()=>{
  const currentUser=useSelector(selectCurrentUser);
  const isCartOpen=useSelector(selectIsCartOpen);
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