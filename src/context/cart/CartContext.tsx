import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

export interface cartContextProps {
    cart:ICartProduct[];
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    onAddItemToCart: (item:ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeProductInCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as cartContextProps);