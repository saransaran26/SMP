import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    status:{
        type:String,
        default:"active"
    },
    profilePicture:{
        type:String,
        default:""
    }

},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User