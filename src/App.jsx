import { useState } from "react";
import "./App.css";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { auth } from "./firebase/config";
import { signOut } from "firebase/auth";
import ForgotPwd from "./components/authentication/ForgotPwd";

function App() {
  const [user, setUser] = useState(auth?.currentUser?.displayName);
  console.log(auth?.currentUser?.email);

  const logout = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("logout error: ", err);
    }
  };
  return (
    <>
      <h1>Plan2Execute</h1>
      <button onClick={logout}>Logout</button>
      <h1>{user}</h1>
      <Login setUser={setUser} />
    </>
  );
}

export default App;
