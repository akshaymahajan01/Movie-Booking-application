import { Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home";
import Movies from "./components/Movie/Movies";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking"
import UserProfile from "./Profile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { adminAction, userAction } from "./store/redux";
import { useEffect } from "react";
import AddMovie from "./components/Movie/AddMovie";
import AdminProfile from "./Profile/AdminProfile";



function App() {

  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)

  console.log("admin logged in ", isAdminLoggedIn)
  console.log("user logged in ", isUserLoggedIn)

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userAction.login())
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminAction.login())
    }
  })

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />


        {!isUserLoggedIn && !isAdminLoggedIn && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />

          </>)
        }


        {isUserLoggedIn && !isAdminLoggedIn && (
          <>
            <Route path="/user" element={<UserProfile />} />
            <Route path="/booking/:id" element={<Booking />} />

          </>)
        }

        {!isUserLoggedIn && isAdminLoggedIn && (
          <>
            <Route path="/adminprofile" element={<AdminProfile />} />
            <Route path="/addmovie" element={<AddMovie />} />

          </>)
        }




      </Routes>
    </div>
  );
}

export default App;
