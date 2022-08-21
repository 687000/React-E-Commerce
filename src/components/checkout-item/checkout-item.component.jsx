import './checkout-item.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem=({checkoutItem})=>{
   const {name,imageUrl,price,quantity}=checkoutItem;
   const {addItemToCart,reduceItemFromCart,removeItemFromCart}=useContext(CartContext);
   const addProductToCart=()=>{addItemToCart(checkoutItem)};
   const reduceProductFromCart=()=>{if(quantity>1){return reduceItemFromCart(checkoutItem)}}
   const removeProductFromCart=()=>{removeItemFromCart(checkoutItem)}
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