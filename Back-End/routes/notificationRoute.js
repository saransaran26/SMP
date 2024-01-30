import express from 'express'
import { verifyToken } from '../middlewaves/authmiddlewave.js'
import Notification from '../models/notifications.js'

const notifyroute = express.Router()

notifyroute.post('/notify',verifyToken,async(req,res)=>{
    try {
        const notification = new Notification(req.body)
        await notification.save()
        res.send({
            success:true,
            message:"notification send successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

notifyroute.get('/get-all-notify',verifyToken,async(req,res)=>{
    try {
        const notification = await Notification.find({
            user:req.body.userId
        }).sort({createdAt:-1})
        res.send({
            success:true,
            data:notification
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

notifyroute.delete('/delete-notify/:id',verifyToken,async(req,res)=>{
    try {
        await Notification.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
            message:'Notification deleted successfully'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})
notifyroute.put('/read-notify',verifyToken,async(req,res)=>{
    try {
        await Notification.updateMany(
            {user:req.body.userId,read:false},
            {$set:{read:true}}
        )
        res.send({
            success:true,
            message:'All notifications marked as read'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})


export default notifyroute