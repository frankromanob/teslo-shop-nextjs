import { ISizes } from "./cart";
import { IUser } from "./users";

export interface IOrder {
    _id?: string;
    user?: IUser | string
    orderItems: IOrderItem[]
    shippingaddress:ShippingAddress
    paymentResult?:string
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    isPaid:boolean
    paidAt?:string
    createdAt?: string;
    updatedAt?: string;
}
export interface IOrderItem {
    _id: string
    title: string
    size: ISizes | string
    quantity: number
    slug: string
    image: string
    gender:string
    price: number
}

export interface ShippingAddress {
    firstName: string
    lastName: string
    address1: string
    address2?: string
    zipCode: string
    country: string
    city: string
    phone: string
}
