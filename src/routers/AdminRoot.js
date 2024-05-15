import React from "react";
import TopBar from "../pages/layouts/TopBar.js";
import SideBar from "../pages/layouts/SideBar.js";

const AdminRoot = () => {
  return (
    <>
      <div className="layout-wrapper">
        {/* topbar  */}
        <TopBar />
        {/* topbar end */}
        <div className="layout-sidebar">
          <SideBar />
        </div>
        <div className="layout-main-container">
          <div className="layout-main">router view</div>
          footer section
        </div>
      </div>
    </>
  );
};

export default AdminRoot;
