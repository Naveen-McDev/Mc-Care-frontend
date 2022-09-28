import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertSlice";

// register
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on submitting the registration form
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // posting user data for registration
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/register`,
        values
      );
      dispatch(hideLoading());
      // if success navigate to login screen
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      {/* card */}
      <div className="authentication-form card p-3">
        {/* title */}
        <h1 className="card-title">Hello..!</h1>
        {/* form */}
        <Form layout="vertical" onFinish={onFinish}>
          {/* name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" type="text" />
          </Form.Item>
          {/* email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          {/* password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>
          {/* submit btn */}
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>
          {/* navigation link to login screen */}
          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
