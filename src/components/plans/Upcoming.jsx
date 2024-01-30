import { useEffect, useState } from "react";
import { checklistUpdater, dateToString, deletePlan, editPlan } from "../../functions/operations";
import EditPlan from "./EditPlan";

const Upcoming = ({
  plans,
  setPlans,
  setShowCreatePlan,
  setSelectedRegister,
}) => {
  const [upcomingPlans, setUpcomingPlans] = useState({});
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [selectedEditPlanId, setSelectedEditPlanId] = useState(null);
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
    const filterUpcoming = Object.fromEntries(
      Object.entries(plans).filter(
        (planDate) => planDate[0] > presentDateFormat
      )
    );
    setUpcomingPlans((prevPlans) => ({ ...prevPlans, ...filterUpcoming }));
  }, [plans]);

  useEffect(() => {
    console.log(upcomingPlans);
  }, [upcomingPlans]);

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
      <div className="header">
        <h1>
          Future Goals: Upcoming Endeavors{" "}
          <button
            onClick={() => {
              setSelectedRegister({ date: "" });
              setShowCreatePlan(true);
            }}
          >
            Add
          </button>
        </h1>
        <h3>
          Events <br />{" "}
          {`Prs: ${upcomingEvents["Personal"]} | Off: ${upcomingEvents["Office"]} | Bills: ${upcomingEvents["Bill"]} | Oth: ${upcomingEvents["Other"]} `}
        </h3>
      </div>
      <div className="body">
        {Object.entries(upcomingPlans).map(([planDate, plansData]) => (
          <details key={planDate}>
            <summary>{planDate}</summary>
            <div>
              {Object.values(plansData.planned).map((plan) => (
                <details key={plan.planId}>
                  <summary>
                    {plan.displayName}{" "}
                    {plan.checkListItems.length > 0 &&
                      plan.checkListStatus &&
                      "Checklist done"}
                    <button
                      onClick={() => {
                        setSelectedEditPlanId(plan.planId);
                        editPlan(plan, setEditPlanData, setShowEditPlan);
                      }}
                    >
                      edit
                    </button>{" "}
                    <button onClick={() => deletePlan(plan, plans, setPlans)}>
                      delete
                    </button>
                  </summary>
                  <div>
                    <p>{plan.displayContent}</p>
                    <h4>Checklist</h4>
                    {plan.checkListItems.map((item, index) => (
                      <div key={index}>
                        {item.checkListItem}{" "}
                        <div>
                          status:{" "}
                          <input
                            type="checkbox"
                            onChange={() =>
                              checklistUpdater(index, plan, plans, setPlans)
                            }
                            checked={item["status"]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {showEditPlan && selectedEditPlanId === plan.planId && (
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
