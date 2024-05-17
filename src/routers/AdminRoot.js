import React from "react";
import TopBar from "../pages/backend/layouts/TopBar.js";
import SideBar from "../pages/backend/layouts/SideBar.js";
import { useSelector } from "react-redux";
const AdminRoot = () => {
  const isMenuOpen = useSelector((state) => state.adminLayout.isMenuOpen);

  const toggleMenueClass = isMenuOpen ? "layout-static-inactive" : "";
  return (
    <>
      <div className={`layout-wrapper layout-static ${toggleMenueClass}`}>
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
