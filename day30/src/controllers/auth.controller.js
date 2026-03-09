export const registerUser = (req,res,next)=>{
    try {
        console.log(username)
    } catch (err) {
        err.status = 500
        next(err)
    }
}