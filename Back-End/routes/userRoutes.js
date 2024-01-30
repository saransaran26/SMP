import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewaves/authmiddlewave.js'

const userRoutes = express.Router()

userRoutes.post('/register',async(req,res)=>{
    
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            throw new Error("User Already Exists")
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        console.log(req.body);
        await newUser.save()
        res.send({
            success:true,
            message:"User created Succesfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

userRoutes.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("User not Found")
        }

        if(user.status != 'active'){
            throw new Error("This User account is Blocked,Contact Admin")
        }
        const validatePassword = await bcrypt.compare(req.body.password,user.password)
        if(!validatePassword){
            throw new Error("Invalid Password")
        }
        const token = jwt.sign({userId:user._id},"Guvi",{expiresIn:'2h'})
        res.send({
            success:true,
            message:'User logged in successfully',
            data:token
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

userRoutes.get('/get-current-user',verifyToken,async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId)
        res.send({
            success:true,
            message:"User fetched successfully",
            data:user
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

userRoutes.get('/get-all-user',verifyToken,async(req,res)=>{
    try {
        const response = await User.find()
        res.send({
            success:true,
            message:"User Fetched Successfully",
            data:response
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

userRoutes.put('/update-user-status/:id',verifyToken,async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true,
            message:"User Status Updated Successfully",
            
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

export default userRoutes