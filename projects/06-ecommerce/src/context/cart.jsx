import { createContext, useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducer/cart";

export const CartContext = createContext()

function useCartReducer(){ //Funcion abstraida y separada || Se puede hacer como estado global
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({type: 'CLEAN_CART'})

    return {state, addToCart, removeFromCart, clearCart}
}


export function CartProvider({children}) {

    const {state, addToCart, removeFromCart, clearCart} = useCartReducer()

    return (<CartContext.Provider value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart
    }}>
        {children}
    </CartContext.Provider>)
}