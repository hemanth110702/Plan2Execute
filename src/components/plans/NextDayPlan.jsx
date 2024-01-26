import { useEffect, useState } from "react";
import {
  checklistUpdater,
  dateToString,
  deletePlan,
  editPlan,
  eventTypeCounter,
} from "../../functions/operations";
import EditPlan from "./EditPlan";

const NextDayPlan = ({ plans, setPlans }) => {
  const [tmrwPlans, setTmrwPlans] = useState([]);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [events, setEvents] = useState({
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  });
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tmrw = dateToString(tomorrow);
  useEffect(() => {
    setTmrwPlans(plans[tmrw]);
    if (tmrwPlans) {
      countEventType();
    }
    console.log("err");
  }, [plans, tmrwPlans]);

  const countEventType = () => {
    setEvents(eventTypeCounter(tmrwPlans));
  };

  return (
    <div className="tmrwPlans-container">
      <div className="tmrwPlans-header">
        <h1>Upcoming Tmrw</h1> <br />
        <h3>
          Events <br />
          {`Prs: ${events["Personal"]} | Off: ${events["Office"]} | Bills: ${events["Bill"]} | Oth: ${events["Other"]} `}
        </h3>
      </div>
      <div className="tmrwPlans-body">
        {tmrwPlans &&
          tmrwPlans.map((plan) => (
            <details key={plan.planId}>
              <summary>
                {plan.displayName} - {plan.eventType}
                <div>
                  <button
                    onClick={() =>
                      editPlan(plan, setEditPlanData, setShowEditPlan)
                    }
                  >
                    edit
                  </button>
                  <button
                    onClick={() =>
                      deletePlan(plan, plans, setPlans, true, setTmrwPlans)
                    }
                  >
                    delete
                  </button>
                </div>
              </summary>

              <p>
                <h4>Checklist</h4>
                {plan.checkListItems.map((item, index) => (
                  <div>
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
              </p>
            </details>
          ))}
      </div>
      {showEditPlan && (
        <EditPlan
          editPlanData={editPlanData}
          plans={plans}
          setShowEditPlan={setShowEditPlan}
          setPlans={setPlans}
        />
      )}
    </div>
  );
};

export default NextDayPlan;
