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
export const eventTypeCounter = (events) => {
  console.log(events);
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

//adding a plan
export const registerPlan = (setShowCreatePlan, selectedRegister) => {
  if (selectedRegister.registerOn === "tomorrow") {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextDate = dateToString(tomorrow);
    
  }
  setShowCreatePlan(true);
};
