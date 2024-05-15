import { useState } from "react";

export const useLayout = () => {
  //   const [layoutContext, setLayoutContext] = useState({
  //     isMenueOpen: 1,
  //     name: "Admin",
  //   });
  const [isMenueOpen, setIsMenueOpen] = useState(1);
  console.log("lode state", isMenueOpen);
  const onMenuToggle = () => {
    setIsMenueOpen((prev) => {
      return prev === 1 ? 0 : 1;
    });
    // setLayoutContext((prev) => {
    //   //   console.log("prev", prev);
    //   let is_menu_open = prev.isMenueOpen === 1 ? 0 : 1;
    //   return {
    //     ...prev,
    //     isMenueOpen: is_menu_open,
    //     name: "admin_" + is_menu_open,
    //   };
    // });
    // console.log("layoutContext user", layoutContext);
  };
  return {
    isMenueOpen,
    onMenuToggle,
  };
};
