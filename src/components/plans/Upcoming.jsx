import { useEffect, useState } from "react";
import { dateToString, deletePlan, editPlan } from "../../functions/operations";
import EditPlan from "./EditPlan";

const Upcoming = ({ plans, setPlans, setShowCreatePlan, setSelectedRegister }) => {
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
  const presentDateFormat = dateToString(dateToday);

  useEffect(() => {
    //filter the upcoming plans
    const filterUpcoming = Object.entries(plans).filter(
      (planDate) => planDate[0] > presentDateFormat
    );
    setUpcomingPlans(filterUpcoming);
  }, [plans]);

 /*  useEffect(() => {
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
  }, [upcomingPlans]); */

  return (
    <div className="upcoming-container">
     {/*  <div className="header">
        <h1>Future Goals: Upcoming Endeavors <button onClick={
          () => {
            setSelectedRegister({ date: "" });
            setShowCreatePlan(true);
        }}>Add</button></h1>
        <h3>
          Events <br />{" "}
          {`Prs: ${upcomingEvents["Personal"]} | Off: ${upcomingEvents["Office"]} | Bills: ${upcomingEvents["Bill"]} | Oth: ${upcomingEvents["Other"]} `}
        </h3>
      </div> */}
      <div className="body">
        {/* {upcomingPlans.map((planDate) => (
          <details>
            <summary>{planDate[0]}</summary>
            <div>
              {planDate[1].map((plan) => (
                <details>
                  <summary>
                    {plan.displayName}{" "}
                    <button
                      onClick={() =>
                        editPlan(plan, setEditPlanData, setShowEditPlan)
                      }
                    >
                      edit
                    </button>{" "}
                    <button onClick={() => deletePlan(plan, plans, setPlans)}>
                      delete
                    </button>
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
        ))} */}
      </div>
    </div>
  );
};

export default Upcoming;
