import React, { Fragment } from "react";
import classes from "./formAddGroup.module.scss";
import { useState, useEffect } from "react";
import tung from "../../../assets/tung.jpg";
import addFriendAPI from "../../../api/addFriendAPI";
import { useDispatch } from "react-redux";
import { addListUser, removeListUser } from "./listUserSlice";
import { useSelector } from "react-redux";
import { listUser } from "./listUserSlice";
import groupAPI from "../../../api/groupAPI";

const FormAddGroup = (props) => {
  const [enterNameGroup, setEnterNameGroup] = useState("");
  const [isOpenForm, setIsOpenForm] = useState("");
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isAddFocus, setIsAddFocus] = useState(false);
  const [resultUser, setResultUser] = useState(false);
  const [user, setUser] = useState({});
  const [listUser, setListUser] = useState([]);
  const [isError, setIsError] = useState("");
  const [activeSelected, setActiveSelected] = useState(false);
  const [activeButtonAdd, setActiveButtonAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.onSendIsFormAddGroup) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.onSendIsFormAddGroup]);

  const nameGroupChangeHandler = (event) => {
    setEnterNameGroup(event.target.value);
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    props.onFormFalse(false);
  };

  const onFocusNameHandler = () => {
    setIsNameFocus(true);
  };

  const onFocusAddHandler = () => {
    setIsAddFocus(true);
  };

  const ListUserRedux = useSelector((state) => state.listUser); //Lấy từ redux
  const findUserByPhoneHandler = (event) => {
    event.preventDefault();
    const fetchUserByPhone = async () => {
      try {
        const userByPhone = await addFriendAPI.GetUserByPhone({
          phone: event.target.value,
        });
        if (userByPhone.status === 200) {
          setResultUser(true);
          setUser(userByPhone.data.users);

          const index = ListUserRedux.listUser.findIndex(
            (x) => x.id === userByPhone.data.users._id
          );

          if(index != -1) {
            setActiveButtonAdd(true);   //Đã thêm
          }
          else {
            setActiveButtonAdd(false);
          }
        }
      } catch (error) {
        setResultUser(false);
        setIsError(error);
      }
    };
   
    fetchUserByPhone();
  };

  const addUserInListHandler = (event) => {
    event.preventDefault();
    const action = addListUser({
      id: user._id,
      name: user.name,
    });
    dispatch(action);
    setListUser(ListUserRedux);
    setActiveSelected(true);
    //setResultUser(false);
    setActiveButtonAdd(true); //Đã thêm
  };
  const removeListUserHandler = (event) => {
    const action = removeListUser({
      idNeedToRemove: event.currentTarget.attributes["data-id"].value,
    });
    dispatch(action);
    setListUser(ListUserRedux);
    setActiveButtonAdd(false);
  };

  //Kiểm tra = 0 thì đóng form
  const array = [];
  useEffect(() => {
    if (ListUserRedux.listUser == 0) {
      setActiveSelected(false);
    }
  }, [ListUserRedux.listUser]);

  //Chỉ lấy list id để đưa api group
  ListUserRedux.listUser.map((user) => {
    array.push(user.id);
  });
  //API tạo group
  const addGroupHandler = (event) => {
    event.preventDefault();
    const fetchAddGroup = async () => {
      try {
        const addGroup = await groupAPI.addGroup({
          NameGroup: enterNameGroup,
          ListUsers: array,
        });
        if (addGroup.status === 200) {
          console.log("haha");
        }
      } catch (error) {
        //setIsError("mã Code không tồn tại");
        console.log(error);
      }
    };
    fetchAddGroup();
  };

  return (
    <div className={classes.modalFormAddGroup}>
      <div className={`${classes.backdrop} ${isOpenForm}`}></div>
      <div className={`${classes.viewFormAddGroup} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>Tạo Nhóm Mới</h2>
          <div className={classes.cancel} onClick={onCancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.form}>
            <div className={classes.createGroupName}>
              <div className={classes.icon}>
                <i className="fas fa-camera"></i>
              </div>
              <input
                className={`${isNameFocus ? classes.active : ""}`}
                type="text"
                placeholder="Nhập tên nhóm..."
                onClick={onFocusNameHandler}
                onChange={nameGroupChangeHandler}
              />
            </div>
            <div className={classes.addFriend}>
              <h6>Thêm bạn vào nhóm</h6>
              <div className={classes.search}>
                <i
                  className={`${"fas fa-search"} ${
                    isAddFocus ? classes.active : ""
                  }`}
                ></i>
                <input
                  className={`${isAddFocus ? classes.active : ""}`}
                  type="text"
                  placeholder="Nhập tên hoặc số điện thoại"
                  onClick={onFocusAddHandler}
                  onChange={findUserByPhoneHandler}
                />
              </div>
            </div>
            <div className={classes.result}>
              <div
                className={`${classes.friends} ${
                  activeSelected ? classes.activeSelected : ""
                }`}
              >
                <h4>Bạn bè</h4>
                {resultUser && (
                  <div className={classes.user}>
                    <div className={classes.left}>
                      <div className={classes.avatar}>
                        <img src={tung} alt="" />
                      </div>
                      <p>{user.name}</p>
                    </div>
                    <div className={classes.right}>
                      <button onClick={addUserInListHandler}>
                        {/* {ListUserRedux.listUser?.map((u) => {
                          console.log(u?.id);
                          return u?.id == user.id ? "Thêm" : "Đã thêm";
                        })}
                         */}
                        {activeButtonAdd && "Đã Thêm"}
                        {!activeButtonAdd && "Thêm"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`${classes.selected} ${
                  activeSelected ? classes.activeSelected : ""
                }`}
              >
                <h4>Đã Chọn</h4>
                <div className={classes.listUser}>
                  {ListUserRedux.listUser?.map((user) => {
                    return (
                      <div className={`${classes.user}`} key={user.id}>
                        <div className={classes.left}>
                          <div className={classes.avatar}>
                            <img src={tung} alt="" />
                          </div>
                          <p>{user.name}</p>
                        </div>
                        <div
                          className={classes.right}
                          onClick={removeListUserHandler}
                          data-id={user.id}
                        >
                          <i class="fas fa-times"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={classes.button}>
              <button className={classes.cancel} onClick={onCancelHandler}>
                Hủy
              </button>
              <button className={classes.create} onClick={addGroupHandler}>
                Tạo Nhóm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddGroup;
