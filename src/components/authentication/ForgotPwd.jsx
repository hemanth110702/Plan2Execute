import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";

const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {resetSent && <p>Password reset email sent. Check your inbox!</p>}
    </div>
  );
};

export default ForgotPwd;
