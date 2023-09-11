// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database/';
import { Products } from '@/models';
import { seedDatabase } from '@/database/';

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>)
{


    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No es posible para producción' })
    }

    await db.connect();

    await Products.deleteMany();
    await Products.insertMany(seedDatabase.initialData.products)


    await db.disconnect();

    res.status(200).json({ message: 'Proceso completado correctamente.' })
}
