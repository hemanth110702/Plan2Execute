import { useState } from "react";

const EditPlan = ({ editPlanData, plans, setShowEditPlan, setPlans }) => {
  const [displayName, setDisplayName] = useState(editPlanData.displayName);
  const [displayContent, setDisplayContent] = useState(
    editPlanData.displayContent
  );
  const [startTime, setStartTime] = useState(editPlanData.startTime);
  const [endTime, setEndTime] = useState(editPlanData.endTime);
  const [eventType, setEventType] = useState(editPlanData.eventType);
  const [checkListItem, setCheckListItem] = useState("");
  const [checkListItems, setCheckListItems] = useState(
    editPlanData.checkListItems
  );

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

  const updatePlan = (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...editPlanData,
      displayName,
      displayContent,
      startTime,
      endTime,
      eventType,
      checkListItems,
    };

    console.log(updatedPlan);

    const tempPlans = plans;
    tempPlans[updatedPlan["planDate"]]["planned"][updatedPlan["planId"]] =
      updatedPlan;

    setPlans(tempPlans);
  setShowEditPlan(false); 
  };

  return (
    <form action="#">
      Display Name:
      <input
        type="text"
        name="display-name"
        placeholder="Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />{" "}
      <br />
      Display Content:{" "}
      <textarea
        name="display-content"
        placeholder="Plan...."
        value={displayContent}
        onChange={(e) => setDisplayContent(e.target.value)}
      ></textarea>
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
      Start Time:{" "}
      <input
        type="time"
        name="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br />
      End Time:{" "}
      <input
        type="time"
        name="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br />
      <label>
        <input
          type="radio"
          name="eventType"
          value="Personal"
          checked={eventType === "Personal"}
          onChange={() => setEventType("Personal")}
        />
        Personal
      </label>
      <label>
        <input
          type="radio"
          name="eventType"
          value="Office"
          checked={eventType === "Office"}
          onChange={() => setEventType("Office")}
        />
        Office
      </label>
      <label>
        <input
          type="radio"
          name="eventType"
          value="Bill"
          checked={eventType === "Bill"}
          onChange={() => setEventType("Bill")}
        />
        Bill
      </label>
      <label>
        <input
          type="radio"
          name="eventType"
          value="Other"
          checked={eventType === "Other"}
          onChange={() => setEventType("Other")}
        />
        Other
      </label>
      <br />
      <button onClick={updatePlan}>update</button>
      <button onClick={() => setShowEditPlan(false)}>close</button>
    </form>
  );
};

export default EditPlan;
