import jwt from 'jsonwebtoken'
import blacklistModel from '../models/blacklist.model.js';
import redis from '../config/cache.js';

const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    // check
    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        
        // new property
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

export default authMiddleware