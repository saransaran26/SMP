import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import bidRoute from "./routes/bidRoutes.js";
import notifyroute from "./routes/notificationRoute.js";

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()
// const MONGO_URL =
//   "mongodb+srv://saranchakravarthy26:SMP@smp.xeceyw6.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected Succesfully"))
  .catch((err) => console.log(err));
  
app.use('/api/user',userRoutes)
app.use('/api/product',productRoute)
app.use('/api/bids',bidRoute)
app.use('/api/notify',notifyroute)
app.listen(3000, () => {
  console.log("Server is running is connected");
});
