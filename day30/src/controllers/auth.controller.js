// error handling ka code ->

// export const registerUser = (req,res,next)=>{
//     try {
//         console.log(username)
//     } catch (err) {
//         err.status = 500
//         next(err)
//     }
// }

// express validator ke liye ->

export const registerUser = (req,res,next)=>{
    return res.status(201).json({
        message:"user registered successfully"
    })
}