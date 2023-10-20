import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import NextAuth from '@/pages/api/auth/[...nextauth]';
import  authOptions  from "@/pages/api/auth/[...nextauth]"
import { IOrder } from '@/interfaces';

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrders(req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }

    //res.status(200).json({ message: 'Hola' })
}

const createOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body

    const session = await getServerSession(authOptions)
    // console.log('ESO:',session)
    // if (!session) {
    //     return
    // }

    res.status(201).json({ message: req.body })
}
