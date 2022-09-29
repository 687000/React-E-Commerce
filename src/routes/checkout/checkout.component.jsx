import { useSelector } from "react-redux";
import { selectCartItems,selectCartTotal } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckoutContainer,CheckoutHeader,Total,HeaderBlock} from "./checkout.styles.jsx";
const Checkout=()=>{
    const cartItems=useSelector(selectCartItems);
    const cartTotal=useSelector(selectCartTotal);
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