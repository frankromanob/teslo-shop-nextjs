
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { IOrder } from '@/interfaces';
import { db } from '@/database';
import { Products, Orders } from '@/models';




type Data =
    | { message: string }
    | IOrder

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

    const { orderItems, total } = req.body as IOrder


    const session: any = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ message: 'Debe estar autenticado!' })
    }

    //console.log('ESO:', session)
    const productsIds = orderItems.map(product => product._id)
    await db.connect()

    const dbProducts = await Products.find({ _id: { $in: productsIds } })

    try {
        const subTotal = orderItems.reduce((prev, current) => {

            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price

            if (!currentPrice) {
                throw new Error('Por favor verifique el carrito, información no válida')
            }

            return (current.quantity * currentPrice) + prev
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 1)
        const backendtotal = subTotal + (subTotal * taxRate)


        if (total !== backendtotal) {
            throw new Error('Por favor revise el carrito, los totales no cuadran')
        }

        // const userId = '6511e1cd81e6df88febf7c34'
        const userId = session.user._id;
        if (!userId) {
            console.log('No hay user!', userId, session)
            throw new Error('No se pudo obtener el usuario de la sesión')
        }
        const newOrder = new Orders({ ...req.body, isPaid: false, user: userId })
        //console.log(req.body)
        await newOrder.save()
        await db.disconnect()
        return res.status(201).json(newOrder)

    } catch (error: any) {
        await db.disconnect()
        console.log(error.message)
        res.status(400).json({ message: error.message || 'Revise los logs del servidor' })
    }
    await db.disconnect()
    return res.status(201).json({ message: req.body })
}
