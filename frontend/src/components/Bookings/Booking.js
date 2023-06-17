import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoviedetails, newBooking } from '../../api-helpers/api-helpers'
import { Box, Button, Typography, TextField, FormLabel } from '@mui/material'


const Booking = () => {

  const id = useParams().id

  const [movie, setmovie] = useState([])
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });

  useEffect(() => {
    getMoviedetails(id).then((res) => { setmovie(res.movie) });
  }, [id])


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      alert('movie booked')
  };


  return (
    <>

      {movie &&
        <Fragment>

          <Typography padding={3} fontFamily='fantasy' variant='h4' textAlign={"center"}>
            Book Tickets of Movie : {movie.title}
          </Typography>

          <Box display={"flex"} justifyContent={"center"} marginLeft={20}>
            <Box display={"flex"} justifyContent={"column"} flexDirection="column" paddingTop={3} width="60%" marginRight={"auto"}>
              <img width="60%" height={"300px"} padding={2} src={movie.posterUrl} alt={movie.title} />

              <Box width={"60%"} padding={2}  >
                <Typography paddingTop={2}> {movie.description}</Typography>


                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>

            <Box width={"50%"} paddingTop={2} marginRight={20} bgcolor={'ButtonFace'} height={'300px'} marginTop={5} >
              <form onSubmit={handleSubmit}>
                <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
                  <FormLabel>Seat Number</FormLabel>
                  <TextField value={inputs.seatNumber} onChange={handleChange} name="seatNumber" type={"number"} margin="normal" variant="standard" />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField value={inputs.date} onChange={handleChange} name="date" type={"date"} margin="normal" variant="standard" />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>

        </Fragment>}

    </>
  )
}

export default Booking