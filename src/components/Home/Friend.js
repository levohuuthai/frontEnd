import React, { Fragment, useState, useEffect } from "react";
import classes from "./home.module.scss";
import background from "../../assets/background.png";
import addFriendAPI from "../../api/addFriendAPI";
const Friend = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = props.data.users.find((m) => m !== props.idLogin);
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: friendId,
        });
        setUser(requestGetUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
  return (
    <div className={classes.friend}>
      <div className={classes["avatar-friend"]}>
        <img src={background} alt="" />
      </div>
      <div className={classes["name-friend"]}>
        <p>{user?.users.name}</p>
      </div>
    </div>
  );
};

export default Friend;
