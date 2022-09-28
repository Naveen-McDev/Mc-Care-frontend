import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// doctor appointment
function DoctorAppointments() {
  // state holding the doctor appointments
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  // get appointments data
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      // geting appointments by doctor id
      const resposne = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/doctor/get-appointments-by-doctor-id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success, update the state with the data.
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // change appointment status
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      // change the appointment status in the backend
      const resposne = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/doctor/change-appointment-status`,
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success refetch the data.
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  // column to show appointment lists
  const columns = [
    // id
    {
      title: "Id",
      dataIndex: "_id",
    },
    // patient name
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    // phone number
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    // date and time
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    // status
    {
      title: "Status",
      dataIndex: "status",
    },
    // actions
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {/* approving and rejecting the appointment */}
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  // fetch data
  useEffect(() => {
    getAppointmentsData();
  }, []);


  return (
    <Layout>
      {/* title */}
      <h1 className="page-header">Appointments</h1>
      {/* horizontal line seperating the title and tha table containing the appointment list */}
      <hr />
      {/* table */}
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default DoctorAppointments;