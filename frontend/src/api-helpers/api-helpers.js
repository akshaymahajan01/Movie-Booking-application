import axios from 'axios'

export const getAllMovies = async () => {

    const res = await axios.get("/movie/getallmovies").catch(err => console.log(err))

    const resdata = res.data;
    return resdata;


}

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`,
        {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password
        }

    ).catch((err) => console.log(err));


    const resdata = res.data;
    return resdata;


}


export const sendAdminAuthRequest = async (data) => {
    const res = await axios.post('/admin/login', {
        email: data.email,
        password: data.password
    }).catch(err => { console.log(err) })

    const resdata = res.data;
    return resdata;


}

export const getMoviedetails = async (id) => {
    const res = await axios.get(`/movie/${id}`).catch((err) => { console.log(err) })

    const resData = res.data
    return resData;
};


export const newBooking = async (data) => {



    const res = await axios.post('/booking/newbooking', {
        movie: data.movie,
        seatNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId")
    })
        .catch((err) => { console.log(err) });

    const resdata = res.data;
    return resdata;
}

export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/bookings/${id}`).catch((err) => { console.log(err); })

    const resData = res.data;
    return resData;

}


export const deleteBooking = async (id) => {

    const res = await axios.delete(`/booking/${id}`).catch((err) => { console.log(err) })

    const resData = res.data;
    return resData;

}
export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");

    const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));

    const respData = res.data;
    return respData;
}

export const addMovie = async (data) => {
    const res = await axios.post('/movie/addmovie', {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        admin: localStorage.getItem('adminId'),


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).catch((err) => console.log(err))

    const resData = await res.data;
    return resData;

}

export const getAdminById = async () => {
    const id = localStorage.getItem("adminId");
    const res = await axios.get(`/admin/${id}`).catch(err => console.log(err));
    
    const resData =  res.data;
    return resData;
    
}
