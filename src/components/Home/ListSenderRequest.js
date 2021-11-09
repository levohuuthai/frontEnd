import React, { Fragment, useEffect } from "react";
import classes from "./home.module.scss";
import background from "../../assets/background.png";
import { useState } from "react";
import addFriendAPI from "../../api/addFriendAPI";
import SenderRequest from "./SenderRequest";
import { useSelector } from "react-redux";
const AddFriend = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser._id;
  const [arrayListSenderRequest, setArrayListSenderRequest] = useState([]);
  useEffect(() => {
    const fetchListSenderRequest = async () => {
      try {
        const requestListSenderRequest = await addFriendAPI.getListSenderRequest(
          {}
        );
        setArrayListSenderRequest(requestListSenderRequest.data);
      
      } catch (error) {
        console.log(error);
      }
    };
    fetchListSenderRequest();
  }, []);

  useEffect(()=>{
    props.onSendSocketToListSenderRequest.current.on('friend-request-status',async (data)=>{
      console.log("Thằng "+ data.name +" vừa gửi cho mày yêu cầu kết bạn kìa !!!");
      try {
        const requestListSenderRequest = await addFriendAPI.getListSenderRequest(
          {}
        );
        setArrayListSenderRequest(requestListSenderRequest.data);
      
      } catch (error) {
        console.log(error);
      }
    })
  },[])
  return (
    <div className={classes["right-phonebook"]}>
      <div className={classes.title}>
        <i className="fas fa-user-plus"></i>
        <p>Danh sách kết bạn</p>
      </div>
      <div className={classes.invites}>
        <div className={classes.text}>
          <p>Lời mời kết bạn ({arrayListSenderRequest.length})</p>
        </div>

        {arrayListSenderRequest.map((data) => {
          console.log(data);
          return <SenderRequest data={data} idLogin={idLogin} key={data._id} />;
        })}
      </div>
    </div>
  );
};

export default AddFriend;
