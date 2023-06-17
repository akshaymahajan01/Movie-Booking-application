import  express  from "express";
import { deletebookingbyid, getBookingByid, newBooking } from "../Controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/newbooking" , newBooking)
bookingRouter.get("/:id" , getBookingByid)
bookingRouter.delete("/:id" ,deletebookingbyid )

export default bookingRouter