import mongoose from "mongoose";
import Booking from "../Models/Booking.js"
import Movie from "../Models/Movie.js"
import User from "../Models/User.js"

export const newBooking = async (req, res) => {
    const { movie, date, seatNumber, user } = req.body;

    let existinguser;
    let existingmovie;

    try {
        existingmovie = await Movie.findById(movie);
        if (!existingmovie) {
            return res.status(500).json({ message: "movie not found with that id (booking-controller newbooking) " })
        }
        existinguser = await User.findById(user)
        if (!existinguser) {
            return res.status(500).json({ message: "user not found with that id  (booking-controller newbooking)" })
        }
    } catch (error) {
        return console.log(error)
    }

    let booking;

    try {

        booking = new Booking({ movie, date: new Date(`${date}`), seatNumber, user })
        const session = await mongoose.startSession();
        session.startTransaction();
        existinguser.bookings.push(booking)
        existingmovie.bookings.push(booking);
        await existinguser.save({ session });
        await existingmovie.save({ session });
        await booking.save({ session });
        session.commitTransaction();


    } catch (error) {
        return console.log(error)
    }


    if (!booking) {
        return res.status(500).json({ message: "unable to create the new booking  (booking-controller newbooking ) " })
    }
    else {
        return res.status(201).json({ booking })
    }
}

export const getBookingByid = async (req, res) => {


    const id = req.params.id;

    let booking;

    try {

        booking = await Booking.findById(id);

    } catch (error) {
        return console.log(error)
    }


    if (!booking) {
        return res.status(500).json({ message: "request failed (booking-controller getbookingbyid) " })
    }
    else {
        return res.status(201).json({ booking })
    }

}


export const deletebookingbyid = async (req, res) => {


    const id = req.params.id;

    let booking;

    try {

        booking = await Booking.findByIdAndRemove(id).populate("user movie")

        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);

        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction();

    } catch (error) {
        return console.log(error)
    }


    if (!booking) {
        return res.status(500).json({ message: "request failed (booking-controller deletebookingbyid) " })
    }
    else {
        return res.status(201).json({ message: "deleted booking succesfully " })
    }

}