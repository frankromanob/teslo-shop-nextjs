import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

export interface contextProps {
    cart:ICartProduct[];
    onAddItemToCart: (item:ICartProduct) => void
}

export const CartContext = createContext({} as contextProps);