import { useEffect, useState } from "react";

const Analysis = ({ plans, birthdays, notes }) => {
  const [dobCounter, setDobCounter] = useState(0)
  const countBirthdays = () => {
    let dobCount = 0;
    for (const val of Object.values(birthdays)) {
      dobCount += val.length;
    }
    return dobCount;
  };
  useEffect(()=>{
    setDobCounter(()=>countBirthdays());
  })
  return (
    <div>
      <h1>Analysis</h1>
      birthdays: {dobCounter} <br />
    </div>
  );
};

export default Analysis;
