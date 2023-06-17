import mongoose from "mongoose";
import Movie from "../Models/Movie.js";
import Admin from "../Models/Admin.js";
import Jwt from "jsonwebtoken";


export const addMovie = async (req, res) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; // Bearer token 
    if (!extractedToken) {
        res.status(404).json({ message: "token not found ( movie-controller addmovie)" })
    }

    let adminid;

    /// verify token 


    Jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` })
        }
        else {
            adminid = decrypted.id;
            return;
        }
    })

    /// create new movie 

    const { title, description, releaseDate, posterUrl, featured } = req.body;

    if (!title) {
        return res.status(422).json({ message: "title not found ( movie-controller addmovie)" })
    }
    else if (!description) {
        return res.status(422).json({ message: "description not found ( movie-controller addmovie)" })
    }
    else if (!posterUrl) {
        return res.status(422).json({ message: "posterurl not found ( movie-controller addmovie)" })
    }

    let movie;

    try {
        movie = new Movie({ title, description, releaseDate: new Date(`${releaseDate}`), posterUrl, featured, admin: adminid })

        const session = await mongoose.startSession()
        const adminUser = await Admin.findById(adminid)
        session.startTransaction()
        await movie.save({session})
        adminUser.addedMovies.push(movie)
        await adminUser.save({session})
        await session.commitTransaction()
        

    } catch (error) {
        return console.log(error)
    }

    if (!movie) {
        return res.status(500).json({ message: "request failed (movie-controller addmovie) " })
    }
    else {
        return res.status(201).json({ movie })
    }

}


export const getAllMovies = async (req,res)=>{

        let movies;

        try {

            movies = await Movie.find();
            
        } catch (error) {
            return console.log(error)
        }


        if (!movies) {
            return res.status(500).json({ message: "request failed (movie-controller getallmovies) " })
        }
        else {
            return res.status(200).json({ movies })
        }

}

export const getMovie = async (req,res)=>{


    const id = req.params.id;

    let movie;

    try {

        movie = await Movie.findById(id);
        
    } catch (error) {
        return console.log(error)
    }


    if (!movie) {
        return res.status(500).json({ message: "request failed (movie-controller getmovie) " })
    }
    else {
        return res.status(201).json({ movie })
    }

}