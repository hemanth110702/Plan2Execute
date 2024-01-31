import { useState } from "react";

const History = ({ plans }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [planHistory, setPlanHistory] = useState([]);

  const handleViewPlans = () => {
    const filteredPlans = Object.entries(plans).filter(([key]) =>
      key.includes(selectedMonth)
    );
    console.log(filteredPlans);
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
        <div className="heading">
          {selectedMonth || <h1>Select month and year</h1>}
        </div>
        {Object.keys(planHistory).length > 0 && (
          <div>
            <h2>Planned</h2>
            {planHistory.map((plans) => (
              <details>
                <summary>{plans[0]}</summary>
                <div>
                  <h3>Planned</h3>
                  {Object.values(plans[1]["planned"]).map((plan) => (
                    <details>
                      <summary>{plan.displayName}</summary>
                      <div>
                        {plan.displayContent} <br />
                        <p>
                          Checklist <br />
                          {plan.checkListItems.map((item, index) => (
                            <div>
                              {item.checkListItem}{" "}
                              <div>
                                status:{" "}
                                <input type="checkbox" value={item["status"]} />
                                {}
                              </div>
                            </div>
                          ))}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
                <div>
                  <h3>Executed</h3>
                  {Object.values(plans[1]["executed"]).map((plan) => (
                    <details>
                      <summary>{plan.displayName}</summary>
                      <div>{plan.displayContent}</div>
                    </details>
                  ))}
                </div>
                <div>
                  <h3>Cancelled</h3>
                  {Object.values(plans[1]["cancelled"]).map((plan) => (
                    <details>
                      <summary>{plan.displayName}</summary>
                      <div>{plan.displayContent}</div>
                    </details>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
