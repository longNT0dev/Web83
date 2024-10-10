import { v2 as cloudinary } from 'cloudinary';

const uploadSingleFile = (req, res) => {
    const file = req.file
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    cloudinary.uploader.upload(dataUrl, (error, result) => {
        if(error) return res.send(error)

        return res.send(result)
    })
}



export {
    uploadSingleFile
}