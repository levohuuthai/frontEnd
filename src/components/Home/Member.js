import classes from "./home.module.scss";
import logo from "../../assets/logo.png";
import background from "../../assets/background.png";
import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import React, { useEffect } from "react";
import roomAPI from "../../api/roomAPI";
import addFriendAPI from "../../api/addFriendAPI";
import { format } from "timeago.js";
import { Fragment } from "react";
import tung from "../../assets/tung.jpg";
const Member = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: props.user,
        });
        setUser(requestGetUser.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
  console.log(user);
  return (
    <div className={classes.member} key={props.user}>
      <div className={classes.Memberleft}>
        <div className={classes.avatarMember}>
          <img src={background} alt="" />
        </div>
        <div className={classes.nameMember}>
          <p>{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Member;
