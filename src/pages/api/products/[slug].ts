import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Products } from '@/models'
import { IProduct } from '../../../interfaces';

type Data =
    | { message: string }
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;

    let condition = {}

    if (slug !== '') {
        condition = { slug }
    }
    await db.connect()

    const products = await Products.findOne(condition).lean()
    await db.disconnect()
    if (products) {

        products.images = products.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })

        res.status(200).json(products)
    }
    else {
        res.status(404).json({ message: 'Producto no encontrado' })
    }
}

