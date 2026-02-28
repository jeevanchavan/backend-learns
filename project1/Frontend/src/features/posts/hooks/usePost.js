import { useContext, useEffect } from "react";
import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { PostContext } from "../post.context";


export const usePost = ()=>{
    const context = useContext(PostContext)

    const {post,feed,setFeed,loading,setLoading} = context;
    
    const handleFeed = async ()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (caption,imageFile)=>{
        setLoading(true)
        const data = await createPost(caption,imageFile)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    const handleLike = async (post)=>{
        const data = await likePost(post)
        await handleFeed()
    }

    const handleUnLike = async (post)=>{
        const data = await unLikePost(post)
        await handleFeed()
    }

    useEffect(() => {
      handleFeed()
    }, [])
    

    return {loading,post,feed,handleFeed,handleCreatePost,handleLike,handleUnLike}
}