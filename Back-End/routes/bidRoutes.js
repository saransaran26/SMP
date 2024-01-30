import express from 'express'
import { verifyToken } from '../middlewaves/authmiddlewave.js'
import Bid from '../models/bidModel.js'


const bidRoute = express.Router()

bidRoute.post('/place-new-bid',verifyToken,async(req,res)=>{
    try {
        const newBid = new Bid(req.body)
        await newBid.save()
        res.send({
            success:true,
            message:"Bid placed Successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

bidRoute.post('/get-all-bid',verifyToken,async(req,res)=>{
    //  console.log(req.body);
    try {
        const {product,seller,buyer} = req.body
        let filters = {}
        if(product){
            filters.product = product
        }
        if(seller){
            filters.seller = seller
        }
        if(buyer){
            filters.buyer = buyer
        }
        const bids = await Bid.find(filters)
        .populate('product')
        .populate("buyer")
        .populate('seller').sort({createdAt:-1})
        res.send({
            success:true,
            data:bids
        })
    } catch (error) {
        // console.log("error",error.message);
        res.send({
            success:false,
            message:error.message
        })
    }
})

export default bidRoute