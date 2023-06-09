import { useContext } from "react"
import { CartContext } from "../context/cart"


export const useCart = () => {
    const context = useContext(CartContext)
    if(context === undefined){
        throw new Error('useCart deberia ser usado con un CartProvider')
    }


  return context
}
