import { useContext } from "react";
import { getFeed } from "../services/post.api";
import { PostContext } from "../post.context";


export const usePost = ()=>{
    const context = useContext(PostContext)

    const {post,setPost,feed,setFeed,loading,setLoading} = context;
    
    const handleFeed = async ()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    return {loading,post,feed,handleFeed}
}