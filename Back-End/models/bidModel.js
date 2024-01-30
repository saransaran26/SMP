import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    buyer:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },

    bidAmount:{
        type:Number,
        requried:true
    },
    message:{
        type:String,
        requried:true
    },
    mobile:{
        type:Number,
        requried:true
    }
},{timestamps:true})

const Bid = mongoose.model("Bid",bidSchema)

export default Bid