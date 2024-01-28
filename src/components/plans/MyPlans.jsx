import { useEffect, useState } from "react";
import { days, months } from "../../staticData/CalenderCollection";
import {
  checklistUpdater,
  dateToString,
  editPlan,
  eventTypeCounter,
} from "../../functions/operations";
import EditPlan from "./EditPlan";
import CountdownTimer from "./CountdownTimer";

const MyPlans = ({
  plans,
  setPlans,
  setShowCreatePlan,
  selectedRegister,
  setSelectedRegister,
}) => {
  const [myPlans, setMyPlans] = useState([]);
  const [showPlans, setShowPlans] = useState("planned");
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [selectedEditPlanId, setSelectedEditPlanId] = useState(null);
  const [events, setEvents] = useState({
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  });
  const [planCategoryCounter, setPlanCategoryCounter] = useState({
    planned: 0,
    executed: 0,
    cancelled: 0,
  });

  const dateToday = new Date();
  const presentYear = dateToday.getFullYear();
  const presentDay = dateToday.getDay();
  const presentMonth = dateToday.getMonth();
  const presentDate = dateToday.getDate();
  const today = dateToString(dateToday);

  useEffect(() => {
    for (let [planDate, planInfo] of Object.entries(plans)) {
      if (planDate === today) {
        setMyPlans({ ...planInfo });
        break;
      }
    }
  }, [plans]);

  useEffect(() => {
    console.log("myPlans", myPlans);
    /* if (myPlans) {
      countEventType();
    }
    countCategory();
    let fd = myPlans.filter((plan) => plan.category === showPlans);
    console.log("fd", fd); */
  }, [myPlans]);

  const countCategory = () => {
    const counterObj = { planned: 0, executed: 0, cancelled: 0 };
    for (let i = 0; i < myPlans.length; i++) {
      if (myPlans[i].category === "planned") {
        counterObj.planned += 1;
      } else if (myPlans[i].category === "executed") {
        counterObj.executed += 1;
      } else {
        counterObj.cancelled += 1;
      }
    }
    setPlanCategoryCounter((prevCounter) => ({
      ...prevCounter,
      ...counterObj,
    }));
  };

  const countEventType = () => {
    setEvents(eventTypeCounter(myPlans));
  };

  const changeCategory = (categoryType, plan) => {
    plan.category = categoryType;
    const dayPlans = plans[plan.planDate];
    console.log(dayPlans);
    dayPlans[plan.category].push(plan);
    const plannedArray = dayPlans.planned;
    for (let i = 0; i < plannedArray.length; i++) {
      if (plannedArray[i].planId === plan.planId) {
        plannedArray.splice(i, 1);
        break;
      }
    }
    const newDayPlans = { ...dayPlans, planned: plannedArray };
    setPlans((prevPlans) => ({ ...prevPlans, [plan.planDate]: newDayPlans }));
  };

  return (
    <div className="my-plans-container">
      <div className="header">
        <h1>
          Seize the Day: Today's Plans{" "}
          {/*     <button
            onClick={() => {
              setSelectedRegister({ date: today, registerOn: "today" });
              setShowCreatePlan(true);
            }}
          >
            Add
          </button>{" "} */}
        </h1>
        {/*   <h3>
          Events <br />
          {`Prs: ${events["Personal"]} | Off: ${events["Office"]} | Bills: ${events["Bill"]} | Oth: ${events["Other"]} `}
        </h3> */}
        <div>
          <button onClick={() => setShowPlans("planned")}>
            Planned {planCategoryCounter.planned}
          </button>
          <button onClick={() => setShowPlans("executed")}>
            Executed {planCategoryCounter.executed}
          </button>
          <button onClick={() => setShowPlans("cancelled")}>
            Cancelled {planCategoryCounter.cancelled}
          </button>
        </div>
        <div className="date-container">
          <div>{presentYear}</div>
          <div>
            {days[presentDay]}, {presentDate} {months[presentMonth]}
          </div>
        </div>
      </div>
      <div className="body">
        {myPlans[showPlans] && myPlans[showPlans].length ? (
          myPlans[showPlans].map((plan) => (
            <div>
              <details>
                <summary>
                  {plan.displayName} - {plan.eventType}
                  <div>
                    {plan.displayContent}{" "}
                    {plan.checkListItems.length > 0 &&
                      plan.checkListStatus &&
                      "Checklist done"}{" "}
                  </div>
                  <div>
                    {plan.startTime && plan.endTime && (
                      <CountdownTimer
                        startTime={plan.startTime}
                        endTime={plan.endTime}
                      />
                    )}
                  </div>
                  {plan.category === "planned" ? (
                    <div>
                      <button onClick={() => changeCategory("executed", plan)}>
                        tick
                      </button>
                      <button onClick={() => changeCategory("cancelled", plan)}>
                        cross
                      </button>
                      <button
                        onClick={() => {
                          editPlan(plan, setEditPlanData, setShowEditPlan);
                          setSelectedEditPlanId(plan.planId);
                        }}
                      >
                        edit
                      </button>
                    </div>
                  ) : null}
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
              {showEditPlan && selectedEditPlanId === plan.planId && (
                <EditPlan
                  editPlanData={editPlanData}
                  plans={plans}
                  setShowEditPlan={setShowEditPlan}
                  setPlans={setPlans}
                />
              )}
            </div>
          ))
        ) : (
          <p>No plans available for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default MyPlans;
