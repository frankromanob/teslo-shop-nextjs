import { PropsWithChildren, useEffect, useReducer } from 'react';
import { cartReducer, CartContext } from './';
import { ICartProduct } from '@/interfaces';
import Cookies from 'js-cookie'


export interface CartState {
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}
export const CartProvider = ({ children }: PropsWithChildren) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)


    useEffect(() => {
        try {
            const cartFromCookies = Cookies.get('teslocart') ? JSON.parse(Cookies.get('teslocart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cartFromCookies })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])



    useEffect(() => {
        Cookies.set('teslocart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 1)
        //const   total= state.cart.reduce((prev,current)=>(current.quantity*current.price*1.1)+prev,0),

        const orderSummary = {
            numberOfItems: numberOfItems,
            subTotal: subTotal,
            tax: subTotal * taxRate,
            total: subTotal + (subTotal * taxRate)
        }

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary })

    }, [state.cart])


    const onAddItemToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some(item => item._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Update Products in cart', payload: [...state.cart, product] })

        const productInCartSameSize = state.cart.some(item => item._id === product._id && item.size === product.size)
        if (!productInCartSameSize) return dispatch({ type: '[Cart] - Update Products in cart', payload: [...state.cart, product] })

        const updatedItems = state.cart.map(item => {
            if (item._id !== product._id) return item;
            if (item.size !== product.size) return item;
            item.quantity += product.quantity

            return item
        })

        dispatch({ type: '[Cart] - Update Products in cart', payload: updatedItems })
    }


    const updateCartQuantity = (product: ICartProduct) => {

        dispatch({ type: '[Cart] - Update Order Quantity', payload: product })
    }

    const removeProductInCart = (product: ICartProduct) => {

        dispatch({ type: '[Cart] - Remove Product In Cart', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            onAddItemToCart,
            updateCartQuantity,
            removeProductInCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
