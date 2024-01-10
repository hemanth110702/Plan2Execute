import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuth } from "../../firebase/config";

const Register = ({ setDisplayLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      signOut(auth);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const googleRegister = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
    signOut(auth);
  };

  return (
    <div>
      <h2>Create an account</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <button onClick={handleSignUp}>Register</button>
        <br />
        <button onClick={() => setDisplayLogin(true)}>Login</button>
        <hr />
        <button onClick={googleRegister}>Register with Google</button>
      </form>
    </div>
  );
};

export default Register;
