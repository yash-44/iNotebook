const express = require('express')
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchuser = require('../Middleware/fetchuser')

// jwt secret key for token
const JWT_SECRET = "tokenforthis"

const router = express.Router()

// Route-1 //- create user using: post "/api/auth/createuser" . no login required
router.post('/createuser', [
    body('name',"please enter a valid name").isLength({min:3}),
    body('email',"please enter a valid email").isEmail(),
    body('password',"password length must be atleast 5 characters").isLength({min:5})
]
 ,async (req,res)=>{
    let success = false
    // if there are errors so , return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        // check whether the user with this email exists already
        try{

        let user = await User.findOne({email: req.body.email})
        if (user){
            return res.status(400).json({success, error: "Sorry a user with this email is already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt)

        // create a user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // data use for read in database (data = user.id)
        const data = {
            user: {
                id: user.id
            }
        }

        // generate token
        const authtoken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData)
        success = true
        res.json({success,authtoken})
        // .then(user => res.json(user))
        // .catch(err=> {console.log(err), res.json({error: "please enter a unique value for email", message: err.message})})
        // const user = User(req.body)
        // user.save()
        // res.send(req.body)
    } catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error')
    }
})

// Route-2 //- Authenitcate user using: post "/api/auth/login" . no login required
router.post('/login', [
    body('email',"please enter a valid email").isEmail(),
    body('password',"password can not be blank").exists()
],
    async(req,res)=>{
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email,password} = req.body

        // check email is present in database or not if not so send error
        try {
            let user = await User.findOne({email})
            if(!user){
                success = false
                return res.status(400).json({success, error: "please try to login with correct email & password"})
            }
            // compare password (same of not)
            const passwordcompare = await bcrypt.compare(password,user.password)
            if(!passwordcompare){
                success = false
                return res.status(400).json({success, error: "please try to login with correct email & password"})
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({success,authtoken})

        } catch(error){
            console.error(error.message)
            res.status(500).send('Internal server error')
        }
    }
)

// Route-3 //- Get user details using: post "/api/auth/getuser" . login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error')
    }
})

module.exports = router