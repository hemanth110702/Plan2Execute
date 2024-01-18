import { useEffect, useState } from "react";
import EditPlan from "./EditPlan";

const Upcoming = ({ plans, setPlans }) => {
  const [upcomingPlans, setUpcomingPlans] = useState([]);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState({
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  });

  const dateToday = new Date();
  const presentDateFormat = `${dateToday.getFullYear()}-${
    (dateToday.getMonth() + 1 < 10 ? "0" : "") + (dateToday.getMonth() + 1)
  }-${dateToday.getDate()}`;

  useEffect(() => {
    //sort the plans according to date
    const unsortedPlans = Object.entries(plans);
    const sortedPlans = unsortedPlans.sort(
      ([a], [b]) => new Date(a) - new Date(b)
    );
    const sortedPlansObject = Object.fromEntries(sortedPlans);

    //filter the upcoming plans
    const filterUpcoming = Object.entries(sortedPlansObject).filter(
      (planDate) => planDate[0] > presentDateFormat
    );
    setUpcomingPlans(filterUpcoming);
  }, [plans]);

  useEffect(() => {
    // count the total of each event
    const eventType = {
      Personal: 0,
      Office: 0,
      Bill: 0,
      Other: 0,
    };
    for (let i = 0; i < upcomingPlans.length; i++) {
      for (let j = 0; j < upcomingPlans[i][1].length; j++) {
        if (upcomingPlans[i][1][j].eventType === "Personal") {
          eventType.Personal = eventType.Personal + 1;
        } else if (upcomingPlans[i][1][j].eventType === "Office") {
          eventType.Office = eventType.Office + 1;
        } else if (upcomingPlans[i][1][j].eventType === "Bill") {
          eventType.Bill = eventType.Bill + 1;
        } else {
          eventType.Other = eventType.Other + 1;
        }
      }
    }
    setUpcomingEvents(eventType);
    console.log("ucp", upcomingPlans);
  }, [upcomingPlans]);

  const editPlan = (plan) => {
    setEditPlanData(plan);
    setShowEditPlan(true);
  };

 const deletePlan = (plan) => {
   console.log("plan", plan, "plans", plans);

   let tempPlan;
   for (let [planDate, planInfo] of Object.entries(plans)) {
     if (planDate === plan.planDate) {
       tempPlan = planInfo;
       break;
     }
   }

   let updatedTempPlan = tempPlan.filter((pp) => pp.planId !== plan.planId);
   console.log("tempPlan", tempPlan);

   // If updatedTempPlan is empty, remove the key from the plans object
   if (updatedTempPlan.length === 0) {
     const { [plan.planDate]: omit, ...restPlans } = plans;
     setPlans(restPlans);
   } else {
     // Otherwise, update the plans object with the new array
     setPlans((prevPlans) => ({
       ...prevPlans,
       [plan.planDate]: updatedTempPlan,
     }));
   }

   console.log("plans", plans);
 };


  return (
    <div className="upcoming-container">
      <div className="header">
        <h1>Upcoming</h1>
        <h3>
          Events <br />{" "}
          {`Prs: ${upcomingEvents["Personal"]} | Off: ${upcomingEvents["Office"]} | Bills: ${upcomingEvents["Bill"]} | Oth: ${upcomingEvents["Other"]} `}
        </h3>
      </div>
      <div className="body">
        {upcomingPlans.map((planDate) => (
          <details>
            <summary>{planDate[0]}</summary>
            <div>
              {planDate[1].map((plan) => (
                <details>
                  <summary>
                    {plan.displayName}{" "}
                    <button onClick={() => editPlan(plan)}>edit</button>{" "}
                    <button onClick={() => deletePlan(plan)}>delete</button>
                  </summary>
                  <div>
                    <p>{plan.displayContent}</p>
                  </div>
                  {showEditPlan && (
                    <EditPlan
                      editPlanData={editPlanData}
                      plans={plans}
                      setShowEditPlan={setShowEditPlan}
                      setPlans={setPlans}
                    />
                  )}
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;