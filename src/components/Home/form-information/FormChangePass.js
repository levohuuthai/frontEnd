import React from "react";
import classes from "./formChangePass.module.scss";
import { useState, useEffect } from "react";
const FormChangePass = (props) => {
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState("");
  const InputHandler = () => {
    setIsFocusInput(true);
  };

  const cancelHandler = () => {
    props.onCancel(false);
  };
  return (
    <div className={classes.ViewchangePass}>
      <div className={classes.header}>
        <h2>Tạo mật khẩu mới</h2>
        <div onClick={cancelHandler}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className={classes.body}>
        <form>
          <div className={classes.currentPass}>
            <label>Mật khẩu hiện tại</label>
            <input type="text" placeholder="Nhập mật khẩu hiện tại" />
          </div>
          <div className={classes.newPass}>
            <label>Mật khẩu mới</label>
            <input
              type="text"
              placeholder="Nhập mật khẩu mới"
              onFocus={InputHandler}
            />
          </div>
          <div className={classes.confirmNewPass}>
            <label>Nhập lại mật khẩu mới</label>
            <input
              type="text"
              placeholder="Nhập lại mật khẩu mới"
              onFocus={InputHandler}
            />
          </div>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Hủy
            </button>
            <button
              className={`${classes.updated} ${
                isFocusInput ? classes.active : ""
              }`}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormChangePass;
