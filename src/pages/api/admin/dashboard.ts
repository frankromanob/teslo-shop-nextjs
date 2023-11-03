import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Products, Users, Orders } from '@/models';

type Data = {
    totalOrders: number
    paidOrders: number
    unpaidOrders: number
    totalClients: number //role: client
    totalProducts: number
    productosWithoutInventory: number // 0
    lowInventory: number //productos con menos de 10
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect()
    const totalOrders= (await Orders.countDocuments()).valueOf()
    const paidOrders= (await Orders.countDocuments({isPaid:1})).valueOf()
    const totalClients= (await Users.countDocuments({role:"client"})).valueOf()
    const totalProducts= (await Products.countDocuments()).valueOf()
    const productosWithoutInventory= (await Products.countDocuments({inStock:0})).valueOf()
    const lowInventory= (await Products.countDocuments({inStock:{$lte:10}})).valueOf()
    await db.disconnect()

    res.status(200).json({
            totalOrders,
            paidOrders,
            unpaidOrders:totalOrders-paidOrders,
            totalClients,
            totalProducts,
            productosWithoutInventory,
            lowInventory
     })
}