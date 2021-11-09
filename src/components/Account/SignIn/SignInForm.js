import React from "react";
import classes from "./SignInForm.module.scss";
import logo from "../../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import signinAPI from "../../../api/signinAPI";
import { useDispatch } from "react-redux";
import { signin } from "../../Home/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const SignInForm = () => {
  const dispatch = useDispatch();
  const History = useHistory();
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  const [isError, setIsError] = useState("");

  const phoneHandler = (event) => {
    const patte = /^(0|84)[0-9]{9}$/;
    if (patte.test(event.target.value)) {
      setEnteredPhone(event.target.value);
      setPhoneIsValid(true);
    } else {
      setPhoneIsValid(false);
    }
  };

  const passHandler = (event) => {
    const patte = /[a-zA-Z0-9]{6,}$/;
    if (patte.test(event.target.value)) {
      setEnteredPass(event.target.value);
      setPassIsValid(true);
    } else {
      setPassIsValid(false);
    }
  };
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (enteredPhone.trim() === "" || enteredPass.trim() === "") {
      return;
    }

    try {
      const action = signin({
        phone: enteredPhone,
        password: enteredPass,
      });
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      History.push("/home");
    } catch (error) {
      setIsError(error.message);
    }
    // const fetchSignin = async () => {
    //   try {
    //     const signIn = await signinAPI.signIn({
    //       phone: enteredPhone,
    //       password: enteredPass,
    //     });

    //     if (signIn.status === 200) {
    //       console.log(signIn);
    //       History.push("/home");
    //     }
    //   } catch (error) {
    //     setIsError(error);
    //     // console.log(error);
    //   }
    // };
    // fetchSignin();
  };
  return (
    <div className={classes.signin}>
      <header>
        <img src={logo} alt="ss" />
        <p>
          Đăng nhập tài khoản Zalo để kết <br /> nối với ứng dụng Zalo Chat
        </p>
      </header>
      <form onSubmit={formSubmissionHandler}>
        <div className={classes.titleForm}>
          <p>VỚI MÃ QR</p>
          <p>|</p>
          <p>VỚI MẬT KHẨU</p>
        </div>
        <div className={classes["content-form"]}>
          <div className={classes.inputPhone}>
            <span>
              <i className="fas fa-mobile-alt"></i>
            </span>
            <input
              type="text"
              placeholder="Số điện thoại"
              onChange={phoneHandler}
            />
          </div>
          <div className={classes.inputPass}>
            <span>
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={passHandler}
            />
          </div>
          <span className={classes.error}>{isError}</span> <br />
          <button
            className={`${classes["btn-first"]} ${
              phoneIsValid && passIsValid ? classes["activc-isvalid"] : ""
            } `}
          >
            Đăng nhập với mật khẩu
          </button>
          <button className={classes["btn-last"]}>Gửi yêu cầu đăng nhập</button>
          <div className={classes.forgetPass}>
            <a href="/">Quên mật khẩu?</a>
          </div>
        </div>
      </form>
      <p className={classes.signUp}>
        Bạn chưa có tài khoản?
        <Link to="/signup" className="btnSignup">
          Đăng ký ngay!
        </Link>
      </p>
      <footer>
        <span>
          <a href="/">Tiếng Việt</a> <a href="/">English</a>
        </span>
        <p>Dùng tài khoản Zalo để truy cập các ứng dụng của ZA</p>
      </footer>
    </div>
  );
};

export default SignInForm;
