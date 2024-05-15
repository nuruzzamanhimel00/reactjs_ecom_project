// import React from "react";
// import React, { useRef } from 'react';
// import { useRouter } from "next/router";
// import { Toast } from "primereact/toast";

// import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

const SideBar = () => {
  //   const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/admin" }],
    },
    {
      label: "UI Components",
      items: [
        {
          label: "User",
          icon: "pi pi-fw pi-id-card",
          to: "/",
        },
      ],
    },
  ];
  const Menues = (
    <ul className="layout-menu">
      {items.map((item) => (
        <li className="layout-root-menuitem">
          <div className="layout-menuitem-root-text">{item.label}</div>
          <a className="" tabindex="0">
            <i className="layout-menuitem-icon"></i>
            <span className="layout-menuitem-text">{item.label}</span>
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          </a>

          <ul className="layout-submenu">
            {item.items.length > 0 &&
              item.items.map((sub_item) => (
                <li className="">
                  <NavLink
                    aria-current="page"
                    to={sub_item.to}
                    className="router-link-active router-link-exact-active active-route"
                    tabindex="0"
                  >
                    <i
                      className={`pi pi-fw ${sub_item.icon} layout-menuitem-icon`}
                    ></i>
                    <span className="layout-menuitem-text">
                      {sub_item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>{Menues}</>
    // <ul className="layout-menu">

    //   <li className="layout-root-menuitem">
    //     <div className="layout-menuitem-root-text">Home</div>
    //     <a className="" tabindex="0">
    //       <i className="layout-menuitem-icon"></i>
    //       <span className="layout-menuitem-text">Home</span>
    //       <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
    //     </a>

    //     <ul className="layout-submenu">
    //       <li className="">
    //         <a
    //           aria-current="page"
    //           href="/"
    //           className="router-link-active router-link-exact-active active-route"
    //           tabindex="0"
    //         >
    //           <i className="pi pi-fw pi-home layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Dashboard</span>
    //         </a>
    //       </li>
    //     </ul>
    //   </li>

    //   <li className="layout-root-menuitem">
    //     <div className="layout-menuitem-root-text">UI Components</div>
    //     <a className="" tabindex="0">
    //       <i className="layout-menuitem-icon"></i>
    //       <span className="layout-menuitem-text">UI Components</span>
    //       <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
    //     </a>

    //     <ul className="layout-submenu">
    //       <li className="">
    //         <a href="/uikit/formlayout" className="" tabindex="0">
    //           <i className="pi pi-fw pi-id-card layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Form Layout</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/input" className="" tabindex="0">
    //           <i className="pi pi-fw pi-check-square layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Input</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/floatlabel" className="" tabindex="0">
    //           <i className="pi pi-fw pi-bookmark layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Float Label</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/invalidstate" className="" tabindex="0">
    //           <i className="pi pi-fw pi-exclamation-circle layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Invalid State</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/button" className="rotated-icon" tabindex="0">
    //           <i className="pi pi-fw pi-mobile layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Button</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/table" className="" tabindex="0">
    //           <i className="pi pi-fw pi-table layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Table</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/list" className="" tabindex="0">
    //           <i className="pi pi-fw pi-list layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">List</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/tree" className="" tabindex="0">
    //           <i className="pi pi-fw pi-share-alt layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Tree</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/panel" className="" tabindex="0">
    //           <i className="pi pi-fw pi-tablet layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Panel</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/overlay" className="" tabindex="0">
    //           <i className="pi pi-fw pi-clone layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Overlay</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/media" className="" tabindex="0">
    //           <i className="pi pi-fw pi-image layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Media</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/menu" className="" tabindex="0">
    //           <i className="pi pi-fw pi-bars layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Menu</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/message" className="" tabindex="0">
    //           <i className="pi pi-fw pi-comment layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Message</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/file" className="" tabindex="0">
    //           <i className="pi pi-fw pi-file layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">File</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/charts" className="" tabindex="0">
    //           <i className="pi pi-fw pi-chart-bar layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Chart</span>
    //         </a>
    //       </li>
    //       <li className="">
    //         <a href="/uikit/misc" className="" tabindex="0">
    //           <i className="pi pi-fw pi-circle layout-menuitem-icon"></i>
    //           <span className="layout-menuitem-text">Misc</span>
    //         </a>
    //       </li>
    //     </ul>
    //   </li>
    // </ul>
  );
};

export default SideBar;
