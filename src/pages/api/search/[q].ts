import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Products } from '@/models'
import { IProduct } from '../../../interfaces';

type Data =
    | { message: string }
    | IProduct
    | IProduct[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q = '' } = req.query;

    if (q.length === 0) {
        res.status(400).json({ message: 'Debe especificar la busqueda' })
    }

    q = q.toString().toLowerCase();

    await db.connect()

    const products = await Products.find({
        $text: { $search: q }
    })
    .select('title gender images price inStock slug tags -_id')
    .lean()

    await db.disconnect()

    if (products) {
        res.status(200).json(products)
    }
    else {
        res.status(404).json({ message: 'Producto no encontrado' })
    }


    // $or: [
    //     { "title": { '$regex': `${q}` } },
    //     { "slug": { '$regex': `${q}` } },
    //     { "description": { '$regex': `${q}` } }
    // ]

}

