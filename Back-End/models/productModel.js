import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        default:[],
        required:true
    },
    name:{
        type:String,
        required:true
    },
    billAvailable:{
        type:Boolean,
        default:false,
        required:true
    },
    warrantyAvailable:{
        type:Boolean,
        default:false,
        required:true
    },
    accessoriesAvailable:{
        type:Boolean,
        default:false,
        required:true
    },
    boxAvailable:{
        type:Boolean,
        default:false,
        required:true
    },
    showBidsOnProductPage:{
        type:Boolean,
        default:false
    },
    
    seller:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        default:'Pending',
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("product",productSchema)

export default Product