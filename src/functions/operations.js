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
  isMyPlans = false,
  setMyPlans = function () {}
) => {
  const planDate = plan.planDate;
  const planId = plan.planId;

  const updatedPlans = { ...plans };

  if (updatedPlans[planDate] && updatedPlans[planDate]["planned"]) {
    delete updatedPlans[planDate]["planned"][planId];

    if (Object.keys(updatedPlans[planDate]["planned"]).length === 0) {
      delete updatedPlans[planDate];
    }

    setPlans((_) => ({ ...updatedPlans }));
  }

  console.log(updatedPlans);
};

//Date to string format
export const dateToString = (dateValue) =>
  dateValue.toISOString().split("T")[0];

// count category of each type
export const eventTypeCounter = (plansInIt) => {
  console.log("plansinit", plansInIt);
  const eventType = {
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
  };
  if (Object.keys(plansInIt).length === 0) {
    return eventType;
  }
  const events = [
    ...Object.values(plansInIt["planned"]),
    ...Object.values(plansInIt["executed"]),
    ...Object.values(plansInIt["cancelled"]),
  ];
  console.log("events", events);
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
  const tempPlans = { ...plans };

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
      }
    } else {
      updatePlan.checkListStatus = false;
    }
  }
  tempPlans[plan.planDate]["planned"][plan.planId] = updatePlan;

  setPlans(tempPlans);
};
