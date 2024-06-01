import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/toast-slice.js";

const ToastNotification = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const toastMessages = useSelector((state) => state.toast);

  useEffect(() => {
    if (toastMessages.length > 0) {
      toastMessages.forEach((msg) => {
        toast.current.show(msg);
        dispatch(authActions.removeToast(msg.id));
      });
    }
  }, [toastMessages, dispatch]);

  return <Toast ref={toast} />;
};

export default ToastNotification;
