import { PropsWithChildren, useEffect, useReducer } from 'react';
import { cartReducer, CartContext } from './';
import { ICartProduct, IOrder, IUser, ShippingAddress } from '@/interfaces';
import Cookies from 'js-cookie'
import { tesloApi } from '@/api';
import axios from 'axios';


export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    shippingAddress?: ShippingAddress
}



const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
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
        try {
            const addressFromCookies = Cookies.get('teslo-dir') ? JSON.parse(Cookies.get('teslo-dir')!) : []
            dispatch({ type: '[Cart] - LoadAddress from cookies', payload: addressFromCookies })
        } catch (error) {
            dispatch({
                type: '[Cart] - LoadAddress from cookies',
                payload: {
                    firstName: '',
                    lastName: '',
                    address1: '',
                    address2: '',
                    zipCode: '',
                    country: 'DOM',
                    city: '',
                    phone: '',
                }
            })
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

    const updateAddress = (address: ShippingAddress) => {
        dispatch({ type: '[Cart] - Update Address', payload: address })
    }

    const createOrder = async (): Promise<{ hasError: boolean, message: string; }> => {
        if (!state.shippingAddress) {
            throw new Error('No hay dirección de entrega!')
        }


        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }


        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body)

            dispatch({ type: '[Cart] - Order Completed' })

            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            //console.log(error)
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Error inesperado'
            }
        }
    }
    return (
        <CartContext.Provider value={{
            ...state,
            onAddItemToCart,
            updateCartQuantity,
            removeProductInCart,
            updateAddress,
            createOrder,
        }}>
            {children}
        </CartContext.Provider>
    )
}
