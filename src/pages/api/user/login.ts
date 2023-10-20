import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

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
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
    // res.status(200).json({ message : 'hi from the other side' })
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña no válidos - U' })
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Usuario o contraseña no válidos - P' })
    }
    const { _id, role, name } = user;

    const token=jwt.signToken(_id,email)

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}
