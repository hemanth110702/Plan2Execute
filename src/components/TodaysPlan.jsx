import React, { useEffect } from "react";

const TodaysPlan = ({ plans }) => {
  let today = new Date();
  let presentDate = `${today.getFullYear()}-${
    (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)
  }-${today.getDate()}`;

  let presentPlan;

  for (let [planDate, planInfo] of Object.entries(plans)) {
    if (planDate === presentDate) {
      presentPlan = [...planInfo];
      break;
    }
  }

  return (
    <div className="todaysplans-container">
      <h1>TodaysPlan</h1>
      <div>
        {presentPlan &&
          presentPlan.map((plan) => (
            <details>
              <summary>{plan.displayName}</summary>
              <p>{plan.displayContent}</p>
            </details>
          ))}
      </div>
    </div>
  );
};

export default TodaysPlan;
