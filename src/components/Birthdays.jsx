import React, { useEffect, useState } from "react";
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
  const [description, setDescription] = useState("");
  const [presentBds, setPresentBds] = useState([]);
  const [monthlyBds, setMonthlyBds] = useState([]);

  useEffect(() => {
    const today = new Date();
    const monthInd = today.getMonth();
    const year = today.getFullYear();
    const month = months[monthInd];
    const day = today.getDate();
    const presentDate = `${year}-${(monthInd + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const tempMonthlyBds = birthdays[month].filter(
      (dobs) => dobs.dob > presentDate
    );
    setMonthlyBds(tempMonthlyBds);
    const tempPresentBds = birthdays[month].filter(
      (dobs) => dobs.dob === presentDate
    );
    setPresentBds(tempPresentBds);
  }, [birthdays]);

  const addDob = (e) => {
    e.preventDefault();
    const dobId = Date.now();
    const monthName = months[Number(dob[5] + dob[6]) - 1];
    const updateDob = Array.isArray(birthdays[monthName])
      ? [...birthdays[monthName], { dobId, name, dob, description }]
      : [{ name, dob }];

    if (updateDob.length > 1) {
      updateDob.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    }

    setBirthdays((prevDob) => ({
      ...prevDob,
      [monthName]: updateDob,
    }));
    console.log(birthdays);
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
        <br />
        Description:{" "}
        <textarea
          name="des"
          id=""
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button onClick={addDob}>add</button>
      </form>
      <div>
        <h1>Birthdays today</h1> <br />
        <div>
          {presentBds.map((bday) => (
            <h4>{bday.name}</h4>
          ))}
        </div>
      </div>
      <div>
        <h1>Upcoming Birthdays in present month</h1>{" "}
        <div>
          {monthlyBds.map((bday) => (
            <h4>{bday.name}</h4>
          ))}
        </div>
      </div>
      <div>
        <h1>All Birthdays</h1>{" "}
        {months.map((month, index) => (
          <details>
            <summary>{month} {birthdays[month].length}</summary>
            {birthdays[month].map((bday) => (<h3>{bday.dob} - {bday.name}</h3>))}
          </details>
        ))}
      </div>
    </div>
  );
};

export default Birthdays;
