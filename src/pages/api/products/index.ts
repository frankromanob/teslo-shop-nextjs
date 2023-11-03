import type { NextApiRequest, NextApiResponse } from 'next'
import { SHOP_CONSTANTS, db } from '@/database'
import { Products } from '@/models'
import { IProduct } from '../../../interfaces';

type Data =
    | { message: string}
    | IProduct[]
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method){
        case 'GET':
            return getProducts(req,res)
        default:
            return res.status(400).json({
                message:'Bad Request'
            })
    }
}

const getProducts = async (req: NextApiRequest,res: NextApiResponse<Data>) => {


    const {gender = 'all'} = req.query;

    let condition= {}

    if (gender !=='all' && SHOP_CONSTANTS.validGenders.includes(gender as string)){
        condition={gender}
    }
    await db.connect()

    const products = await Products.find(condition).select('title gender images price inStock slug -_id').lean()
    await db.disconnect()

    const updatedProducts= products.map(product=>{
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return product
    })
    res.status(200).json(updatedProducts)
}

