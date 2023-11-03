import { db } from './';
import { Products } from '../models'
import { IProduct } from '../interfaces';

interface ProductSlug {
    slug: string
}


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    await db.connect()
    const product = await Products.findOne({ slug }).lean()
    await db.disconnect()

    if (product) {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return JSON.parse(JSON.stringify(product));
    } else {
        return null
    }


}


export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect()
    const slugs = await Products.find().select('slug -_id').lean()
    await db.disconnect()

    return JSON.parse(JSON.stringify(slugs))

}


export const getSearchProducts = async (term: string): Promise<IProduct[]> => {
    term = term.toString().toLowerCase();

    await db.connect()

    const products = await Products.find({
        $text: { $search: term }
    })
        .select('title gender images price inStock slug tags -_id')
        .lean()

    await db.disconnect()

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return product
    })

    return updatedProducts
}



export const getAllProducts = async (): Promise<IProduct[]> => {
    await db.connect()
    const products = await Products.find().select('title gender images price inStock slug tags -_id').lean()
    await db.disconnect()
    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return product
    })
    return JSON.parse(JSON.stringify(updatedProducts))

}