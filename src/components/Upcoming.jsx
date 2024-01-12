import React from "react";

const Upcoming = () => {
  /*   useEffect(() => {
    console.log(plans);
    const unsortedArray = Object.entries(plans);
    const sortedArray = unsortedArray.sort(
      ([a], [b]) => new Date(a) - new Date(b)
    );
    const sortedObject = Object.fromEntries(sortedArray);
    setPlans(sortedObject);
  },[]); */

  return (
    <div className="upcoming-container">
      <h1>Upcoming</h1>
    </div>
  );
};

export default Upcoming;
