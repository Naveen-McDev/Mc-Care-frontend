import React from "react";
import DoctorForm from "../components/DoctorForm";
import Layout from "../components/Layout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// apply doctor
function ApplyDoctor() {
  const dispatch = useDispatch();
  // accessing user state
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // on submitting the application form
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // posting the appication data
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/apply-doctor-account`,
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
        // if failed, throw error
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      {/* title */}
      <h1 className="page-title">Apply Doctor</h1>
      {/* horizontal line seperating the title and the application form */}
      <hr />
      {/* form */}
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;
