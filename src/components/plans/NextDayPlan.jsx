import { useEffect, useState } from "react";
import {
  checklistUpdater,
  dateToString,
  deletePlan,
  editPlan,
  eventTypeCounter,
} from "../../functions/operations";
import EditPlan from "./EditPlan";

const NextDayPlan = ({
  plans,
  setPlans,
  setShowCreatePlan,
  setSelectedRegister,
}) => {
  const [tmrwPlans, setTmrwPlans] = useState({});
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [selectedEditPlanId, setSelectedEditPlanId] = useState(null);
  const [events, setEvents] = useState({
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDay = dateToString(tomorrow);
  useEffect(() => {
    setTmrwPlans((prevPlans) => ({ ...prevPlans, ...plans[nextDay] }));
    console.log("err");
  }, [plans]);

  useEffect(() => {
    countEventType();
  }, [tmrwPlans]);

  const countEventType = () => {
    setEvents(eventTypeCounter(tmrwPlans));
  };

  return (
    <div className="tmrwPlans-container">
      <div className="tmrwPlans-header">
        <h1>
          Tomorrow's Triumphs: Plan Ahead{" "}
          <button
            onClick={() => {
              setSelectedRegister({ date: nextDay });
              setShowCreatePlan(true);
            }}
          >
            Add
          </button>{" "}
        </h1>{" "}
        <h3>
          Events <br />
          {`Prs: ${events["Personal"]} | Off: ${events["Office"]} | Bills: ${events["Bill"]} | Oth: ${events["Other"]} `}
        </h3>
        <br />
      </div>
      <div className="tmrwPlans-body">
        {tmrwPlans != undefined &&
        tmrwPlans["planned"] &&
        Object.keys(tmrwPlans["planned"]).length
          ? Object.entries(tmrwPlans["planned"]).map((plan) => (
              <div key={plan[1].planId}>
                <details>
                  <summary>
                    {plan[1].displayName} - {plan[1].eventType}
                    {plan[1].checkListItems.length > 0 &&
                      plan[1].checkListStatus &&
                      "Checklist done"}
                    <div>
                      <button
                        onClick={() => {
                          setSelectedEditPlanId(plan[1].planId);
                          editPlan(plan[1], setEditPlanData, setShowEditPlan);
                        }}
                      >
                        edit
                      </button>
                      <button
                        onClick={() =>
                          deletePlan(
                            plan[1],
                            plans,
                            setPlans,
                            true,
                            setTmrwPlans
                          )
                        }
                      >
                        delete
                      </button>
                    </div>
                  </summary>
                  <p>
                    <h4>Checklist</h4>
                    {plan[1].checkListItems.map((item, index) => (
                      <div key={index}>
                        {item.checkListItem}{" "}
                        <div>
                          status:{" "}
                          <input
                            type="checkbox"
                            onChange={() =>
                              checklistUpdater(index, plan[1], plans, setPlans)
                            }
                            checked={item["status"]}
                          />
                        </div>
                      </div>
                    ))}
                  </p>
                </details>
                {showEditPlan && selectedEditPlanId === plan[1].planId && (
                  <EditPlan
                    editPlanData={editPlanData}
                    plans={plans}
                    setShowEditPlan={setShowEditPlan}
                    setPlans={setPlans}
                  />
                )}
              </div>
            ))
          : "no more plans"}
      </div>
    </div>
  );
};

export default NextDayPlan;
