import {createContext,createElement,useReducer } from 'react';
import {createAction} from '../utils/reducer/reducer.utils'

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
export const CartContext= createContext({
    isCartOpen: false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    reduceItemFromCart:()=>{},
    removeItemFromCart:()=>{},
    cartCount:0,
    cartTotal:0,
});
const INITIAL_STATE={
    isCartOpen: false,
    cartItems:[],
    cartCount:0,
    cartTotal:0,
}
export const CART_ACTION_TYPES={
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
}

const cartReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider =({children})=>{
    const [state,dispatch]=useReducer(cartReducer,INITIAL_STATE);
    const {isCartOpen,cartItems,cartCount,cartTotal}=state;
    //const [isCartOpen,setIsCartOpen]=useState(false);
    //const [cartItems,setCartItems]=useState([]);
    //const [cartCount,setCartCount]=useState(0);
    //const [cartTotal,setCartTotal]=useState(0);
    const setIsCartOpen=(bool)=>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
    }
    const updateCartItemsReducer=(newCartItems)=>{
        const newCartCount=newCartItems.reduce((sum,item)=>sum+item.quantity,0);
        const newTotal=newCartItems.reduce((sum,item)=>sum+item.quantity*item.price,0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
            cartCount:newCartCount,cartTotal:newTotal,cartItems:newCartItems}))
    }
    const addItemToCart=(productToAdd)=>{
        const newCartItems=(addCartItem(cartItems,productToAdd));
        updateCartItemsReducer(newCartItems);
    }
    const reduceItemFromCart=(productToReduce)=>{
        const newCartItems=(reduceCartItem(cartItems,productToReduce));
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart=(productToRemove)=>{
        const newCartItems=(removeCartItem(cartItems,productToRemove));
        updateCartItemsReducer(newCartItems);
    }

    // useEffect(()=>{
    //     const newCartCount=cartItems.reduce((sum,item)=>sum+item.quantity,0);
    //     setCartCount(newCartCount);
    // },[cartItems])
    // useEffect(()=>{
    //     const newTotal=cartItems.reduce((sum,item)=>sum+item.quantity*item.price,0);
    //     setCartTotal(newTotal);
    // },[cartItems])
    const value ={isCartOpen,setIsCartOpen,addItemToCart,reduceItemFromCart,removeItemFromCart,cartItems,cartCount,cartTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}
