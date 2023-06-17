import express from "express";
import { deleteUser, getAllUsers, getBookingsofUser, login, signup, updateUser, getUserById } from "../Controllers/user-controller.js";
import { getBookingByid } from "../Controllers/booking-controller.js";

const userRouter = express.Router();


userRouter.get("/getallusers", getAllUsers)
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/bookings/:id", getBookingsofUser)

export default userRouter;