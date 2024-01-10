import React, { useEffect, useState } from "react";
import CreatePlan from "./CreatePlan";
import BdayPlan from "./BdayPlan";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Plans = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate, setUser]);

  const logout = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("logout error: ", err);
    }
    setUser(auth?.currentUser?.displayName);
  };

  return (
    <div className="plans-container">
      <nav className="plans-nav">
        <h1>Plan2Execute</h1>
        <div className="nav-user">
          <h3>{user}</h3>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <div>
        <button>Add Plan</button>
        <CreatePlan />
        <BdayPlan />
      </div>
    </div>
  );
};

export default Plans;
