import {useContext} from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from '../../contexts/cart.context';
import './checkout.styles.scss'
const Checkout=()=>{
    const {cartItems,cartCount}=useContext(CartContext);
    return (
        <div className="checkout-container">
        <div className="checkout-header">
            <span className="header-block">Product</span>
            <span className="header-block">Description</span>
            <span className="header-block">Quantity</span>
            <span className="header-block">Price</span>
            <span className="header-block">Remove</span>
        </div>
        {cartItems.map((cartItem)=>(
            <CheckoutItem key={cartItem.id} checkoutItem={cartItem}/>
        ))}
        <div className="total">${cartItems.reduce((sum,item)=> sum+item.quantity*item.price ,0)}</div>
        </div>
    );
};
export default Checkout;