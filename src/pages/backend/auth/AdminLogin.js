import React, { useState } from "react";
import style from "./AdminLogin.module.css";
//redux
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/backend/auth-slice.js";
//react router
import { useNavigate } from "react-router-dom";
//service
import { makeLogin } from "../../../services/backend/AuthService.js";
//api router
import { useLoginUrl } from "../../../helpers/apiRoutes/index.js";

const AdminLogin = () => {
  const [input, setInput] = useState({
    email: "admin@app.com",
    password: "12345678",
  });
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (input.email !== "" && input.password !== "") {
      makeLogin({
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
          if (response.hasOwnProperty("status") && response.status) {
            dispatch(
              authActions.setLoginData({
                token: response.token,
                user: response.user,
              })
            );
            navigate("/admin");
          }
          // console.log("then result", response, response.status);
        })
        .catch((error) => {
          console.log("catch result", error);
        });
      // dispatch(
      //   authActions.login({ email: input.email, password: input.password })
      // );
    } else {
      alert("All FIeld is required!!");
    }
    // alert("please provide a valid input");
  };

  return (
    <>
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
