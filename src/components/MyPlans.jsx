import { useEffect, useState } from "react";
import { days, months } from "../staticData/CalenderCollection";

const MyPlans = ({ plans }) => {
  const [myPlans, setMyPlans] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState({
    Personal: 0,
    Office: 0,
    Bill: 0,
    Other: 0,
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
  }, [myPlans]);

  return (
    <div className="my-plans-container">
      <div className="header">
        <h1>MyPlans - Today</h1>
        <h3>
          Events <br />
          {`Prs: ${upcomingEvents["Personal"]} | Off: ${upcomingEvents["Office"]} | Bills: ${upcomingEvents["Bill"]} | Oth: ${upcomingEvents["Other"]} `}
        </h3>
        <div>
          <button>Planned</button>
          <button>Executed</button>
        </div>
        <div className="date-container">
          <div>{presentYear}</div>
          <div>
            {days[presentDay]}, {presentDate} {months[presentMonth]}{" "}
          </div>
        </div>
      </div>
      <div className="body">
        {myPlans &&
          myPlans.map((plan) => (
            <details>
              <summary>{plan.displayName}</summary>
              <div>{plan.displayContent}</div>
            </details>
          ))}
      </div>
    </div>
  );
};

export default MyPlans;
