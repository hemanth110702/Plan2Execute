import { useState } from "react";
import { months } from "../staticData/CalenderCollection";

const History = (
  {
    /* plans */
  }
) => {
  const plans = {
    "2024-01-31": [
      {
        planId: 1706360462416,
        displayName: "test 1",
        displayContent: "dsad",
        planDate: "2024-01-31",
        startTime: "",
        endTime: "",
        eventType: "Personal",
        category: "planned",
        checkListItems: [],
        checkListStatus: false,
      },
      {
        planId: 1706360462416,
        displayName: "test 2",
        displayContent: "dsad",
        planDate: "2024-01-31",
        startTime: "",
        endTime: "",
        eventType: "Personal",
        category: "planned",
        checkListItems: [],
        checkListStatus: false,
      },
      {
        planId: 1706360462416,
        displayName: "test 3",
        displayContent: "dsad",
        planDate: "2024-01-31",
        startTime: "",
        endTime: "",
        eventType: "Personal",
        category: "planned",
        checkListItems: [],
        checkListStatus: false,
      },
    ],
    "2024-01-29": [
      {
        planId: 1706360468944,
        displayName: "test 2",
        displayContent: "dsad",
        planDate: "2024-01-29",
        startTime: "",
        endTime: "",
        eventType: "Personal",
        category: "planned",
        checkListItems: [],
        checkListStatus: false,
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const [planHistory, setPlanHistory] = useState([]);

  const handleViewPlans = () => {
    const filteredPlans = Object.entries(plans).filter(([key]) =>
      key.includes(selectedMonth)
    );
    console.log("sm", selectedMonth);
    setPlanHistory(filteredPlans);
  };

  return (
    <div>
      <h1>View Plans from History</h1>
      <label>
        Select Month:
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </label>
      <button onClick={handleViewPlans}>View Plans</button>
      <div className="plan-history">
        {/*    {planHistory.length > 0 && (
          <div>
            <h2>Planned</h2>
            {planHistory.map(([planDate, plans]) => (
              <details key={planDate}>
                <summary>{planDate}</summary>
                {plans
                  .filter((plan) => plan.category === "planned")
                  .map((plan) => (
                    <div key={plan.planId}>
                      <p>{plan.displayName}</p>
                      <p>{plan.displayContent}</p>
                    </div>
                  ))}
              </details>
            ))}
          </div>
        )} */}

        {/* Add sections for Executed and Canceled here */}
        {/* Similar to the "Planned" section above */}
      </div>
    </div>
  );
};

export default History;
