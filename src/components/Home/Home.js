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
  //       state.current = action.payload; //update tr??n store
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
            <i className="fas fa-comment" title="Tin nh???n"></i>
          </div>
          <div
            className={`${classes.friend} ${
              isBtnPhoneBook ? classes.activetoggle : ""
            } `}
            onClick={friendHandler}
          >
            <i className="fas fa-address-book" title="Danh b???"></i>
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
                  Ch??o m???ng ?????n v???i <b>LAZO PC!</b>{" "}
                </p>
                <p className={classes.text}>
                  Kh??m ph?? nh???ng ti???n ??ch h??? tr??? l??m vi???c v?? tr?? chuy???n c??ng
                  ng?????i th??n, b???n b?? ???????c t???i ??u h??a cho m??y t??nh c???a b???n.
                </p>
              </div>
              <div className={classes.owl}>
                <OwlCarousel options={options}>
                  <div className={classes.item}>
                    <img src={img1} alt="1" />
                    <h4>Nh???n tin nhi???u h??n, so???n th???o ??t h??n</h4>
                    <p>
                      S??? d???ng <b>Tin Nh???n Nhanh</b> ????? l??u tr??? c??c tin nh???n
                      th?????ng d??ng v?? g???i nhanh trong h???p tho???i b???t k??
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img2} alt="2" />
                    <h4>G???i nh??m v?? l??m vi???c hi???u qu??? v???i Lazo Group Call</h4>
                    <p>Trao ?????i c??ng vi???c m???i l??c m???i n??i</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img3} alt="3" />
                    <h4>Tr???i nghi???m xuy??n su???t</h4>
                    <p>
                      K???t n???i v?? gi???i quy???t c??ng vi???c tr??n m???i thi???t b??? v???i d???
                      li???u lu??n ???????c ?????ng b???
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img4} alt="4" />
                    <h4>G???i file n??ng?</h4>
                    <p>???? c?? Lazo PC "x???" h???t</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img5} alt="5" />
                    <h4>Chat nh??m v???i ?????ng nghi???p</h4>
                    <p>Ti???n l???i h??n, nh??? c??c c??ng c??? chat tr??n m??y t??nh</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img6} alt="6" />
                    <h4>Gi???i quy???t c??ng vi???c hi???u qu??? h??n, l??n ?????n 40%</h4>
                    <p>V???i Lazo PC</p>
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
