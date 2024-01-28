import { useState } from "react";

const CreatePlan = ({
  selectedRegister,
  setSelectedRegister,
  setShowCreatePlan,
  plans,
  setPlans,
}) => {
  const [checkListItem, setCheckListItem] = useState("");
  const [checkListItems, setCheckListItems] = useState([]);

  const addPlan = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("display-name");
    const displayContent = formData.get("display-content");
    const planDate = formData.get("date");
    const startTime = formData.get("start-time");
    const endTime = formData.get("end-time");
    const eventType = formData.get("eventType") || "Other";
    const planId = Date.now();

    if (planDate in plans) {
      const newPlan = Object.assign({}, plans);
      for (let plan in plans) {
        if (plan === planDate) {
          newPlan[plan].planned[planId] = {
            planId,
            displayName,
            displayContent,
            planDate,
            startTime,
            endTime,
            eventType,
            category: "planned",
            checkListItems,
            checkListStatus: false,
          };
          setPlans(newPlan);
        }
      }
    } else {
      setPlans((prevPlans) => ({
        ...prevPlans,
        [planDate]: {
          planned: { [planId] :
            {
              planId,
              displayName,
              displayContent,
              planDate,
              startTime,
              endTime,
              eventType,
              category: "planned",
              checkListItems,
              checkListStatus: false,
            }
          },
          executed: {},
          cancelled: {},
        },
      }));
    }
    sortPlans();
  };

  const sortPlans = () => {
    console.log(plans);
    setPlans((prevPlans) => {
      const unsortedPlans = Object.entries(prevPlans);
      const sortedPlans = [...unsortedPlans].sort(
        ([a], [b]) => new Date(a) - new Date(b)
      );
      return Object.fromEntries(sortedPlans);
    });
  };

  const addChecklist = (e) => {
    e.preventDefault();
    setCheckListItems((prevItems) => [
      ...prevItems,
      { checkListItem, status: false },
    ]);
    setCheckListItem("");
    console.log("cl", checkListItem, "cls", checkListItems);
  };

  const removeChecklist = (index) => {
    const newCheckList = checkListItems.filter((item, i) => i != index);
    setCheckListItems(newCheckList);
  };

  return (
    <div className="create-plan-container">
      <form onSubmit={addPlan}>
        Display Name:
        <input type="text" name="display-name" placeholder="Name" /> <br />
        Display Content:{" "}
        <textarea name="display-content" placeholder="Plan...."></textarea>
        <br />
        Checklist:{" "}
        <input
          type="text"
          value={checkListItem}
          onChange={(e) => setCheckListItem(e.target.value)}
        />{" "}
        <button onClick={addChecklist}>add</button>
        <br />
        you have added:
        {checkListItems &&
          checkListItems.map((checklist, index) => (
            <p key={index}>
              {checklist.checkListItem}{" "}
              <button onClick={() => removeChecklist(index)}>remove</button>{" "}
            </p>
          ))}
        <br />
        Start Date:
        <input
          type="date"
          name="date"
          value={selectedRegister.date}
          onChange={(e) =>
            setSelectedRegister((prevData) => ({
              ...prevData,
              date: e.target.value,
            }))
          }
        />
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
        </label>
        <br />
        <input type="submit" value="add" />
        <button onClick={() => setShowCreatePlan(false)}>close</button>
      </form>
    </div>
  );
};

export default CreatePlan;
