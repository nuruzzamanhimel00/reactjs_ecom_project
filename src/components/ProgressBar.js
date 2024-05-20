import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [location]);

  return null;
};

export default ProgressBar;
