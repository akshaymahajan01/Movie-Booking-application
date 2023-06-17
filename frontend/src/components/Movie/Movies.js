import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers'
import { Box, Typography } from '@mui/material'
import Movieitem from './Movieitem'


const Movies = () => {
  const [Movies, setMovies] = useState([])
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies)).catch((err) => console.log(" no data found"))
  }
    , [])

  return (
    <Box margin={"auto"} marginTop={4} >
      <Typography variant='h5' padding={2} textAlign='center' bgcolor={'#900C3F'} width="40%" color="white" margin={"auto"}>
        All Movies
      </Typography>
      <Box width={"100%"} margin={'auto'} display={"flex"} justifyContent='center' flexWrap={'wrap'}>
        {Movies.map((item, idex) =>
          <Movieitem id={item._id} title={item.title} posterUrl={item.posterUrl} releaseDate={item.releaseDate} key={idex} />
        )}
      </Box>
    </Box>
  )
}

export default Movies