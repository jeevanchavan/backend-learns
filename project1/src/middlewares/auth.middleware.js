import jwt from 'jsonwebtoken'

export const identifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }
    
        let decoded = null;
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET);
        } catch (error) {
            res.status(401).json({
                message:"Token invalid"
            })
        }

        // new property
        req.user = decoded;

        next();
}