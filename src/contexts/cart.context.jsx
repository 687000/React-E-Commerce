import {createContext,useEffect,useState } from 'react';

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
    //alway >=1 so no need to concern the remove.
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
    cartCount:0
});
export const CartProvider =({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const reduceItemFromCart=(productToReduce)=>{
        setCartItems(reduceCartItem(cartItems,productToReduce));
    }
    const removeItemFromCart=(productToRemove)=>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    useEffect(()=>{
        const newCartCount=cartItems.reduce((sum,item)=>sum+item.quantity,0);
        setCartCount(newCartCount);
    },[cartItems])
    const value ={isCartOpen,setIsCartOpen,addItemToCart,reduceItemFromCart,removeItemFromCart,cartItems,cartCount};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}
