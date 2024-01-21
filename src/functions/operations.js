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
  setMyPlans = function(){}
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

  /*
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

  console.log("plans", plans); */
};
