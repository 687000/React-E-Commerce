import './checkout-item.styles.scss'
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
const CheckoutItem=({checkoutItem})=>{
   const {name,imageUrl,price,quantity}=checkoutItem;
   const dispatch=useDispatch();
   const cartItems=useSelector(selectCartItems);
   const addProductToCart=()=>dispatch(addItemToCart(cartItems,checkoutItem));
   const reduceProductFromCart=()=>{if(quantity>1){return dispatch(reduceItemFromCart(cartItems,checkoutItem))}}
   const removeProductFromCart=()=>dispatch(removeItemFromCart(cartItems,checkoutItem));
    return (
        <div className='checkout-item-container'>
            <div className='image-container'><img src={imageUrl} alt={`${name}`}/></div>
            <span className='name'>{name}</span>
            <div className='quantity'><span className="arrow" onClick={reduceProductFromCart}>-</span><span className='value'>{quantity}</span><span className="arrow" onClick={addProductToCart}>+</span></div>
            <span className='price'>${quantity*price}</span>
            <span className='remove-button' onClick={removeProductFromCart}>x</span>
        </div>
    )
}
export default CheckoutItem;