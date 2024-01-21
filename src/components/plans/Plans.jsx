import { useEffect, useState } from "react";
import CreatePlan from "./CreatePlan";
import Quote from "./Quote";
import Upcoming from "./Upcoming";
import MyPlans from "./MyPlans";

const Plans = ({ user, setUser }) => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [plans, setPlans] = useState({});

  useEffect(() => {
    console.log(plans);
  }, [plans]);

  return (
    <div className="plans-container">
      <Quote />
      <button onClick={() => setShowCreatePlan(true)}>Add Plan</button>
      <div>
        <div className="plans-panel">
          <Upcoming plans={plans} setPlans={setPlans} />
          <MyPlans plans={plans} setPlans={setPlans} />
        </div>
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
