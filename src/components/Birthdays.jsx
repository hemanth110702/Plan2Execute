import React, { useEffect, useState } from "react";
import { months } from "../staticData/CalenderCollection";

const Birthdays = () => {
  const [birthdays, setBirthdays] = useState({
    "January": [],
    "February": [],
    "March": [],
    "April": [],
    "May": [],
    "June": [],
    "July": [],
    "August": [],
    "September": [],
    "October": [],
    "November": [],
    "December": [],
  });

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("")

  useEffect(()=>{
    console.log(birthdays);

  }, [birthdays])

const addDob = (e) => {
  e.preventDefault();
  const dobId = Date.now();
  const monthName = months[Number(dob[5] + dob[6]) - 1];
  const updateDob = Array.isArray(birthdays[monthName])
    ? [...birthdays[monthName], { dobId, name, dob, description }]
    : [{ name, dob }];

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
        />{" "}<br />
        Description: <textarea name="des" id="" cols="30" rows="10" value={description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea>
        <button onClick={addDob}>add</button>
      </form>
      <div><h1>Birthdays today</h1> </div>
      <div><h1>Birthdays in present month</h1> </div>
      <div><h1>All Birthdays</h1> </div>

    </div>
  );
};

export default Birthdays;
