import { useEffect, useState } from "react";
import { days, months } from "../staticData/CalenderCollection";

const MyPlans = ({plans}) => {

  const [myPlans, setMyPlans] = useState();

  const dateToday = new Date();
  const presentYear = dateToday.getFullYear();
  const presentDay = dateToday.getDay();
  const presentMonth = dateToday.getMonth();
  const presentDate = dateToday.getDate();
  const presentDateFormat = `${dateToday.getFullYear()}-${
    (dateToday.getMonth() + 1 < 10 ? "0" : "") + (dateToday.getMonth() + 1)
  }-${dateToday.getDate()}`;

  useEffect(()=>{
    for (let [planDate, planInfo] of Object.entries(plans)) {
      if (planDate === presentDateFormat) {
        setMyPlans([...planInfo]);
        break;
      }
    }
  }, [plans])

  return (
    <div className="my-plans-container">
      <div className="header">
        <h1>MyPlans - Today</h1>
        <div>
          <button>Planned</button>
          <button>Executed</button>
        </div>
        <div className="date-container">
          <div>{presentYear}</div>
          <div>{days[presentDay]}, {presentDate} {months[presentMonth]} </div>
        </div>
      </div>
      <div className="body">
        {myPlans && myPlans.map((plan)=>(<details>
          <summary>{plan.displayName}</summary>
          <div>{plan.displayContent}</div>
        </details>))}
      </div>
    </div>
  );
};

export default MyPlans;
