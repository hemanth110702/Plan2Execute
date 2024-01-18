
// Edit operation
export const editPlan = (plan, setEditPlanData, setShowEditPlan) => {
  setEditPlanData(plan);
  setShowEditPlan(true);
};

//Delete operation
export const deletePlan = (plan, plans, setPlans) => {
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
