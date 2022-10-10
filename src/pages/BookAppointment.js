/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

// book appointment
function BookAppointment() {
  // state to check availablity
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  // state to set date
  const [date, setDate] = useState();
  // state to set time
  const [time, setTime] = useState();

  // accessing the user state
  const { user } = useSelector((state) => state.user);
  // state holding the doctor data
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  // get doctor data
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      // get doctor info by id from backend
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/doctor/get-doctor-info-by-id`,
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      // if success, then update the doctor state
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // check availability
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      // check booking availability in the backend
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/check-booking-avilability`,
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success, then update the availability state
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  // book now
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      // book appointment
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success navigate to appointment screen
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  // fetch data
  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {/* if doctor is true */}
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            {/* image */}
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            {/* doctor detail */}
            <Col span={8} sm={24} xs={24} lg={8}>
              {/* timing */}
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
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
              {/* website */}
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>

              <div className="d-flex flex-column pt-2 mt-2">
                {/* picking date */}
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                {/* picking time */}
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                {/* check for availability */}
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {/* if available book now */}
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
