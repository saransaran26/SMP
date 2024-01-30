import express from 'express'
import { verifyToken } from '../middlewaves/authmiddlewave.js'
import Product from '../models/productModel.js'
import multer from 'multer'
import cloudinary from '../config/cloundinaryConfig.js'
import User from '../models/user.js'
import Notification from '../models/notifications.js'


const productRoute = express.Router()

//add
productRoute.post('/add-product',verifyToken,async(req,res)=>{
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        const users = await User.findById(req.body.userId)
        
        const admins = await User.find({role:"admin"})
        admins.forEach(async(admin)=>{
            const notification = new Notification({
                user:admin._id,
                title:"New product",
                message:`New product added by ${users.name}`,
                onClick:'/admin',
                read:false
            })
            await notification.save()
        })
        res.send({
            success:true,
            message:"Product added Successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})
// productRoute.get('/getbyid/:id',async(req,res)=>{
//     try {
//         const admins = await User.findById(req.params.id)
//         res.send({
//             success:true,
//             data:admins.name,
//             message:"data fetched succesfully"
//         })
//     } catch (error) {
//         res.send({
//             success:false,
//             message:error.message
//         })
//     }
// })

//get all

productRoute.post('/get-products',async(req,res)=>{
    //console.log(req.body);
    try {
        const {seller,category=[],age=[],status} = req.body
        let filters = {}
        if(seller){
            filters.seller = seller
        }
        if(status){
            filters.status = status
        }
        if (category.length > 0) {
            filters.category = { $in: category };
          }
          if(age.length>0){
            age.forEach((item)=>{
                const fromage = item.split('-')[0]
                const toage = item.split('-')[1]
                filters.age = {$gte:fromage,$lte:toage}
            })
          }
        const products = await Product.find(filters).populate('seller').sort({createdAt:-1})
        res.send({
            success:true,
            data:products
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//get by id
productRoute.get('/get-product-id/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id).populate("seller")
        res.send({
            success:true,
            data:product
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//edit
productRoute.put('/edit-product/:id',verifyToken,async(req,res)=>{
    try {
        await Product.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true,
            message:"Product updated successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//delete
productRoute.delete('/delete-product/:id',verifyToken,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
            message:"Product Deleted successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//get from pc
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
})

productRoute.post('/upload-image',verifyToken,multer({storage:storage}).single('file'),async(req,res)=>{
    try {
        //upload to cloundinary
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"SMP"
        })
        const productId = req.body.productId
        await Product.findByIdAndUpdate(productId,{
            $push:{images:result.secure_url}
        })
        res.send({
            success:true,
            message:"Image Uploaded Successfully",
            data:result.secure_url
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//update product status
productRoute.put('/update-product-status/:id',async(req,res)=>{
    
    try {
        const {status} = req.body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{status})

        const newNotification = new Notification({
            user: updatedProduct.seller,
            message: `Your product ${updatedProduct.name} has been ${status}`,
            title: "Product Status Updated",
            onClick: `/profile`,
            read: false,
          });
      
          await newNotification.save();
        res.send({
            success:true,
            message:"Product status updated successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

export default productRoute