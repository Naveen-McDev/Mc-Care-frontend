import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// Doctors list
function DoctorsList() {
// creating a state which holds the doctors list
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  // get doctors data
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      // fetching data from backend
      const resposne = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/get-all-doctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if fetching success
      if (resposne.data.success) {
        // updating the doctors date.
        setDoctors(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // change doctor status
  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      // changing the doctor account status
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/change-doctor-account-status`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if success show alert and refetch the getDoctors data.
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      // if error show alert
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  // fetching data.
  useEffect(() => {
    getDoctorsData();
  }, []);

  // columns for the tabel
  const columns = [
    // name
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    // phone number
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    // created at
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    // status
    {
      title: "status",
      dataIndex: "status",
    },
    // actions
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {/* if status === pending, then change the status to approved when clicking */}
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}

          {/* if status === approved, then change the status to blocked when clicking */}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];


  return (
    <Layout>
      {/* title */}
      <h1 className="page-header">Doctors List</h1>
      {/* horizonta line seperating the title and the content */}
      <hr />
      {/* table showing the list of doctors */}
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;
