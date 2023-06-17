import React, { useState , useEffect } from 'react'
import { Box, Button, Typography } from "@mui/material"
import Movieitem from './Movie/Movieitem'
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';



const Home = () => {

  const [movies , setmovies]=useState([])
  useEffect(()=>{
    getAllMovies().then((data)=>setmovies(data.movies)).catch((err)=>console.log(err))
},[]);

  return (
    <div>

      <Box width={"100%"} height="100%" margin="auto" marginTop={2} >
        <Box margin={'auto'} width="80%" height={"70vh"} padding={2}>
          <img src="https://images.thedirect.com/media/article_full/the-batman-dc.jpg" alt="/"
            width={"100%"}
            height={"100%"}
          />
        </Box>

        <Box padding={5} margin="auto">
          <Typography variant="h5" textAlign={'center'}>Latest Releases</Typography>
        </Box>


        <Box display="flex" margin="auto" width="80%" justifyContent={"center"} flexWrap={'wrap'}>
          {movies && movies.slice(0,3).map((item , index) => <Movieitem id={item._id} title={item.title} posterUrl={item.posterUrl} releaseDate={item.releaseDate} key={index} />)}
        </Box>

        <Box display="flex" padding={5} margin="auto">
          <Button LinkComponent={Link} to="/movies"   variant='outlined' sx={{ margin: "auto", color: "#2b2d42" }}> View All Movies </Button>
        </Box>

      </Box>
    </div>
  )
}

export default Home