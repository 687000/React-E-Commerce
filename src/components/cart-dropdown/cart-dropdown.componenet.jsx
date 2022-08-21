import { Link } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
const CartDropdown=()=>{
    const {cartItems,cartCount}=useContext(CartContext);
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {cartItems.map((item)=>(<CartItem key={item.id} cartItem={item}/>))}
            </div>
            <Button><Link className='nav-link' to='/checkout'>Checkout</Link></Button>
        </div>
    )
}
export default CartDropdown