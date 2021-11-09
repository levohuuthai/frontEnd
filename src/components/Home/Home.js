import React from "react";
import { Fragment } from "react";

import { useState, useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import ListMess from "./ListMess";
import BoxChat from "./BoxChat";
import ListSenderRequest from "./ListSenderRequest";
import ListFriend from "./ListFriend";
import FormInformation from "./form-information/FormInformation";
import classes from "./home.module.scss";
import tung from "../../assets/tung.jpg";
import img1 from "../../assets/owl_1.png";
import img2 from "../../assets/owl_2.jpg";
import img3 from "../../assets/owl_3.jpg";
import img4 from "../../assets/owl_4.png";
import img5 from "../../assets/owl_5.jpg";
import img6 from "../../assets/owl_6.jpg";
import  io  from "socket.io-client";
//let socket;
const Home = (props) => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [isBtnMess, setIsBtnMess] = useState(true);
  const [isBtnPhoneBook, setIsBtnPhoneBook] = useState(false);
  const [isInviteFriend, setIsInviteFriend] = useState(false);
  const [isChatInput, setIsChatInput] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const socket = useRef();
  const ENDPOINT = 'localhost:3000';
  useEffect(() => {
    socket.current = io(ENDPOINT,{
      transports: ['websocket','polling','flashsocket'],
  });
  }, []);
  //console.log(socket);
  //const [socketTT, setSocketTT] = useState();
  //const socket = useRef();
  //setSocketTT(socket);

  // useEffect(() => {
  //   socket.current = io('localhost:3000',{
  //     transports: ['websocket','polling','flashsocket'],
  // });
  // }, []);
  // console.log(socket);

  // const socketSlice = createSlice({
  //   name: "socketTT",
  //   initialState: {
  //     current: socket,
  //   },
  //   reducers: {},
  //   extraReducers: {
  //     [signin.fulfilled]: (state, action) => {
  //       state.current = action.payload; //update trên store
  //     },
  //   },
  // });
  const isChatHandler = ({user, room}) => {
    setIsWelcome(false);
    setIsChatInput(true);
    setUser(user);
    setRoom(room);
    //socket.emit('join',room);
  };
  const btnMessHandler = () => {
    setIsBtnMess(true);
    setIsBtnPhoneBook(false);
    setIsInviteFriend(false);
    setIsWelcome(true);
  };
  const friendHandler = () => {
    setIsBtnPhoneBook(true);
    setIsBtnMess(false);
    setIsInviteFriend(true);
    setIsWelcome(false);
    setIsChatInput(false);
  };
  const formInformationHandler = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  const options = {
    items: 1,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
  };


  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.avatar} onClick={formInformationHandler}>
            <img src={tung} alt="" />
            <div className={classes.active}></div>
          </div>
          <div
            className={`${classes.mess} ${
              isBtnMess ? classes.activetoggle : ""
            } `}
            onClick={btnMessHandler}
          >
            <i className="fas fa-comment" title="Tin nhắn"></i>
          </div>
          <div
            className={`${classes.friend} ${
              isBtnPhoneBook ? classes.activetoggle : ""
            } `}
            onClick={friendHandler}
          >
            <i className="fas fa-address-book" title="Danh bạ"></i>
          </div>
          <div className={classes.logout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>

        <div className={classes.center}>
          {isBtnMess && <ListMess onOpenChat={isChatHandler}  />}

          {isBtnPhoneBook && <ListFriend onSendSocketToListFriend={socket}/>}
        </div>

        <div className={classes.right}>
          {isWelcome && (
            <div className={classes.first}>
              <div className={classes.content}>
                <p className={classes.tittle}>
                  Chào mừng đến với <b>LAZO PC!</b>{" "}
                </p>
                <p className={classes.text}>
                  Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng
                  người thân, bạn bè được tối ưu hóa cho máy tính của bạn.
                </p>
              </div>
              <div className={classes.owl}>
                <OwlCarousel options={options}>
                  <div className={classes.item}>
                    <img src={img1} alt="1" />
                    <h4>Nhắn tin nhiều hơn, soạn thảo ít hơn</h4>
                    <p>
                      Sử dụng <b>Tin Nhắn Nhanh</b> để lưu trữ các tin nhắn
                      thường dùng và gửi nhanh trong hộp thoại bất kì
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img2} alt="2" />
                    <h4>Gọi nhóm và làm việc hiệu quả với Lazo Group Call</h4>
                    <p>Trao đổi công việc mọi lúc mọi nơi</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img3} alt="3" />
                    <h4>Trải nghiệm xuyên suốt</h4>
                    <p>
                      Kết nối và giải quyết công việc trên mọi thiết bị với dữ
                      liệu luôn được đồng bộ
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img4} alt="4" />
                    <h4>Gửi file năng?</h4>
                    <p>Đã có Lazo PC "xử" hết</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img5} alt="5" />
                    <h4>Chat nhóm với đồng nghiệp</h4>
                    <p>Tiện lợi hơn, nhờ các công cụ chat trên máy tính</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img6} alt="6" />
                    <h4>Giải quyết công việc hiệu quả hơn, lên đến 40%</h4>
                    <p>Với Lazo PC</p>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          )}

          {isChatInput && <BoxChat onSendSocketToBoxChat={socket}  onSendUserToBoxChat={user} onSendRoomToBoxChat={room} />}

          {isInviteFriend && <ListSenderRequest onSendSocketToListSenderRequest={socket} />}
        </div>
      </div>
      {<FormInformation isForm={isForm} onFormFalse={formfalseHandler} />}
    </Fragment>
  );
};
export default Home;
