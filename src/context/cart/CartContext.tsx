import { ICartProduct, ShippingAddress } from '@/interfaces';
import { createContext } from 'react';


export interface cartContextProps {
    isLoaded:boolean;
    cart:ICartProduct[];
    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    shippingAddress?: ShippingAddress

    onAddItemToCart: (item:ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeProductInCart: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void
    createOrder: () => Promise<void>
}

export const CartContext = createContext({} as cartContextProps);