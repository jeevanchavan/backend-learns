import imageKit from '@imagekit/nodejs'

const client = new imageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

})

const uploadFile = async({buffer,filename,folder= ""})=>{
    const file = await client.files.upload({
        file: await imageKit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    })

    return file;
}

export default uploadFile