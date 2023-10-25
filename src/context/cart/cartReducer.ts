import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartState } from './';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Update Order Quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove Product In Cart', payload: ICartProduct }
    | { type: '[Cart] - LoadAddress from cookies', payload: ShippingAddress }
    | { type: '[Cart] - Update Address', payload: ShippingAddress }
    | {
        type: '[Cart] - Update Order Summary',
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }
    | { type: '[Cart] - Order Completed' }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }
        case '[Cart] - Update Products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[Cart] - Update Address':
        case '[Cart] - LoadAddress from cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }
        case '[Cart] - Update Order Quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                })
            }
        case '[Cart] - Remove Product In Cart':
            return {
                ...state,
                cart: state.cart.filter(p => {
                    return (p._id + p.size != action.payload._id + action.payload.size)
                })

            }
        case '[Cart] - Update Order Summary':
            return {
                ...state,
                ...action.payload
            }
        case '[Cart] - Order Completed':
                return {
                    ...state,
                    cart:[],
                    numberOfItems:0,
                    subTotal:0,
                    tax:0,
                    total:0,

                }
        default:
            return state;
    }
};