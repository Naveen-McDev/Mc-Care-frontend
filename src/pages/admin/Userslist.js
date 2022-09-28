import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// users list
function Userslist() {
  // state for holding the users list data
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // get user data
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      // fetching the users list from backend
      const resposne = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // if sucsess then update the user state with the data.
      if (resposne.data.success) {
        setUsers(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // fetch data
  useEffect(() => {
    getUsersData();
  }, []);

  // columns for the table
  const columns = [
    // name
    {
      title: "Name",
      dataIndex: "name",
    },
    // email
    {
      title: "Email",
      dataIndex: "email",
    },
    // created at
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    // actions
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {/* blocking the user */}
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* title */}
      <h1 className="page-header">Users List</h1>
      {/* horizontal line seperating the title and the content */}
      <hr />
      {/* table containg the users list */}
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default Userslist;
