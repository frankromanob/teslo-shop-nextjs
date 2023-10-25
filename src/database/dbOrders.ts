import { IOrder } from "@/interfaces";
import { db } from ".";
import { Orders } from "@/models";
import { isValidObjectId } from "mongoose";



export const getOrderById = async (id: string): Promise<IOrder | null> => {

    if(!isValidObjectId(id)){
        return null
    }

    await db.connect()
    const order = await Orders.findOne({ _id:id }).lean()
    await db.disconnect()

    if (order) {
        return JSON.parse(JSON.stringify(order));
    } else {
        return null
    }
}

export const getOrdersByUser = async (userId: string): Promise<IOrder[] | []> => {

    if(!isValidObjectId(userId)){
        return []
    }

    await db.connect()
    const orders = await Orders.find({ user:userId }).lean()
    await db.disconnect()

    if (orders) {
        return JSON.parse(JSON.stringify(orders));
    } else {
        return []
    }
}
