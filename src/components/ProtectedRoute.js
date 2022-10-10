/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertSlice";

// protected routes
function ProtectedRoute(props) {
  // accessing the user state
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user
  const getUser = async () => {
    try {
      dispatch(showLoading());
      // getting user info by id from the backend
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/get-user-info-by-id`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success, then update the user state using setuser action
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        // else clear the local storage and navigate to login screen
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      // if error clear the local storage and navigate to login screen
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };

  // fetch data
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  // if token is present in the local storage, then render the children
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    // or navigate to login screen
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
