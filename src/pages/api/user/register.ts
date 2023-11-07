import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';
import { validations} from '@/utils';

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            email: string;
            role: string;
            name: string;
        };
    }

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
    // res.status(200).json({ message : 'hi from the other side' })
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = ''  } = req.body as {name: string, email: string, password: string  }

    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe ser de al menos 6 caracteres.' })
    }
    if (name.length < 2) {
        return res.status(400).json({ message: 'El nombre debe ser de al menos 2 caracteres.' })
    }

    console.log(name, email, password)
    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'Correo con formato inválido' })
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        await db.disconnect()
        return res.status(400).json({ message: 'El correo ya existe' })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        name,
        role: 'client'
    })

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error en el servidor' })
    }

    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}
