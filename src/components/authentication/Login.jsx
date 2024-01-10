import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../../firebase/config";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
    setUser(auth?.currentUser?.displayName);
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
    setUser(auth?.currentUser?.displayName);
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
        <button>Register</button>
        <hr />
        <button onClick={googleLogin}>SignIn with Google</button>
      </form>
    </div>
  );
};

export default Login;
