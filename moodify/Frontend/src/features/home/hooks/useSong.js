import { useContext } from "react"
import { SongContext } from "../song.context"
import { getSong } from "../services/song.api";

export const useSong = ()=>{
    const context = useContext(SongContext);
    console.log(context)

    const {song,setSong,loading,setLoading} = context;

    const handleGetSong = async ({mood})=>{
        setLoading(true)
        const data = await getSong({mood})
        // console.log(data.song)
        setSong(data.song)
        setLoading(false)
    }

    return {song,loading,handleGetSong}
}