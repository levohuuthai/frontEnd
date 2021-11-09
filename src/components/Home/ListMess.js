import classes from "./home.module.scss";
import logo from "../../assets/logo.png";
import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import roomAPI from "../../api/roomAPI";
import Mess from "./Mess";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { roomAfterLogin } from "../Home/roomSlice";

const ListMess = (props) => {
  const roomAfterLoginRedux = useSelector((state) => state.room.current); //Redux từ roomSlice
  const [arrayMess, setArrayMess] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser._id;
  const dispatch = useDispatch();

  //Lấy thông tin từ redux
  const [activeToggleMess, setActiveToggleMess] = useState({
    activeObject: null,
    objects: arrayMess,
  });

  useEffect(() => {
    const fetchGetRoomAfterLogin = async () => {
      try {
        const requestGetRoomAfterLogin = await roomAPI.getRoomAfterLogin({});
        setArrayMess(requestGetRoomAfterLogin.data);
        setActiveToggleMess((pre) => {
          return { ...pre, objects: requestGetRoomAfterLogin.data };
        });
        //redux cho room
        const action = roomAfterLogin();
        const resultAction = await dispatch(action);
        const room = unwrapResult(resultAction);
        //setArrayMess(room)
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetRoomAfterLogin();
  }, [idLogin]);

  const onReceiveFromMess = ({ user, room }) => {
    props.onOpenChat({
      user,
      room,
    });
    console.log(user);
  };
  const arr = [];

  return (
    <div className={classes["center-mess"]}>
      <div className={classes.title}>
        <img src={logo} alt="" />
        <h2> WELCOME TO LAZO</h2>
      </div>
      <Scrollbars
        style={{ height: "610px" }}
        className={classes["list-mess"]}
        id="style-2"
      >
        {arrayMess.map((data, index) => {
          const toggleActive = (index) => {
            setActiveToggleMess({
              ...activeToggleMess,
              activeObject: activeToggleMess.objects[index],
            });
          };
          const toggleActiveStyle = (index) => {
            if (
              activeToggleMess.objects[index] === activeToggleMess.activeObject
            ) {
              return classes.activeToggleMess;
            } else {
              return classes.inactiveToggleMess;
            }
          };
          const inActiveMess = (e) => {
            toggleActive(index);
          };
          return (
            <div
              className={`${classes.messParent} ${toggleActiveStyle(index)}`}
              onClick={inActiveMess}
            >
              <Mess
                data={data}
                idLogin={idLogin}
                key={index}
                onSendListMess={onReceiveFromMess}
              />
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
};

export default ListMess;
