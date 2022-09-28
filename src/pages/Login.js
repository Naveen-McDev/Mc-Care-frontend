import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

// login
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on submitting the form
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // posting the login data to backend
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
        values
      );
      dispatch(hideLoading());
      // if success store the token in the local storage for authentication
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
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
        {/* ttile */}
        <h1 className="card-title">Welcome Back</h1>
        {/* form */}
        <Form layout="vertical" onFinish={onFinish}>
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
          {/* submit btn for login*/}
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>
          {/* navigation link to registration screen */}
          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
