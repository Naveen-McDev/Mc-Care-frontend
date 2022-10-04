import { Badge } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";

// layout
function Layout({ children }) {
  // state for collapsing the sidebar
  const [collapsed, setCollapsed] = useState(false);
  // accessing the user state
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // user menu
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  // admin menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  // doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  // rendering the menu list for the respective actors
  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
    // rendering the role for respective actors
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    // main container
    <div className="main">
      {/* layout */}
      <div className="d-flex layout">
        {/* sidebar */}
        <div className="sidebar">
          {/* sidebar header */}
          <div className="sidebar-header">
            <h2 className="logo">+C</h2>
            <h1 className="role">{role}</h1>
          </div>

          {/* sidebar menu */}
          <div className="menu">
            {/* maping the menu */}
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            
            {/* logout */}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        {/* content */}
        <div className="content">
          {/* header */}
          <div className="header">
            {/* collapse btn */}
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            {/* notificaton */}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>
              <Link className="anchor mx-2" to="">
                {user?.name}
              </Link>
            </div>
          </div>

          {/* body */}
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
