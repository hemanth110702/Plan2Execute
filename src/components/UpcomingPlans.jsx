import React, { useEffect } from "react";

const UpcomingPlans = ({ plans }) => {
  let upcomingPlans = [];
  useEffect(() => {
    const dates = Object.keys(plans);
    console.log("dates", dates);
    dates.sort();
    let today = new Date();
    let presentDate = `${today.getFullYear()}-${
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)
    }-${today.getDate()}`;
    for (let datePointer in dates) {
      if (dates[datePointer] > presentDate) {
        upcomingPlans.push(plans[dates[datePointer]]);
        console.log("up", upcomingPlans);
      }
    }
    console.log("plans", plans);
  }, [plans]);
  return (
    <div className="upcomingplans-container">
      <h1>UpcomingPlans</h1>
      <div>
        {upcomingPlans &&
          upcomingPlans.map((ucPlanDate) => (
            <details>
              <summary></summary>
              {/*  {ucPlanDate.map((ucPlans) => (
                <details>
                  <summary>{ucPlans.displayName}</summary>
                  <p>{ucPlans.displayContent}</p>
                </details>
              ))} */}
            </details>
          ))}
      </div>
    </div>
  );
};

export default UpcomingPlans;
