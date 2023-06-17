import express from "express";
import { addMovie, getAllMovies, getMovie } from "../Controllers/movie-controller.js";
const movieRouter = express.Router();


movieRouter.post("/addmovie" , addMovie )
movieRouter.get("/getallmovies" , getAllMovies )
movieRouter.get("/:id" , getMovie )


export default movieRouter