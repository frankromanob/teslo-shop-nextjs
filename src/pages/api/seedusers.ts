// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database/';
import { Users } from '@/models';
import { seedUserData } from '@/database/';

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

    await Users.deleteMany();
    await Users.insertMany(seedUserData.initialData.users)


    await db.disconnect();

    res.status(200).json({ message: 'Proceso completado correctamente.' })
}
