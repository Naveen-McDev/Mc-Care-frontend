/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import moment from "moment";

// profile
function Profile() {
  // accessing the user state
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  // state for holding the doctor data
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on submitting the form
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // update the doctor profile
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/doctor/update-doctor-profile`,
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success, navigate to home page
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  // get doctor data
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      // get doctor info by user-id
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/doctor/get-doctor-info-by-user-id`,
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      // if success update the doctor state with the data
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // fetch data
  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {/* title */}
      <h1 className="page-title">Doctor Profile</h1>
      {/* horizontal line seperating the title and the form */}
      <hr />
      {/* form component */}
      {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}
    </Layout>
  );
}

export default Profile;
