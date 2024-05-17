import React from "react";

const FooterBar = () => {
  return (
    <>
      <div className="layout-footer">
        @ {new Date().getFullYear()} copyright, Developed by
        <span className="font-medium ml-2">Md Nuruzzaman</span>
      </div>
    </>
  );
};

export default FooterBar;
