import { useEffect, useState } from "react";

const Upcoming = ({ plans }) => {
  const [upcomingPlans, setUpcomingPlans] = useState({});

  const dateToday = new Date();
  const presentDateFormat = `${dateToday.getFullYear()}-${
    (dateToday.getMonth() + 1 < 10 ? "0" : "") + (dateToday.getMonth() + 1)
  }-${dateToday.getDate()}`;

  useEffect(() => {
    //sort the plans according to date
    const unsortedPlans = Object.entries(plans);
    const sortedPlans = unsortedPlans.sort(
      ([a], [b]) => new Date(a) - new Date(b)
    );
    const sortedPlansObject = Object.fromEntries(sortedPlans);

    //filter the upcoming plans
    const filterUpcoming = Object.entries(sortedPlansObject).filter(
      (planDate) => planDate[0] > presentDateFormat
    );
    setUpcomingPlans(filterUpcoming);
  }, [plans]);

  useEffect(() => {
    console.log("ucp", upcomingPlans);
  }, [upcomingPlans]);

  return (
    <div className="upcoming-container">
      <div className="header">
        <h1>Upcoming</h1>
      </div>
      <div className="body">
        {upcomingPlans.map((planDate) => (
          <details>
            <summary>{planDate[0]}</summary>
            <div>
              {planDate[1].map((plans) => (
                <details>
                  <summary>{plans.displayName}</summary>
                  <p>{plans.displayContent}</p>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

/* {2024-01-14: Array(2), 2024-01-15: Array(1)} */

export default Upcoming;
