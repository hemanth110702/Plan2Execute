import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser, setDisplayLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // useEffect to watch for changes in the user state
    if (user) {
      navigate("/" + user);
    }
  }, [user, navigate]);

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(()=>auth?.currentUser?.displayName);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setUser(()=>auth?.currentUser?.displayName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login to continue</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <p>Forgot Password?</p>
        <button onClick={login}>Login</button>
        <button onClick={() => setDisplayLogin(false)}>Register</button>
        <hr />
        <button onClick={googleLogin}>SignIn with Google</button>
      </form>
    </div>
  );
};

export default Login;
