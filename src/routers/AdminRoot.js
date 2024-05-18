import React from "react";
import TopBar from "../pages/backend/layouts/TopBar.js";
import SideBar from "../pages/backend/layouts/SideBar.js";
import FooterBar from "../pages/backend/layouts/FooterBar.js";
//redux
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/backend/auth-slice.js";
//react router
import { Outlet, useLoaderData, Navigate } from "react-router-dom";
//service
import { httpRequest } from "../services/CommonService.js";
import { getSessionToken } from "../services/backend/AuthService.js";
//api url
import { authUserUrl } from "../helpers/apiRoutes/index.js";

export const loader = async () => {
  let token = sessionStorage.getItem("token");
  // console.log("load auth root & token=" + token);
  if (!token) return <Navigate to="/admin/login" replace={true} />;
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
    });
};

const AdminRoot = () => {
  //redux
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.adminLayout.isMenuOpen);

  const authUser = useLoaderData();
  if (!authUser.hasOwnProperty("name")) {
    return <Navigate to="/admin/login" replace={true} />;
  } else {
    dispatch(
      authActions.setLoginData({
        token: getSessionToken(),
        user: authUser,
      })
    );
  }
  // console.log("authUser", authUser);

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
