import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "../layout.css";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user)
  const location = useLocation();

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

  const menuTOBeRendered = userMenu;

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
            <h1 className="role">user</h1>
          </div>

          {/* sidebar menu */}
          <div className="menu">
            {menuTOBeRendered.map((menu) => {
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
              <i className="ri-notification-line header-action-icon px-3"></i>
              <Link className="anchor mx-2" to='/profile'>{user?.name}</Link>
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
