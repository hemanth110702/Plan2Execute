import { useEffect, useState } from "react";

const Analysis = ({ plans, birthdays, notes }) => {
  const [dobCounter, setDobCounter] = useState(0);
  const [notesCounter, setNotesCounter] = useState(0);
  const countBirthdays = () => {
    let dobCount = 0;
    for (const val of Object.values(birthdays)) {
      dobCount += val.length;
    }
    return dobCount;
  };
  const countNotes = () => {
     return Object.keys(notes).length
  };
  useEffect(() => {
    setDobCounter(() => countBirthdays());
    setNotesCounter(()=>countNotes());
  });
  return (
    <div>
      <h1>Analysis</h1>
      birthdays: {dobCounter} <br />
      notes: {notesCounter} <br />
    </div>
  );
};

export default Analysis;
