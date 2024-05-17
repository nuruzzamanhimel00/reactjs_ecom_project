import { useState } from "react";

export const useLayout = () => {
  const [layoutContext, setLayoutContext] = useState({
    isMenuOpen: 1,
  });

  console.log("layout hook = ", layoutContext);
  const onMenuToggle = () => {
    setLayoutContext((previous) => {
      return {
        isMenuOpen: previous.isMenuOpen === 1 ? 0 : 1,
      };
    });
  };
  return {
    layoutContext,
    onMenuToggle,
  };
};
