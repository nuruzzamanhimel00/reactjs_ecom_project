import React from "react";
import TopBar from "../pages/backend/layouts/TopBar.js";
import SideBar from "../pages/backend/layouts/SideBar.js";
import FooterBar from "../pages/backend/layouts/FooterBar.js";
//redux
import { useSelector } from "react-redux";
//react router
import { Outlet, useLoaderData, Navigate } from "react-router-dom";
//service
import { httpRequest } from "../services/CommonService.js";
//api url
import { authUserUrl } from "../helpers/apiRoutes/index.js";

export const loader = async () => {
  let token = sessionStorage.getItem("token");
  // console.log("token", token);
  return await httpRequest({
    url: authUserUrl,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response;
      // console.log("loader result", response);
    })
    .catch((error) => {
      return "";
      // console.log("catch result", error);
    });
};

const AdminRoot = () => {
  const isMenuOpen = useSelector((state) => state.adminLayout.isMenuOpen);

  const authUser = useLoaderData();
  if (!authUser.hasOwnProperty("name")) {
    return <Navigate to="/admin/login" replace={true} />;
  }

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
