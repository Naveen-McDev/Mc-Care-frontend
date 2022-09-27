import React from "react";
import '../layout.css'

function Layout({ children }) {
  return (
    // main container
    <div className="main">
      {/* layout */}
      <div className="d-flex layout">
        {/* sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="logo">Cm-Care</h2>
            <h1 className="role">user</h1>
          </div>
        </div>

        {/* content */}
        <div className="content">
          {/* header */}
          <div className="header">header</div>

          {/* body */}
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
