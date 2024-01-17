import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import CreatePlan from "./CreatePlan";
import BdayPlan from "./BdayPlan";
import Quote from "./Quote";
import Upcoming from "./Upcoming";
import MyPlans from "./MyPlans";

const Plans = ({ user, setUser }) => {

  const navigate = useNavigate();
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [plans, setPlans] = useState({});

  // navigate to home, when user logout
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

  useEffect(()=>{
    console.log(plans);
  }, [plans])

  return (
    <div className="plans-container">
      <nav className="plans-nav">
        <h1>Plan2Execute</h1>
        <div className="nav-sections"> 
          <p>All plans</p>
          <p>Birthdays</p>
          <p>Notes</p>
        </div>
        <div className="nav-user">
          <h3>{user}</h3>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <Quote />
      <button onClick={() => setShowCreatePlan(true)}>Add Plan</button>
      <div>
        <div className="plans-panel">
          <Upcoming plans={plans} />
          <MyPlans plans={plans} setPlans={setPlans} />
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
