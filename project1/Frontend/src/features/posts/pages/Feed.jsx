import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {

    const {feed,loading,handleFeed,handleLike,handleUnLike,handleSave,handleUnSave} = usePost()

    useEffect(() => {
      handleFeed()
    }, [])

    if(loading || !feed){
        return (<main>
            <h1>Feed is Loading</h1>
        </main>)
    }
    console.log(feed)
    

  return (
    <main className='feed-page'>
        <Nav />
        <div className="feed">
            <div className="posts">
                {feed.map((post,idx)=>{
                    return <Post key={idx} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} handleSave={handleSave} handleUnSave={handleUnSave} />
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed