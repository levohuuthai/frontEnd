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
const Chat = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: props.data.sender,
        });
        setUser(requestGetUser.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
   // console.log(fetchGetUser());
  },[])
  
  //console.log(user.name);
  return (
    <div
      className={`${classes.container} ${props.own ? classes.message_own : ""}`}
    >
      {props.own && (
        <Fragment>
          <div className={`${classes.container_mess} `}>
            <div className={classes.message}>
              <div className={classes.messageTop}>
                {/* <img src="" alt="" /> */}
                <p className={classes.messageText}>{props.data.text}</p>
              </div>
              <div className={classes.messageBottom}>
                {/* <p>{format(props.data.createdAt)}</p>  */}
                <p>12:10</p>
              </div>
            </div>
          </div>
          <div className={classes.avatar}>
            <img src={tung} alt="avatar" />
          </div>
        </Fragment>
      )}

      {!props.own && (
        <Fragment>
          <div className={classes.avatar}>
            <img src={tung} alt="avatar" />
          </div>
          <div className={`${classes.container_mess} `}>
            <div className={classes.message}>
              <div className={classes.messageTop}>
                <p className={classes.nameSender}>{user?.name}</p>
                <p className={classes.messageText}>{props.data.text}</p>
              </div>
              <div className={classes.messageBottom}>
                {/* <p>{format(props.data.createdAt)}</p>  */}
                <p>12:10</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Chat;
