/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

// home
function Home() {
  // state for holding the doctors
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  // getdata
  const getData = async () => {
    try {
      dispatch(showLoading());
      // get all approved doctors from backend
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user/get-all-approved-doctors`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      // if success update the doctor state with the data
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // fetch data
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {/* card */}
      <Row gutter={20}>
        {/* maping the doctors in a card */}
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            {/* doctor component */}
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
