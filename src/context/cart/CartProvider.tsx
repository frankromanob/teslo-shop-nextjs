import { PropsWithChildren, useReducer } from 'react';
import { cartReducer, CartContext  } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
     cart:ICartProduct[]
}

const CART_INITIAL_STATE : CartState={
     cart:[]
}
export const CartProvider = ({children}:PropsWithChildren) => {

     const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

     const onAddItemToCart=(cart:ICartProduct)=>{
        dispatch({type:'[Cart] - Add Product',payload:cart})
     }
  return (
     <CartContext.Provider value={{
        ...state,
        onAddItemToCart
     }}>
        {children}
     </CartContext.Provider>
)
}
