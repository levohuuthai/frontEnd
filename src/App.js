import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Admin from "./pages/AdminPage";
import { Fragment } from "react";
//import {SocketContext, socket} from './context/socket';
//import axios from "./utils/axios";
//import { useHistory } from "react-router-dom";

// const receivePhone = async (enteredPhoneNumber) => {
//   console.log("Sending SMS");

//   await axios.post("/signup", {
//     to: enteredPhoneNumber,
//     channel: "sms",
//   });
// };

function App(ctx) {
  //const History = useHistory();
  // const receiveCode = async (enteredCode, valuePhone) => {
  //   console.log("checkout Code");
  //   console.log(valuePhone);
  //   console.log(enteredCode);

  //   await axios
  //     .post("/signup/verify", {
  //       to: valuePhone,
  //       code: enteredCode,
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.statusText === "OK") {
  //         History.push("/home");
  //       } else {
  //         alert("haha");
  //         console.log("haha");
  //       }
  //     })
  //     .catch((err) => {
  //       alert("haha");
  //       console.log("haha");
  //       console.log(err);
  //     });
  //   if (axios.responseType.valid === true) {
  //     History.push("/home");
  //   } else {
  //     console.log("sai rồi");
  //   }
  // };
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />{" "}
        </Route>
        {/* <SocketContext.Provider value={socket}>  */}
        <Route path="/home">
          <HomePage />
        </Route>
        {/* </SocketContext.Provider>  */}
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
