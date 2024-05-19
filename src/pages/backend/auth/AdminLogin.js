import React, { useState, useRef } from "react";
import style from "./AdminLogin.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/backend/auth-slice.js";
import { cartActions } from "../../../store/backend/layout-slice.js";

//react router
import { useNavigate, Navigate, useLoaderData } from "react-router-dom";
//service
import { httpRequest } from "../../../services/CommonService.js";
//api router
import { useLoginUrl, authUserUrl } from "../../../helpers/apiRoutes/index.js";
//react spinner
import BounceLoader from "react-spinners/BounceLoader";
//prime react
import { Toast } from "primereact/toast";
//import components
// import ToastNotifications from "../../../components/ToastNotifications.js";

const override = {
  position: "fixed",
  top: "50%",
  left: "50%",
  borderColor: "red",
  backgroundColor: "red",
  borderRadius: "50%",
  zIndex: "9999",
};

export const loader = async () => {
  let token = sessionStorage.getItem("token");

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

const AdminLogin = () => {
  const [input, setInput] = useState({
    email: "admin@app.com",
    password: "12345678",
  });
  // let [loading, setLoading] = useState(false);
  //redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminLayout.isLoading);
  // const toastNotification = useSelector(
  //   (state) => state.adminLayout.toastNotification
  // );

  // console.log("toastNotification adminlogin", toastNotification);

  const navigate = useNavigate();

  const authUser = useLoaderData();

  const toast = useRef(null);

  if (authUser.hasOwnProperty("name")) {
    return <Navigate to="/admin" replace={true} />;
  }

  // console.log("authUser login", authUser);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (input.email !== "" && input.password !== "") {
      dispatch(cartActions.spinnerLoading(true));
      await httpRequest({
        url: useLoginUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: input.email,
          password: input.password,
        },
      })
        .then((response) => {
          dispatch(cartActions.spinnerLoading(false));
          if (response.hasOwnProperty("status") && response.status) {
            dispatch(
              authActions.setLoginData({
                token: response.token,
                user: response.user,
              })
            );
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: response.message,
              life: 3000,
            });
            navigate("/admin/dashboard");
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: response.message,
              life: 3000,
            });
          }
          // console.log("then result", response, response.status);
        })
        .catch((error) => {
          dispatch(cartActions.spinnerLoading(false));
          console.log("catch result", error);
        });
    } else {
      alert("All FIeld is required!!");
    }
    // alert("please provide a valid input");
  };

  return (
    <>
      <Toast ref={toast} />

      {/* spinner  */}
      <BounceLoader
        color={`#FFF`}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={style.container}>
        <div className={style.screen}>
          <div className={style.screen__content}>
            <div className={style["social-login"]}>
              <h3>log in</h3>
            </div>
            <form className={style.login} onSubmit={submitHandler}>
              <div className={style.login__field}>
                <i className={`${style.login__icon} fas fa-user`}></i>
                <input
                  type="email"
                  className={style.login__input}
                  placeholder="Email"
                  name="email"
                  onChange={inputHandler}
                  value={input.email}
                />
              </div>
              <div className={style.login__field}>
                <i className={`${style.login__icon} fas fa-lock`}></i>
                <input
                  type="password"
                  className={style.login__input}
                  placeholder="Password"
                  name="password"
                  onChange={inputHandler}
                  value={input.password}
                />
              </div>
              <button className={`${style.button} ${style.login__submit}`}>
                <span className={style.button__text}>Log In Now</span>
                <i className={`${style.button__icon} pi pi-sign-in`}></i>
              </button>
            </form>
          </div>
          {/* <div className={style.screen__background}>
            <span
              className={`${style.screen__background__shape} ${style.screen__background__shape4}`}
            ></span>
            <span
              className={`${style.screen__background__shape} ${style.screen__background__shape3}`}
            ></span>
            <span
              className={`${style.screen__background__shape} ${style.screen__background__shape2}`}
            ></span>
            <span
              className={`${style.screen__background__shape} ${style.screen__background__shape1}`}
            ></span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
