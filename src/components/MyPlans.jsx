import { useEffect, useState } from "react";
import { days, months } from "../staticData/CalenderCollection";
import EditPlan from "./EditPlan";
import CountdownTimer from "./CountdownTimer";

const MyPlans = ({ plans, setPlans }) => {
  const [myPlans, setMyPlans] = useState([]);
  const [showPlans, setShowPlans] = useState("planned");
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState({
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
  const presentDateFormat = `${dateToday.getFullYear()}-${
    (dateToday.getMonth() + 1 < 10 ? "0" : "") + (dateToday.getMonth() + 1)
  }-${dateToday.getDate()}`;

  useEffect(() => {
    for (let [planDate, planInfo] of Object.entries(plans)) {
      if (planDate === presentDateFormat) {
        setMyPlans([...planInfo]);
        break;
      }
    }
  }, [plans]);

  useEffect(() => {
    console.log("myPlans", myPlans);
    countEventType();
    countCategory();
    let fd = myPlans.filter((plan) => plan.category === showPlans);
    console.log("fd", fd);
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
    const eventType = {
      Personal: 0,
      Office: 0,
      Bill: 0,
      Other: 0,
    };
    for (let i = 0; i < myPlans.length; i++) {
      if (myPlans[i].eventType === "Personal") {
        eventType.Personal = eventType.Personal + 1;
      } else if (myPlans[i].eventType === "Office") {
        eventType.Office = eventType.Office + 1;
      } else if (myPlans[i].eventType === "Bill") {
        eventType.Bill = eventType.Bill + 1;
      } else {
        eventType.Other = eventType.Other + 1;
      }
    }
    setUpcomingEvents(eventType);
  };

  const changeCategory = (categoryType, plan) => {
    console.log("plans", plans, "plan", plan);
    plan.category = categoryType;
    const tempPlans = Object.assign({}, plans);
    for (let [planDate, planInfo] of Object.entries(tempPlans)) {
      if (planDate === plan.planDate) {
        for (let i = 0; i < planInfo.length; i++) {
          if (planInfo[i].planId === plan.planId) {
            planInfo[i].category = categoryType;
            break;
          }
        }
        break;
      }
    }
    setPlans(tempPlans);
  };

  const updateCheckList = (index, plan) => {
    console.log("plan", plan, "plans", plans);
    let updatePlan;
    for (let [planDate, planInfo] of Object.entries(plans)) {
      if (planDate === plan.planDate) {
        updatePlan = planInfo;
        break;
      }
    }
    console.log("update plan", updatePlan);
    let checkListCounter = 0;

    for (let i = 0; i < updatePlan.length; i++) {
      if (plan.planId === updatePlan[i].planId) {
        for (let j = 0; j < updatePlan[i].checkListItems.length; j++) {
          if (j == index) {
            updatePlan[i].checkListItems[j].status =
              !updatePlan[i].checkListItems[j].status;
          }
          if (updatePlan[i].checkListItems[j].status) {
            ++checkListCounter;
            if (checkListCounter === updatePlan[i].checkListItems.length) {
              updatePlan[i].checkListStatus = true;
            } else {
              updatePlan[i].checkListStatus = false;
            }
          }
        }
      }
    }

    setPlans((prevPlans) => ({ ...prevPlans, [plan.planDate]: updatePlan }));
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

  const editPlan = (plan) => {
    setEditPlanData(plan);
    setShowEditPlan(true);
  };

  return (
    <div className="my-plans-container">
      <div className="header">
        <h1>MyPlans - Today</h1>
        <h3>
          Events <br />
          {`Prs: ${upcomingEvents["Personal"]} | Off: ${upcomingEvents["Office"]} | Bills: ${upcomingEvents["Bill"]} | Oth: ${upcomingEvents["Other"]} `}
        </h3>
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
        {myPlans &&
          myPlans
            .filter((plan) => plan.category === showPlans)
            .map((plan) => (
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
                      <button onClick={() => editPlan(plan)}>edit</button>
                      <button onClick={() => deletePlan(plan)}>delete</button>
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
                          onChange={() => updateCheckList(index, plan)}
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

export default MyPlans;
