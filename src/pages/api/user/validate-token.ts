import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { jwt as JWT } from '../../../utils'


type Data =
    | { message: string }
    | {
        token: string;
        user: {
            email: string;
            role: string;
            name: string;
        }
    }

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return validateJWT(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
    // res.status(200).json({ message : 'hi from the other side' })
}

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies

    console.log(token)

    let userId = '';

    try {
        userId = await isValidToken(token.toString())
    } catch (error) {
        res.status(401).json({ message: '1. Token de autorización no es válido' })
    }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'Usuario no existe' })
    }


    const { _id, email, role, name } = user;

    // const token=jwt.signToken(_id,email)

    return res.status(200).json({
        token: JWT.signToken(_id, email),
        user: {
            email, role, name
        }
    })
}


const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No se encontró semilla de JWT')
    }

    return new Promise((resolve, reject) => {
        try {

            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no es válido');

                const { _id } = payload as { _id: string }

                resolve(_id)
            })
        } catch (error) {
            console.log(error)
            reject('JWT no es válido');
        }
    })
}