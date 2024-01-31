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
  const [myPlans, setMyPlans] = useState({});
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
    setMyPlans((prevPlans) => ({
      ...prevPlans,
      ...plans[today],
    }));
  }, [plans, today]);

  useEffect(() => {
    console.log("updated myPlans");
    console.log("myPlans", myPlans);
    countCategory();
    countEventType();
  }, [myPlans]);

  const countCategory = () => {
    const counterObj = { planned: 0, executed: 0, cancelled: 0 };
    if (myPlans && myPlans["planned"]) {
      counterObj.planned = Object.keys(myPlans["planned"]).length;
    }

    if (myPlans && myPlans["executed"]) {
      counterObj.executed = Object.keys(myPlans["executed"]).length;
    }

    if (myPlans && myPlans["cancelled"]) {
      counterObj.cancelled = Object.keys(myPlans["cancelled"]).length;
    }
    setPlanCategoryCounter((prevCounter) => ({
      ...prevCounter,
      ...counterObj,
    }));
  };

  const countEventType = () => {
    setEvents(()=>eventTypeCounter(myPlans));
  };

  const changeCategory = (categoryType, plan) => {
    console.log(categoryType, plan);
    const tempMyPlans = myPlans;
    tempMyPlans[categoryType][plan.planId] = { ...plan };
    delete tempMyPlans["planned"][plan.planId];
    setPlans((prevPlans) => ({ ...prevPlans, [plan.planDate]: tempMyPlans }));
  };

  return (
    <div className="my-plans-container">
      <div className="header">
        <h1>
          Seize the Day: Today's Plans{" "}
          <button
            onClick={() => {
              setSelectedRegister({ date: today, registerOn: "today" });
              setShowCreatePlan(true);
            }}
          >
            Add
          </button>{" "}
        </h1>
        <h3>
          Events <br />
          {`Prs: ${events["Personal"]} | Off: ${events["Office"]} | Bills: ${events["Bill"]} | Oth: ${events["Other"]} `}
        </h3>
        <div>
          <button onClick={() => setShowPlans("planned")}>
            Planned {planCategoryCounter["planned"]}
          </button>
          <button onClick={() => setShowPlans("executed")}>
            Executed {planCategoryCounter["executed"]}
          </button>
          <button onClick={() => setShowPlans("cancelled")}>
            Cancelled {planCategoryCounter["cancelled"]}
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
        {myPlans != undefined &&
        myPlans[showPlans] &&
        Object.keys(myPlans[showPlans]).length ? (
          Object.entries(myPlans[showPlans]).map((plan) => (
            <div>
              <details>
                <summary>
                  {plan[1].displayName} - {plan[1].eventType}
                  <div>
                    {plan[1].displayContent}{" "}
                    {plan[1].checkListItems.length > 0 &&
                      plan[1].checkListStatus &&
                      "Checklist done"}{" "}
                  </div>
                  <div>
                    {plan[1].startTime && plan[1].endTime && (
                      <CountdownTimer
                        startTime={plan[1].startTime}
                        endTime={plan[1].endTime}
                      />
                    )}
                  </div>
                  {plan[1].category === "planned" ? (
                    <div>
                      <button
                        onClick={() => changeCategory("executed", plan[1])}
                      >
                        tick
                      </button>
                      <button
                        onClick={() => changeCategory("cancelled", plan[1])}
                      >
                        cross
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEditPlanId(plan[1].planId);
                          editPlan(plan[1], setEditPlanData, setShowEditPlan);
                        }}
                      >
                        edit
                      </button>
                    </div>
                  ) : null}
                </summary>
                <p>
                  Checklist <br />
                  {plan[1].checkListItems.map((item, index) => (
                    <div>
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
        ) : (
          <p>No plans available for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default MyPlans;
