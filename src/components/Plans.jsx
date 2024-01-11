import React, { useEffect, useState } from "react";
import CreatePlan from "./CreatePlan";
import BdayPlan from "./BdayPlan";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import UpcomingPlans from "./UpcomingPlans";
import TodaysPlan from "./TodaysPlan";

const Plans = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [plans, setPlans] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate, setUser]);

  useEffect(() => {
    console.log(user);
  });

  useEffect(() => {
    console.log(plans);
  }, [plans]);

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
        <h1>Quote of the day</h1>
      </div>
      <button onClick={() => setShowCreatePlan(true)}>Add Plan</button>
      <div>
        <div className="plans-display">
          <UpcomingPlans plans={plans} />
          <TodaysPlan plans={plans} />
        </div>
        <BdayPlan />
      </div>
      {showCreatePlan && (
        <CreatePlan
          setShowCreatePlan={setShowCreatePlan}
          plans={plans}
          setPlans={setPlans}
        />
      )}
    </div>
  );
};

export default Plans;
