import User from "../Models/User.js"
import Booking from "../Models/Booking.js"
import bcrypt from 'bcryptjs'


export const getAllUsers = async (req, res, next) => {

    let users;

    try {

        users = await User.find()

    } catch (error) {

        return console.log(error)

    }

    if (!users) {
        return res.status(500).json({ message: "unexpected error occured (user-controller getAllUser)" })
    }
    else {
        return res.status(200).json({ users })
    }

}


export const signup = async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name) {
        return res.status(422).json({ message: "name not found  ( user-controller signup)" })
    }
    else if (!email) {
        return res.status(422).json({ message: "email not found    ( user-controller signup)" })
    }
    else if (!password) {
        return res.status(422).json({ message: "password not found ( user-controller signup)" })
    }


    let existingUser;

    try {

        existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exist " })
        }

    } catch (error) {
        console.log(error)
    }



    let user;

    const hashedPassword = bcrypt.hashSync(password)

    try {

        user = new User({ name, email, password: hashedPassword })
        user = await user.save();

    } catch (error) {

        return console.log(error)

    }

    if (!user) {
        return res.status(500).json({ message: "unexpected error occured (user-controller signup)" })
    }
    else {
        return res.status(200).json({ id:user._id })
    }

}

export const updateUser = async (req, res) => {

    const id = req.params.id;

    const { name, email, password } = req.body;


    if (!name && !email && !password) {
        return res.status(422).json({ message: "invalid inputs ( user-controller updateuser)" })
    }

    const hashedPassword = bcrypt.hashSync(password)

    let user;

    try {

        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword })

    } catch (error) {
        return console.log(error);
    }

    if (!user) {
        return res.status(500).json({ message: "unexpected error occured (user-controller updateuser)" })
    }
    else {
        return res.status(200).json({ message: "updated succesfully" })
    }

}


export const deleteUser = async (req, res) => {

    const id = req.params.id;

    let user

    try {

        user = await User.findByIdAndDelete(id)

    } catch (error) {
        return console.log(error);
    }

    if (!user) {
        return res.status(500).json({ message: "unexpected error occured (user-controller deleteuser)" })
    }
    else {
        return res.status(200).json({ message: "deleted succesfully" })
    }

}

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ message: "email not found    ( user-controller login)" })
    }
    else if (!password) {
        return res.status(422).json({ message: "password not found ( user-controller login)" })
    }


    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error)
    }

    if (!existingUser) {
        return res.status(400).json({ message: "user not found" })
    }
    else {
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "password Incorrect " })
        }
        else {
            return res.status(200).json({ message: "login successfully "  , id:existingUser._id })
        }
    }


}


export const getBookingsofUser = async (req, res) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id }).populate("user movie");

    } catch (err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Unexpected Error Occurred user-controller getbookingsofuser" })
    }
    return res.status(200).json({ bookings });
}


export const getUserById = async (req, res) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    }
    catch(err) {
        return console.log(err);
    }
    if (!User) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ user });
}