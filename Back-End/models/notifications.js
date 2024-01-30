import mongoose from 'mongoose'


const notificationSchema = new mongoose.Schema({
    title:{
        type:String,
        requried:true
    },
    message:{
        type:String,
        requried:true
    },
    onClick:{
        type:String,
        requried:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    read:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

const Notification = mongoose.model('notification',notificationSchema)

export default Notification