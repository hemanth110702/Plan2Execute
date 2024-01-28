// Edit operation
export const editPlan = (plan, setEditPlanData, setShowEditPlan) => {
  setEditPlanData(plan);
  setShowEditPlan(true);
};

// Delete operation
export const deletePlan = (
  plan,
  plans,
  setPlans,
  isMyPlans = "false",
  setMyPlans = function () {}
) => {
  let tempPlan;
  for (let [planDate, planInfo] of Object.entries(plans)) {
    if (planDate === plan.planDate) {
      tempPlan = planInfo;
      break;
    }
  }

  let indexToDelete = 0;

  for (let i = 0; i < tempPlan.length; i++) {
    if (tempPlan[i].planId == plan.planId) {
      indexToDelete = i;
      break;
    }
  }

  tempPlan.splice(indexToDelete, 1);
  const oldPlans = plans;
  console.log("utp", tempPlan);

  if (tempPlan.length === 0) {
    delete oldPlans[plan.planDate];
    setPlans((_) => ({ ...oldPlans }));
    if (isMyPlans) {
      setMyPlans(() => []);
    }
  } else {
    setPlans((prevPlans) => ({ ...prevPlans, [plan.planDate]: tempPlan }));
  }
};

//Date to string format
export const dateToString = (dateValue) =>
  `${dateValue.getFullYear()}-${
    (dateValue.getMonth() + 1 < 10 ? "0" : "") + (dateValue.getMonth() + 1)
  }-${dateValue.getDate()}`;

// count category of each type
export const eventTypeCounter = (plansInIt) => {
  const events = [
    ...Object.values(plansInIt["planned"]),
    ...Object.values(plansInIt["executed"]),
    ...Object.values(plansInIt["cancelled"]),
  ];
  console.log("events", events);
  const eventType = {
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  };
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventType === "Personal") {
        eventType.Personal = eventType.Personal + 1;
      } else if (events[i].eventType === "Office") {
        eventType.Office = eventType.Office + 1;
      } else if (events[i].eventType === "Bill") {
        eventType.Bill = eventType.Bill + 1;
      } else {
        eventType.Other = eventType.Other + 1;
      }
    }
  }
  return eventType;
};

// checklist updater
export const checklistUpdater = (index, plan, plans, setPlans) => {
  console.log("plan", plan, "plans", plans);
  const tempPlans = {...plans};

  const updatePlan = tempPlans[plan.planDate]["planned"][plan.planId];
  console.log(updatePlan);

  let checkListCounter = 0;

  for (let j = 0; j < updatePlan.checkListItems.length; j++) {
    if (j == index) {
      updatePlan.checkListItems[j].status =
        !updatePlan.checkListItems[j].status;
    }
    if (updatePlan.checkListItems[j].status) {
      ++checkListCounter;
      if (checkListCounter === updatePlan.checkListItems.length) {
        updatePlan.checkListStatus = true;
      } else {
        updatePlan.checkListStatus = false;
      }
    }
  }
  tempPlans[plan.planDate]["planned"][plan.planId] = updatePlan;

  setPlans(tempPlans);
};
