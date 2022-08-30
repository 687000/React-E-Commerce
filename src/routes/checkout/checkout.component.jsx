import {useContext} from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from '../../contexts/cart.context';
import { CheckoutContainer,CheckoutHeader,Total,HeaderBlock} from "./checkout.styles.jsx";
const Checkout=()=>{
    const {cartItems,cartTotal}=useContext(CartContext);
    return (
        <CheckoutContainer>
        <CheckoutHeader>
            <HeaderBlock>Product</HeaderBlock>
            <HeaderBlock>Description</HeaderBlock>
            <HeaderBlock>Quantity</HeaderBlock>
            <HeaderBlock>Price</HeaderBlock>
            <HeaderBlock>Remove</HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((cartItem)=>(
            <CheckoutItem key={cartItem.id} checkoutItem={cartItem}/>
        ))}
        <Total>Total $ {cartTotal}</Total>
        </CheckoutContainer>
    );
};
export default Checkout;