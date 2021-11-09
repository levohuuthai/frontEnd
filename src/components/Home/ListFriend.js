import React, { Fragment, useEffect } from "react";
import classes from "./home.module.scss";
import background from "../../assets/background.png";
import { useState } from "react";
import FormAddFriend from "./form-addFriend/FormAddFriend";
import FormAddGroup from "./form-addGroup/FormAddGroup";
import { useSelector } from "react-redux";
import roomAPI from "../../api/roomAPI";
import Friend from "./Friend";

const ListFriend = (props) => {
  const [isFormAddFriend, setIsFormAddFriend] = useState(false);
  const [isFormAddGroup, setIsFormAddGroup] = useState(false);
  const [arrayFriend, setArrayFriend] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser._id;
  const username = loggedInUser.name;
  console.log(loggedInUser);

  useEffect(() => {
    const fetchGetRoomFriend = async () => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend({});
        setArrayFriend(requestGetRoomByFriend.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetRoomFriend();
  }, []);

  useEffect(() => {
    props.onSendSocketToListFriend.current.on(
      "friend-request-accept-status",
      async (data) => {
        try {
          const requestGetRoomByFriend = await roomAPI.getRoomFriend({});
          setArrayFriend(requestGetRoomByFriend.data);
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, []);

  useEffect(() => {
    props.onSendSocketToListFriend.current.on("accept-by-me", async (data) => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend({});
        setArrayFriend(requestGetRoomByFriend.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  //truyền true xuống cho formAddFriend
  const openFormAddFriendHandler = () => {
    setIsFormAddFriend(true);
  };

  const openFormAddGroupHandler = () => {
    setIsFormAddGroup(true);
  };

  //nhận false từ formAddFriend
  const FalseFromFormAddFriend = (False) => {
    setIsFormAddFriend(False);
  };

  const FalseFromFormAddGroup = (False) => {
    setIsFormAddGroup(False);
  };

  return (
    <Fragment>
      <div className={classes["center-phonebook"]}>
        <div className={classes.search}>
          <div className={classes["input-group"]}>
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm Kiếm" />
          </div>
          <div className={classes["icon-add"]}>
            <i
              className="fas fa-user-plus"
              onClick={openFormAddFriendHandler}
            ></i>
            <i className="fas fa-users" onClick={openFormAddGroupHandler}></i>
          </div>
        </div>
        <div className={classes.add}>
          <h5>Chào mừng, {username}</h5>
          <div className={classes["add-group"]}>
            <div
              className={classes["add-friend"]}
              onClick={openFormAddFriendHandler}
            >
              <i className="fas fa-plus"></i>
              <p>Thêm bạn bè</p>
            </div>
            <div
              className={classes["add-chat"]}
              onClick={openFormAddGroupHandler}
            >
              <i className="fas fa-user-friends"></i>
              <p>Tạo nhóm</p>
            </div>
          </div>
        </div>
        <div className={classes["list-friend"]}>
          <div className={classes.title}>
            <p>Bạn bè ({arrayFriend.length})</p>
          </div>
          <div className={classes.friends}>
            {arrayFriend.map((data) => {
              return <Friend data={data} idLogin={idLogin} key={data._id} />;
            })}
          </div>
        </div>
      </div>
      {
        <FormAddFriend
          onSendIsFormAddFriend={isFormAddFriend}
          onFormFalse={FalseFromFormAddFriend}
        />
      }
      {
        <FormAddGroup
          onSendIsFormAddGroup={isFormAddGroup}
          onFormFalse={FalseFromFormAddGroup}
        />
      }
    </Fragment>
  );
};

export default ListFriend;
