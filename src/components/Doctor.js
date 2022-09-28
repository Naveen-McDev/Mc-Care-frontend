import React from "react";
import { useNavigate } from "react-router-dom";

// doctor card component
function Doctor({ doctor }) {
  const navigate = useNavigate();

  return (
    <div
      className="card p-2 cursor-pointer"
      //   onclicking navigate the user to book appointment screen
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      {/* cart title */}
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      {/* horizontal line seperating the title and the content */}
      <hr />
      {/* phone number */}
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      {/* address */}
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      {/* fee per visit */}
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      {/* timings */}
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
