import React, { useEffect, useState } from 'react'
import { AppBar, Box, Autocomplete, TextField, Toolbar, Tabs, Tab, IconButton } from "@mui/material"
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { getAllMovies } from '../api-helpers/api-helpers.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { adminAction, userAction } from '../store/redux.js';


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)


    const [value, setvalue] = useState(null)
    const [movies, setmovies] = useState([])

    useEffect(() => {
        getAllMovies().then((data) => setmovies(data.movies)).catch((err) => console.log(err))
    }, []);

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminAction.logout() : userAction.logout())
        alert("logout successfull")
    }


    const handleChange = (e , val) => {
          const movie = movies.find((m)=> m.title === val)
          if(isUserLoggedIn)
          {
             navigate(`/booking/${movie._id}`)
          }
    }

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#212121" }}>
            <Toolbar>

                <Box width={'20%'} >
                    <IconButton LinkComponent={Link} to="/">
                           <TheaterComedyIcon style={{ color: 'white' }} />
                    </IconButton>
                </Box>

                <Box width={"30%"} margin={"auto"} sx={{ bgcolor: "#fafafa" }}>

                    <Autocomplete
                        onChange={handleChange}
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) => <TextField  {...params} placeholder="search" />}
                    />

                </Box>

                <Box display={"flex"}>
                    <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e, val) => setvalue(val)}>
                        <Tab LinkComponent={Link} to="/movies" label="Movie" />

                        {!isAdminLoggedIn && !isUserLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                                <Tab LinkComponent={Link} to="/auth" label="Auth" />

                            </>
                        )}
                        {isUserLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/user" label="Profile" />
                                <Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(false)} />
                            </>)}

                        {isAdminLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/addmovie" label="Add Movie" />
                                <Tab LinkComponent={Link} to="/adminprofile" label="Profile" />
                                <Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(true)} />
                            </>)}

                    </Tabs>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header