import id3 from 'node-id3'
import uploadFile from '../services/storage.service.js'
import songModel from '../models/song.model.js'

export const uploadSong = async (req,res)=>{
    const {mood} = req.body
    const songBuffer = req.file.buffer

    const tags = id3.read(songBuffer)

    const [songFile,posterFile] = await Promise.all([
        uploadFile({
            buffer:songBuffer,
            filename:tags.title + ".mp3",
            folder:"cohort-2/moodify/songs"
        }),
        uploadFile({
            buffer:tags.image.imageBuffer,
            filename:tags.title + ".jpeg",
            folder:"cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterUrl:posterFile.url,
        mood
    })

    res.status(201).json({
        message:"song created successfully",
        song
    })
}

export const getSong = async(req,res)=>{
    const {mood} = req.query;

    const song = await songModel.findOne({
        mood
    })

    res.status(200).json({
        message:"song fetched successfully ",
        song
    })
}