const CreatePlan = ({ setShowCreatePlan, plans, setPlans }) => {
  const addPlan = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("display-name");
    const displayContent = formData.get("display-content");
    const planDate = formData.get("date");
    const startTime = formData.get("start-time");
    const endTime = formData.get("end-time");
    const eventType = formData.get("eventType");
    const planId = Object.values(plans).filter(Array.isArray).length;

    if (planDate in plans) {
      const newPlan = Object.assign({}, plans);
      for (let plan in plans) {
        if (plan === planDate) {
          newPlan[plan].push({
            planId,
            displayName,
            displayContent,
            planDate,
            startTime,
            endTime,
            eventType,
            category: "planned",
          });
          setPlans(newPlan);
        }
      }
    } else {
      setPlans((prevPlans) => ({
        ...prevPlans,
        [planDate]: [
          {
            planId,
            displayName,
            displayContent,
            planDate,
            startTime,
            endTime,
            eventType,
            category: "planned",
          },
        ],
      }));
    }
  };

  return (
    <div className="create-plan-container">
      <form onSubmit={addPlan}>
        Display Name:
        <input type="text" name="display-name" placeholder="Name" /> <br />
        Display Content:{" "}
        <textarea name="display-content" placeholder="Plan...."></textarea>
        <br />
        Start Date:
        <input type="date" name="date" />
        <br />
        Start Time: <input type="time" name="start-time" />
        <br />
        End Time: <input type="time" name="end-time" />
        <br />
        <label>
          <input type="radio" name="eventType" value="Personal" />
          Personal
        </label>
        <label>
          <input type="radio" name="eventType" value="Office" />
          Office
        </label>
        <label>
          <input type="radio" name="eventType" value="Bill" />
          Bill
        </label>
        <label>
          <input type="radio" name="eventType" value="Other" />
          Other
        </label>{" "}
        <br />
        <button type="submit">Add plan</button>
        <button onClick={() => setShowCreatePlan(false)}>close</button>
      </form>
    </div>
  );
};

export default CreatePlan;
