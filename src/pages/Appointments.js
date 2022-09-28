import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// appointments
function Appointments() {
  // state for holding the appointment list
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  // get appointments data
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      // get appointments by user id from backend
      const resposne = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user/get-appointments-by-user-id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success, then update the appointment state with the response data
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // column for the appointment list
  const columns = [
    // id
    {
      title: "Id",
      dataIndex: "_id",
    },
    // name of the doctor
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
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
  ];

  // fetch data
  useEffect(() => {
    getAppointmentsData();
  }, []);


  return (
    <Layout>
      {/* title */}
      <h1 className="page-title">Appointments</h1>
      {/* horizontal line seperating the title and the table */}
      <hr />
      {/* table */}
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Appointments;
