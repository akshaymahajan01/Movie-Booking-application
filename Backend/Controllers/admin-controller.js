import Admin from "../Models/Admin.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ message: "email not found    ( admin-controller signup)" })
    }
    else if (!password) {
        return res.status(422).json({ message: "password not found ( admin-controller signup)" })
    }

    let existingAdmin;

    try {

        existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) {
            return res.status(400).json({ message: "admin already exist " })
        }

    } catch (error) {
        return console.log(error)
    }



    let admin;

    const hashedPassword = bcrypt.hashSync(password)

    try {

        admin = new Admin({ email, password: hashedPassword })
        admin = await admin.save();

    } catch (error) {
        return console.log(error)
    }


    if (!admin) {
        return res.status(500).json({ message: "unable to store admin " })
    }
    else {
        return res.status(201).json({ admin })
    }



}


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ message: "email not found    ( admin-controller login)" })
    }
    else if (!password) {
        return res.status(422).json({ message: "password not found ( admin-controller login)" })
    }



    let existingAdmin;

    try {

        existingAdmin = await Admin.findOne({ email })
        if (!existingAdmin) {
            return res.status(400).json({ message: "admin not found " })
        }
        else {
            const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "password Incorrect " })
            }
            else {

                const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
                    expiresIn: "7d"
                })
                return res.status(200).json({ message: "Authentication complete ", token, id: existingAdmin._id })
            }

        }

    } catch (error) {
        console.log(error)
    }



}


export const getAllAdmin = async (req, res) => {

    let admins;

    try {

        admins = await Admin.find()

    } catch (error) {

        return console.log(error)

    }

    if (!admins) {
        return res.status(500).json({ message: "unexpected error occured (adminr-controller getAlladmin)" })
    }
    else {
        return res.status(200).json({ admins })
    }

}

export const getAdminByID = async (req, res) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await Admin.findById(id).populate("addedMovies")
    } catch (err) {
        return console.error(err);
    }
    
    if (!admin) {
        return console.log("Cannot find Admin");
        
    }
    
    return res.status(200).json({ admin })
};