import { db } from '@/database'
import { IOrder } from '@/interfaces'
import { Orders } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getOrders(req, res)


        default:
            res.status(400).json({ message: 'Bad Request' })
    }

    res.status(200).json({ message: 'Example' })
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const orders = await Orders.find()
        .sort({createdAt:'desc'})
        .populate('user','name email')
        .lean()
    await db.disconnect()

    return res.status(200).json(orders)

}
