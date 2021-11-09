import React, { Fragment } from "react";
import classes from "./formInformation.module.scss";
import tung from "../../../assets/tung.jpg";
import FormChangePass from "./FormChangePass";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../api/userAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormInformation = (props) => {
  //Lấy thông tin từ redux
  const loggedInUser = useSelector((state) => state.user.current);
  const phone = loggedInUser.phone;
  const username = loggedInUser.name;
  const avatar = loggedInUser.avatar;
  const birthday = loggedInUser.birthday;

  const [isFormChangePass, setIsFormChangePass] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState("");
  const [enteredName, setIsEnterName] = useState({ username: username });
  const [birthdayUser, setBirthdayUser] = useState({ birthday: birthday });
  const [isChangeName, setIsChangeName] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [previewImage, setPreviewImage] = useState("")
  // const wrapperRef = useRef(null)

  const changePassHandler = (event) => {
    event.preventDefault();
    setIsFormChangePass(true);
  };
  const InputHandler = () => {
    setIsFocusInput(true);
  };
  const changeNameHandler = () => {
    setIsChangeName(!isChangeName);
  };

  const nameInputChangeHandler = (event) => {
    setIsEnterName({ username: event.target.value });
  };

  useEffect(() => {
    if (props.isForm) {
      setIsOpenForm(classes.active);
      setIsChangeName(false);
    } else {
      setIsOpenForm("");
    }
  }, [props.isForm]);

  //Truyền lên cho Home
  const cancelHandler = () => {
    setIsOpenForm("");
    props.onFormFalse(false);
  };
  //Nhận từ FormChangePass
  const cancelHandlerChangePass = (falseFromPass) => {
    setIsFormChangePass(falseFromPass);
  };

  // const validateupload = (e) => {
  //   e.target.files[0].type == "image/png" ||
  //   e.target.files[0].type == "image/jpg" ||
  //   e.target.files[0].type == "image/jpeg";
  //   const upload = (e) => {
  //     if(e.target.files[0].size <2000000){
  //       let file = e.target.files[0]
  //       let reader = new FileReader()
  //       reader.onload = function(e){
  //         setPreviewImage(e.target.result)
  //       }
  //       reader.readAsDataURL(file)
  //     }else{
  //       e.target.value = ""
  //       alert("Vui lòng upload ít hơn 2MB")
  //     }
  //   }
  // }

  // const previewImageHandler = (e) => {
  //   let files = e.target.files;
  //   let (files.length === 1)
  // }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(birthdayUser.birthday);

  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;

  // const formattedDate = moment(new Date(birthdayUser.birthday), 'yyyy-MM-dd').format();

  const birthdayHandler = (value, e) => {
    setBirthdayUser({ birthday: value });
    // setSelectedDate(event)
    console.log(value);
    console.log(e);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // const formattedDate = moment(new Date(birthdayUser.birthday), 'DD-MM-YYYY').format();

    const fetchReplaceUser = async () => {
      try {
        const verify = await userAPI.replaceUser({
          userID: loggedInUser._id,
          newUser: {
            ...loggedInUser,
            name: event.target.username.value,
            birthday: birthdayUser.birthday,
          },
        });
        if (verify.status === 201) {
          console.log("Success");
        }
      } catch (error) {
        //setIsError("mã Code không tồn tại");
        console.log(error);
      }
    };
    fetchReplaceUser();
  };

  return (
    <Fragment>
      <div className={classes.modalView}>
        <div
          className={`${classes.backdropViewInformation} ${isOpenForm}`}
        ></div>
        <div className={`${classes.viewInformation} ${isOpenForm}`}>
          <div className={classes.header}>
            <p>Cập nhật thông tin</p>

            <div onClick={cancelHandler}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className={classes.information}>
            <form onSubmit={formSubmitHandler}>
              <div className={classes.left}>
                <div className={classes.avatar}>
                  <div className={classes.image}>
                    <img src={avatar} alt="" />
                    <i class="fas fa-camera">
                      <input type="file" />
                    </i>
                  </div>
                  <input
                    className={`${classes.username} ${
                      isChangeName ? classes.activeChangeName : ""
                    }`}
                    type="text"
                    value={enteredName.username}
                    onChange={nameInputChangeHandler}
                    id="username"
                    name="username"
                    readOnly={!isChangeName && "readOnly"}
                  />

                  <label onClick={changeNameHandler} for="username">
                    <i className="fas fa-pencil-alt"></i>
                  </label>
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.phone}>
                  <label>
                    <i className="fas fa-phone-alt"></i>Số điện thoại
                  </label>
                  <input type="text" value={phone} readOnly />
                </div>
                <div className={classes.gender}>
                  <label>
                    <i className="fas fa-venus-mars"></i>Giới tính
                  </label>
                  <div className={classes.type}>
                    <input
                      type="radio"
                      value="Nam"
                      onFocus={InputHandler}
                      name="gender"
                    />
                    <label for="Nam">Nam</label>
                    <input
                      type="radio"
                      value="Nu"
                      onFocus={InputHandler}
                      name="gender"
                    />
                    <label for="Nu">Nữ</label>
                  </div>
                </div>
                <div className={classes.birthday}>
                  <label>
                    <i className="fas fa-birthday-cake"></i>Ngày sinh
                  </label>
                  {/* <input type="date" 
                            id="birthday" 
                            name="birthday" 
                            value={formattedDate} 
                            onChange={birthdayHandler} 
                            onFocus={InputHandler} 
                            /> */}
                  <DatePicker
                    value={formattedDate}
                    selected={selectedDate}
                    onChange={birthdayHandler}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    onFocus={InputHandler}
                    maxDate={new Date()}
                  ></DatePicker>
                </div>
                <div className={classes.button}>
                  <button
                    className={`${classes.updateInfor} ${
                      isFocusInput ? classes.active : ""
                    }`}
                  >
                    <i className="fas fa-pencil-alt"></i>Cập nhật thông tin
                  </button>
                  <button
                    className={classes.changePass}
                    onClick={changePassHandler}
                  >
                    <i className="fas fa-user-edit"></i>Đổi mật khẩu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isFormChangePass && (
        <FormChangePass onCancel={cancelHandlerChangePass} />
      )}
    </Fragment>
  );
};

export default FormInformation;
