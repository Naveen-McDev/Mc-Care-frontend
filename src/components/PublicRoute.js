import React from "react";
import { Navigate } from "react-router-dom";

// public route
function PublicRoute(props) {
  // if token is present in the local storage, then navigate to home screen or render the children
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}

export default PublicRoute;
