import express from "express";
import { getAdminByID, getAllAdmin, login, signup } from "../Controllers/admin-controller.js";


const adminRouter = express.Router();


adminRouter.post("/signup" , signup )
adminRouter.post("/login" , login )
adminRouter.get("/getalladmin" , getAllAdmin )
adminRouter.get("/:id", getAdminByID);


export default adminRouter