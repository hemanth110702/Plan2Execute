import React, { useState } from "react";
import { months } from "../staticData/CalenderCollection";

const Birthdays = () => {
  const [birthdays, setBirthdays] = useState({
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  });

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const addDob = (e) => {
    e.preventDefault();
    const monthName = months[Number(dob[5] + dob[6]) - 1];
    console.log(name, dob, description, dob, monthName);
    const updateObj = birthdays
  };

  return (
    <div>
      <form action="#">
        <h1>Birthday</h1>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        Birth date:
        <input
          type="date"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
          }}
        />{" "}
        <button onClick={addDob}>add</button>
      </form>
      <div></div>
    </div>
  );
};

export default Birthdays;
