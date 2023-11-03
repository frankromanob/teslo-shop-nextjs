import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { errors as formidableErrors } from 'formidable'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data = {
    message: string
}


export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)


        default:
            res.status(400).json({ message: 'Bad Request' })

    }


    res.status(200).json({ message: 'Example' })
}


const saveFile = async (file: string): Promise<string> => {
    // console.log('save: ', file)
    const { secure_url } = await cloudinary.uploader.upload(file)
    //console.log(secure_url)
    return secure_url

}


const parseFiles = async (req: NextApiRequest): Promise<string> => {

    return new Promise((resolve, reject) => {
        const form = formidable({});

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return reject(err)
            }
            // console.log('parse: ', files)
            const filePath = await saveFile(files.file![0].filepath)
            resolve(filePath)
        })
    })

}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageURL = await parseFiles(req)

    return res.status(200).json({ message: imageURL })

}
