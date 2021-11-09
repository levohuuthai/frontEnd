import React, { Fragment, useEffect, useContext } from "react";
import classes from "./home.module.scss";
import background from "../../assets/background.png";
import { useState } from "react";
import messageAPI from "../../api/messageAPI";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useRef } from "react";
import FormUserInfomation from "./form-information/FormUserInfomation";
import FormAddMember from "./form-addGroup/FormAddMember";
import Member from "./Member";
const BoxChat = (props) => {
  const [enteredChat, setEnteredChat] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser._id;
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isFormInfomation, setIsFormInfomation] = useState(false);
  const [isOpenFormAddGroup, setIsOpenFormAddGroup] = useState(false);
  const [
    isOpenFormBoxChatInfoHandler,
    setIsOpenFormBoxChatInfoHandler,
  ] = useState(false);
  const [isForm, setIsForm] = useState(false);
  //Set biến true để mở form FormUserInformation cho thằng FormUserInformation
  const openFormInfomation = () => {
    setIsFormInfomation(true);
  };

  //Nhận biến false từ FormUserInformation để đóng form
  const closeFormInformation = (falseFromFUI) => {
    setIsFormInfomation(falseFromFUI);
  };

  const chatHandler = (event) => {
    setEnteredChat(event.target.value);
  };
  // console.log(props.onSendSocketToBoxChat);

  //console.log(props.onSendRoomToBoxChat.users); //lấy object room từ bên home gửi qua
  //console.log(props.onSendUserToBoxChat);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await messageAPI.GetMessage({
          idRoom: props.onSendRoomToBoxChat?._id,
        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [props.onSendRoomToBoxChat]);
  const SendMessageHandler = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: idLogin,
      text: enteredChat,
      RoomId: props.onSendRoomToBoxChat?._id,
    };
    const fetchAddMessage = async () => {
      try {
        const res = await messageAPI.AddMessage({
          message: newMessage,
        });
        setMessages([...messages, res.data]);
        //console.log(res.data);
        setEnteredChat("");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddMessage();
  };
  useEffect(() => {
    const fetchGetMessages = async () => {
      try {
        props.onSendSocketToBoxChat.current.on("send-message", (data) => {
          setArrivalMessage({
            sender: data.sender,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetMessages();
  }, [props.onSendSocketToBoxChat]);

  useEffect(() => {
    arrivalMessage &&
      props.onSendRoomToBoxChat?.users.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, props.onSendRoomToBoxChat]);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formfalseHandler = (falseFromForm) => {
    setIsOpenFormAddGroup(falseFromForm);
  };

  const addMemberHandler = () => {
    setIsOpenFormAddGroup(true);
  };

  const openFormBoxChatInfoHandler = () => {
    setIsOpenFormBoxChatInfoHandler(!isOpenFormBoxChatInfoHandler);
  };

  return (
    <Fragment>
      <div className={classes.second}>
        <div className={classes.secondLeft}>
          <div className={classes["top-right"]}>
            <div className={classes.topName}>
              <div className={classes.avatar}>
                {/* <img src={`${props.onSendDummy[0].image}`} alt="" /> */}
                <img src={background} alt="" />
              </div>
              <div className={classes.name}>
                <h2>{props.onSendUserToBoxChat.name}</h2>
                {props.onSendRoomToBoxChat.users.length > 2 ? (
                  <p>
                    <i class="far fa-user"></i>{" "}
                    {props.onSendRoomToBoxChat.users.length} thành viên
                  </p>
                ) : (
                  "Các bạn đã là bạn bè"
                )}
              </div>
            </div>
            <div className={classes.topFunction}>
              <i class="fas fa-user-plus" onClick={addMemberHandler}></i>
              <i class="fas fa-video"></i>
              <i
                class="far fa-address-card"
                onClick={openFormBoxChatInfoHandler}
              ></i>
            </div>
          </div>
          <div className={`${classes["center-right"]}`}>
            {messages.map((data) => {
              return (
                <div
                  ref={scrollRef}
                  className={`${classes.listChat} ${
                    data.sender === idLogin ? classes.message_own : ""
                  }`}
                >
                  <Chat
                    data={data}
                    key={data._id}
                    own={data.sender === idLogin}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes["botom-right"]}>
            <div className={classes.toolbar}>
              <i className="bi bi-image"></i>
              <i className="bi bi-paperclip"></i>
            </div>
            <div className={classes["input-chat"]}>
              <input
                type="text"
                placeholder="Nhập tin nhắn của bạn"
                onChange={chatHandler}
                value={enteredChat}
              />
              <i
                className="far fa-paper-plane"
                onClick={SendMessageHandler}
              ></i>
              <i className="far fa-laugh-beam"></i>
            </div>
          </div>
        </div>

        {/* {isOpenFormBoxChatInfoHandler && ( */}
        <div
          className={`${classes.secondRight} ${
            isOpenFormBoxChatInfoHandler ? classes.openFormBoxChatInfo : ""
          }`}
        >
          <div
            className={`${classes.secondRightBoxChatInfo} ${
              isOpenFormBoxChatInfoHandler ? classes.openFormBoxChatInfo : ""
            }`}
          >
            <div className={classes.titleBoxChatInfo}>
              <h2>Thông tin nhóm</h2>
            </div>
            <div className={classes.groupNameAvatar}>
              <div className={classes.avatarBoxChatInfo}>
                <img src={background} alt="" />
              </div>
              <div className={classes.nameBoxChatInfo}>
                <p>{props.onSendUserToBoxChat.name}</p>
              </div>
            </div>
            <div className={classes.memberGroup}>
              <h6>
                Thành viên nhóm ({props.onSendRoomToBoxChat.users.length})
              </h6>
              <div className={classes.listMember}>
                {props.onSendRoomToBoxChat.users.map((user) => {
                  return <Member user={user} />;
                })}
              </div>
            </div>
            <div className={classes.outGroup}>
              <p>
                <i class="fas fa-sign-out-alt"></i>
              </p>
              <p>Rời nhóm</p>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
      {/* truyền biến mở form cho FUI         Nhận biến đóng form từ FUI                 */}
      {
        <FormUserInfomation
          isFormInfomation={isFormInfomation}
          SendFalseToBoxChat={closeFormInformation}
        ></FormUserInfomation>
      }
      {
        <FormAddMember
          isOpenFormAddGroup={isOpenFormAddGroup}
          onFormFalse={formfalseHandler}
          onSendRoomToAddMember={props.onSendRoomToBoxChat}
        />
      }
    </Fragment>
  );
};
export default BoxChat;
