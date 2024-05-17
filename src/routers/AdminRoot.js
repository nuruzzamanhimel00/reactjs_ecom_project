import React from "react";
import TopBar from "../pages/backend/layouts/TopBar.js";
import SideBar from "../pages/backend/layouts/SideBar.js";
import FooterBar from "../pages/backend/layouts/FooterBar.js";
//redux
import { useSelector } from "react-redux";
//react router
import { Outlet } from "react-router-dom";
const AdminRoot = () => {
  const isMenuOpen = useSelector((state) => state.adminLayout.isMenuOpen);

  const toggleMenueClass = !isMenuOpen ? "layout-static-inactive" : "";
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
          <div className="layout-main">
            <Outlet />
          </div>
          <FooterBar />
        </div>
      </div>
    </>
  );
};

export default AdminRoot;
