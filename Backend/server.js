import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from "cors"
import userRouter from './Routes/User-route.js';
import adminRouter from './Routes/Admin-route.js';
import movieRouter from './Routes/Movie-route.js';
import bookingRouter from './Routes/Booking-route.js';



dotenv.config();
const app = express();
app.use(express.json());



app.use(cors());



app.use("/user" , userRouter)
app.use("/admin" , adminRouter)
app.use("/movie" , movieRouter)
app.use("/booking" , bookingRouter)




const port = process.env.PORT || 1111


mongoose.connect(`mongodb+srv://akshay:${process.env.MONGODB_PASSWORD}@cluster0.ztu7lgn.mongodb.net/`)
.then(()=>app.listen(port , () => {console.log(`connected to the database and server ${port}`)}))
.catch((error)=>{console.log(error)})






