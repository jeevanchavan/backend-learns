import followModel from '../models/follow.model.js'
import userModel from '../models/user.model.js';

export const followUserContoller = async (req,res)=>{
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    if (followingUsername == followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFollowingExists = await userModel.findOne({
        username : followingUsername
    })

    if(!isFollowingExists){
        return res.status(404).json({
            message : "User you want to follow does not exists"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower : followerUsername,
        following : followingUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message : `you already following ${followingUsername}`,
            follow : isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower : followerUsername,
        following : followingUsername
    })

    res.status(201).json({
        message : `you are now following ${followingUsername} `,
        follow : followRecord
    })
}

export const unfollowUserController = async (req,res)=>{
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    const isFollowing = await followModel.findOne({
        follower : followerUsername,
        following : followingUsername
    })

    if(!isFollowing){
        return res.status(200).json({
            message : `you are not following ${followingUsername}`
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message : `you successfully unfollowed the ${followingUsername}`
    })
}