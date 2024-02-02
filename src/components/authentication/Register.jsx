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
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user display name
      await updateProfile(userCredential.user, { displayName });

      // Set up initial plans in Firestore for the user
      const userDocRef = doc(
        collection(db, "p2eData"),
        userCredential.user.uid
      );
      await setDoc(userDocRef, {
        plans: {}, // Add initial plans data here if needed
        notes: {}, // Add initial notes data here if needed
        birthdays: {
          January: [],
          February: [],
          March: [],
          April: [],
          May: [],
          June: [],
          July: [],
          August: [],
          September: [],
          October: [],
          November: [],
          December: [],
        },
      });

      // Sign out after registration (you can remove this if it's not needed)
      signOut(auth);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

 const googleRegister = async () => {
   try {
     // Sign in with Google
     const result = await signInWithPopup(auth, googleAuth);

     // Check if the user is new
     const isNewUser = result.additionalUserInfo.isNewUser;

     // If the user is new, set up initial plans in Firestore
     if (isNewUser) {
       const user = result.user;

       const userDocRef = doc(collection(db, "p2eData"), user.uid);
       await setDoc(userDocRef, {
         plans: {}, // Add initial plans data here if needed
         notes: {}, // Add initial notes data here if needed
         birthdays: {
           January: [],
           February: [],
           March: [],
           April: [],
           May: [],
           June: [],
           July: [],
           August: [],
           September: [],
           October: [],
           November: [],
           December: [],
         },
       });
     }
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
