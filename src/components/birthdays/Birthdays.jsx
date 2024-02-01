import React, { useEffect, useState } from "react";
import { months } from "../../staticData/CalenderCollection";
import BirthInp from "./BirthInp";

const Birthdays = ({birthdays, setBirthdays}) => {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [presentBds, setPresentBds] = useState([]);
  const [monthlyBds, setMonthlyBds] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState(null);

  useEffect(() => {
    const today = new Date();
    const monthInd = today.getMonth();
    const year = today.getFullYear();
    const month = months[monthInd];
    const day = today.getDate();
    const presentDate = `${year}-${(monthInd + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      if(birthdays[month]) {
        const tempMonthlyBds = birthdays[month].filter(
          (dobs) => dobs.dob > presentDate
        );
        setMonthlyBds(tempMonthlyBds);
        const tempPresentBds = birthdays[month].filter(
          (dobs) => dobs.dob === presentDate
        );
        setPresentBds(tempPresentBds);
      }
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

  const deleteDob = (bday, month) => {
    const bdayMonth = birthdays[month];
    let deleteIndex;
    for (let i = 0; i < bdayMonth.length; i++) {
      if (bdayMonth[i].dobId === bday.dobId) {
        deleteIndex = i;
      }
    }
    bdayMonth.splice(deleteIndex, 1);
    setBirthdays((prevDobs) => ({ ...prevDobs, [month]: bdayMonth }));
  };

  const editDob = (bday, month) => {
    setEditingBirthday(bday.dobId);
    setShowEdit(true);
    setDescription(bday.description);
    setName(bday.name);
    setDob(bday.dob);
  };

  const updateDob = (bday, month) => {
    console.log("before", birthdays);
    const tempMobs = birthdays[month];
    const updatedDob = { name, dob, description };
    console.log(bday, month, tempMobs, updatedDob);
    for (let i = 0; i < tempMobs.length; i++) {
      if (bday.dobId === tempMobs[i].dobId) {
        tempMobs[i] = { ...tempMobs[i], ...updatedDob };
        break;
      }
    }
    console.log(tempMobs);
    setBirthdays((prevBds) => ({ ...prevBds, [month]: tempMobs }));
    console.log("after", birthdays);
    setShowEdit(false);
  };

  return (
    <div>
      <BirthInp
        name={name}
        setName={setName}
        dob={dob}
        setDob={setDob}
        description={description}
        setDescription={setDescription}
        addDob={addDob}
      />
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
            <summary>
              {month} {birthdays[month]?.length}
            </summary>
            { birthdays && birthdays[month] &&  birthdays[month].map((bday) => (
              <div>
                {bday.dob} - {bday.name}
                <button
                  onClick={() => {
                    editDob(bday, month);
                  }}
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    deleteDob(bday, month);
                  }}
                >
                  del
                </button>
                {editingBirthday === bday.dobId && showEdit && (
                  <div>
                    Name:{" "}
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />{" "}
                    <br />
                    dob:{" "}
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />{" "}
                    <br />
                    Description:
                    <textarea
                      name="des"
                      id=""
                      cols="30"
                      rows="10"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>{" "}
                    <br />
                    <button onClick={() => updateDob(bday, month)}>
                      update
                    </button>
                  </div>
                )}
              </div>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
};

export default Birthdays;
