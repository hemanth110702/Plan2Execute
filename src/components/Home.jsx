import { useState } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Home = ({user, setUser}) => {
  const [displayLogin, setDisplayLogin] = useState(true);
    const logout = () => {
      try {
        signOut(auth);
      } catch (err) {
        console.log("logout error: ", err);
      }
      setUser(auth?.currentUser?.displayName);
    };
  return (
    <div className="SignUp">
      <h1>Plan2Execute</h1>
      {displayLogin && <Login user={user} setDisplayLogin={setDisplayLogin} setUser={setUser} />}
      {!displayLogin && <Register setDisplayLogin={setDisplayLogin} />}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
