import { db } from './';
import { Products } from '../models'
import { IProduct } from '../interfaces';

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    db.connect()
    const product = await Products.findOne({ slug }).lean()
    db.disconnect()

    if (product) {
        return JSON.parse(JSON.stringify(product));
    } else {
        return null
    }
}

interface ProductSlug {
    slug: string
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
    db.connect()
    const slugs = await Products.find().select('slug -_id').lean()
    db.disconnect()
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

    return products
}



export const getAllProducts = async (): Promise<IProduct[]> => {
    db.connect()
    const allProducts = await Products.find().select('title gender images price inStock slug tags -_id').lean()
    db.disconnect()
    return JSON.parse(JSON.stringify(allProducts))

}