import { useEffect, useState } from "react";
import CreatePlan from "./CreatePlan";
import Quote from "./Quote";
import Upcoming from "./Upcoming";
import MyPlans from "./MyPlans";
import NextDayPlan from "./NextDayPlan";

const Plans = ({ user, setUser }) => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [selectedRegister, setSelectedRegister] = useState({
    registerOn: "",
    date: "",
  });
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
          <NextDayPlan
            plans={plans}
            setPlans={setPlans}
            setShowCreatePlan={setShowCreatePlan}
            selectedRegister={selectedRegister}
            setSelectedRegister={setSelectedRegister}
          />
          <MyPlans
            plans={plans}
            setPlans={setPlans}
            setShowCreatePlan={setShowCreatePlan}
          />
        </div>
      </div>
      <Upcoming
        plans={plans}
        setPlans={setPlans}
        setShowCreatePlan={setShowCreatePlan}
      />
      {showCreatePlan && (
        <CreatePlan
          selectedRegister={selectedRegister}
          setSelectedRegister={setSelectedRegister}
          setShowCreatePlan={setShowCreatePlan}
          plans={plans}
          setPlans={setPlans}
        />
      )}
    </div>
  );
};

export default Plans;
