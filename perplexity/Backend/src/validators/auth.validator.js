import { validationResult } from "express-validator"

const validate = (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty){
        res.status(400).json({
            errors:errors.array()
        })
    }
    next()
}

export const registerValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min:3, max:20}).withMessage("Username must be between 3 and 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email must be required")
        .isEmail().withMessage("Please provide valid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("Password must be at least 6 characters"),

    validate
]