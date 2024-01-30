import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    try {
        const token = req.header("authorization").split(" ")[1]
        //console.log("token is",token);
        const dcrypted = jwt.verify(token,"Guvi")
        //console.log("id",dcrypted.userId);
        req.body.userId = dcrypted.userId
        next()
    } catch (error) {
        //console.log("error",error);
        res.send({
            success:false,
            message:error.message
        })
    }
}