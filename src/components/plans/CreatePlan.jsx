import { useState } from "react";
import { dateToString } from "../../functions/operations";
import { days } from "../../staticData/CalenderCollection";

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
    const eventType = formData.get("eventType");
    const planId = Date.now();

    const plannedDate = new Date(planDate);
    const planDay = days[plannedDate.getDay()];

    if (plans && plans[planDate]) {
      const newPlan = Object.assign({}, plans);
      for (let plan in plans) {
        if (plan === planDate) {
          newPlan[plan].planned[planId] = {
            planId,
            displayName,
            displayContent,
            planDate,
            planDay,
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
          planned: {
            [planId]: {
              planId,
              displayName,
              displayContent,
              planDate,
              planDay,
              startTime,
              endTime,
              eventType,
              category: "planned",
              checkListItems,
              checkListStatus: false,
            },
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

  const updateDate = (e, query) => {
    e.preventDefault();
    console.log("dddddd");
    const dateToday = new Date();
    if (query === "today") {
      const today = dateToString(dateToday);
      console.log(dateToday);
      setSelectedRegister((prevData) => ({
        ...prevData,
        date: today,
      }));
    }
    if (query === "tomorrow") {
      const currentDate = new Date();
      const tomorrowDate = new Date();
      tomorrowDate.setDate(currentDate.getDate() + 1);
      const tomorrowFormatted = dateToString(tomorrowDate);
      console.log(tomorrowFormatted);
      setSelectedRegister({ date: tomorrowFormatted });
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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
          min={getMinDate()}
          onChange={(e) =>
            setSelectedRegister((prevData) => ({
              ...prevData,
              date: e.target.value,
            }))
          }
        />{" "}
        <button onClick={(e) => updateDate(e, "today")}>Today</button>{" "}
        <button onClick={(e) => updateDate(e, "tomorrow")}>Tomorrow</button>
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
