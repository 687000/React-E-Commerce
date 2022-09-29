import { CART_ACTION_TYPES} from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen=(boolean)=>createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean);

 
const addCartItem=(cartItems,productToAdd)=>{
    //find if carttItems contain productToAdd if find ++
    const existedCartItem=cartItems.find(
        (cartItem) => cartItem.id ===productToAdd.id);
    if(existedCartItem){
        return cartItems.map((cartItem) =>
        cartItem.id===productToAdd.id 
        ?{...cartItem, quantity :cartItem.quantity+1}
        : cartItem
        );
    }
    //no add productToAdd to cartItems
    return [...cartItems,{...productToAdd, quantity:1}];
};
const reduceCartItem=(cartItems,productToReduce)=>{
    //alway >=1 so no need to concern the remove
    return cartItems.map((cartItem) =>
    cartItem.id===productToReduce.id 
        ?{...cartItem, quantity :cartItem.quantity-1}
        : cartItem);
};
const removeCartItem=(cartItems,productToRemove)=>{
    return cartItems.filter((cartItem) =>
    cartItem.id!==productToRemove.id)
};


export const addItemToCart=(cartItems,productToAdd)=>{
    const newCartItems=(addCartItem(cartItems,productToAdd));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const reduceItemFromCart=(cartItems,productToReduce)=>{
    const newCartItems=(reduceCartItem(cartItems,productToReduce));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const removeItemFromCart=(cartItems,productToRemove)=>{
    const newCartItems=(removeCartItem(cartItems,productToRemove));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}