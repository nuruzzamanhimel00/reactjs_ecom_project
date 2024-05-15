import React, { useEffect } from "react";
import TopBar from "../pages/layouts/TopBar.js";
import SideBar from "../pages/layouts/SideBar.js";
import { useLayout } from "../hooks/admin/layouts/use-layout.js";
const AdminRoot = () => {
  const layout = useLayout();
  console.log("AdminRoot", layout);
  // const { isMenueOpen } = layoutContext;
  useEffect(() => {
    console.log("AdminRoot use effect");
  }, [layout]);
  // const toggleMenue = layoutContext.isMenueOpen ? "layout-static-inactive" : "";
  return (
    <>
      <div className={`layout-wrapper layout-static `}>
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
