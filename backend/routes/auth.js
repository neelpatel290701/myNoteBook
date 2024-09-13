const express = require('express')
const router = express.Router()

const { body , validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "neelpatel"

const User = require('../models/User')
const fetchUser = require('../middlewares/fetchuser')

//ROUTE - 1 create new user 
router.post('/createuser',[
        body("name","minimum lenghth should be 3").isLength({min:3}),
        body("email","enter valid email").isEmail()
], async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }

    try{
            let user  = await User.findOne({email : req.body.email})
            if(user){
                return res.status(400).json({email : "User with this email already exist"})
            }

            var salt = await bcrypt.genSaltSync(10);
            var hashPass = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashPass
            })

            const data = {
                user : {
                    id : user.id
                }
            }

            var authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken})

    }catch(error){
            res.status(500).json({error : "something went wrong"})
    }
})

//ROUTE - 2 User - Login
router.post('/login',[
        body("email","enter valid email").isEmail(),
        body("password","passwor is empty").exists()
], async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }

    try{

        const isUserExist = await User.findOne({email : req.body.email}) ;
        if(!isUserExist){
            return res.status(400).json({error : "please enter valid credentials"})
        }

        const passCompare = await bcrypt.compare(req.body.password , isUserExist.password)
        if(!passCompare){
            return res.status(400).json({error : "please enter valid credentials"})
        }

        const data = {
            user : {
                id : isUserExist.id
            }
        }

        var authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken})

    }catch(error){

    }

})

//ROUTE - 3 Get User Details

router.post('/getuser', fetchUser , async (req,res)=>{

        try{
            const userId = req.user.id
            const user = await User.findById(userId).select("-password")
            res.send(user)
        }catch(err){
            res.status(400).json({error : "please authenticate with valid user"})
        }
})


module.exports = router