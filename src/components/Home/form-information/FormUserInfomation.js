import React, { Fragment, useEffect, useState } from "react";
import classes from "./formUserInfomation.module.scss";
import tung from "../../../assets/tung.jpg";

const FormInformation = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");

  useEffect(() => {
    if (props.isFormInfomation) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isFormInfomation]);

  //truyen false de dong forminfomation len cho boxchat
  const closeFormInfomation = () => {
    setIsOpenForm("");
    props.SendFalseToBoxChat(false);
  };

  return (
    <div className={classes.modalView}>
      <div className={`${classes.backdropViewInformation} ${isOpenForm}`}></div>

      <div className={`${classes.viewInformation} ${isOpenForm}`}>
        <div className={classes.header}>
          <p>Thông Tin</p>
          <div onClick={closeFormInfomation}>
            <i className="fas fa-times"></i>
          </div>
        </div>

        <div className={classes.information}>
          <div className={classes.left}>
            <div className={classes.avatar}>
              <img src={tung} alt="" />
              <input
                className={classes.username}
                type="text"
                value="Ngọc Hiển"
                readOnly
              />
            </div>
          </div>

          <div className={classes.right}>
            <form>
              <div className={classes.phone}>
                <label>
                  <i className="fas fa-phone-alt"></i>Số điện thoại
                </label>
                <input type="text" value="0359806602" readOnly />
              </div>

              <div className={classes.gender}>
                <label>
                  <i className="fas fa-venus-mars"></i>Giới tính
                </label>

                <div className={classes.type}>
                  <input type="radio" value="Nam" name="gender" />
                  <label for="Nam">Nam</label>

                  <input type="radio" value="Nu" name="gender" />
                  <label for="Nu">Nữ</label>
                </div>
              </div>

              <div className={classes.birthday}>
                <label>
                  <i className="fas fa-birthday-cake"></i>Ngày sinh
                </label>
                <input type="date" />
              </div>

              <div className={classes.button}>
                <button className={classes.inbox}>
                  <i class="far fa-comments"></i>Nhắn Tin
                </button>
                <button className={classes.unfriend}>
                  <i class="fas fa-users-slash"></i>Hủy Kết Bạn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInformation;
