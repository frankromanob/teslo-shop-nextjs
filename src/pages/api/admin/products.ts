import { IProduct } from '@/interfaces'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database';
import { Products } from '@/models';
import { isValidObjectId } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        case 'PUT':
            return udpateProduct(req, res)
        case 'POST':
            return createProduct(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })

    }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const products = await Products.find().sort({ title: 'asc' }).lean()
    await db.disconnect()


    //TODO: actualizar imagenes
    const updatedProducts= products.map(product=>{
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return product
    })

    return res.status(200).json(updatedProducts)

}
const udpateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) {
        res.status(400).json({ message: 'El ID del producto no es válido' })
    }

    if (images.length < 2) {
        res.status(400).json({ message: 'Es necesario al menos 2 imagenes' })
    }

    try {
        await db.connect()
        const producto = await Products.findById(_id);
        if (!producto) {
            await db.disconnect()
            return res.status(400).json({ message: 'No existe un producto con ese ID' })
        }

        //delete image
        producto.images.forEach(async (image) => {
            if (!images.includes(image)) {
                const [fileId,Extension]=image.substring(image.lastIndexOf('/')+1).split('.')
                await cloudinary.uploader.destroy(fileId);
            }

        })
        await producto.updateOne(req.body)

        await db.disconnect()
        return res.status(200).json(producto)
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: 'Ha ocurrido un error, revisar logs del servidor' })

    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { images = [] } = req.body as IProduct;

    if (images.length < 2) {
        return res.status(400).json({ message: 'Es necesario al menos 2 imagenes' })
    }

    try {
        await db.connect()

        const productInDb = await Products.findOne({ slug: req.body.slug })
        if (productInDb) {
            await db.disconnect()
            return res.status(400).json({ message: 'Ya existe un producto con ese -slug-' })

        }

        const producto = new Products(req.body)
        await producto.save()
        await db.disconnect()

        return res.status(201).json(producto)

    } catch (error) {
        await db.disconnect()
        return res.status(400).json({ message: 'Ha ocurrido un error, revisar logs del servidor' })
    }
}

