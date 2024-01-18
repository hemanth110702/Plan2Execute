import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const timeRemaining = getTimeRemaining();

    // Check if time is already zero or negative
    if (
      timeRemaining.hours <= 0 &&
      timeRemaining.minutes <= 0 &&
      timeRemaining.seconds <= 0
    ) {
      return; // Don't set up interval if time is already zero or negative
    }

    // Set up interval
    const timer = setInterval(() => {
      const newTimeRemaining = getTimeRemaining();
      setTimeRemaining(newTimeRemaining);

      // Check if time has reached zero
      if (
        newTimeRemaining.hours <= 0 &&
        newTimeRemaining.minutes <= 0 &&
        newTimeRemaining.seconds <= 0
      ) {
        clearInterval(timer); // Clear the interval if time has reached zero
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures the effect runs only once

  function getTimeRemaining() {
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();

    const [startHour, startMinute] = startTime.split(":").map(Number);
    startDate.setHours(startHour, startMinute, 0, 0);

    const [endHour, endMinute] = endTime.split(":").map(Number);
    endDate.setHours(endHour, endMinute, 0, 0);

    let timeRemaining;

    if (now < startDate) {
      timeRemaining = startDate - now;
    } else if (now > endDate) {
      timeRemaining = 0;
    } else {
      timeRemaining = endDate - now;
    }

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <div>
      <h2>Countdown Timer</h2>
      <p>{(timeRemaining.hours || timeRemaining.minutes || timeRemaining.seconds)? `${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`: "Event Time Ended"}</p>
    </div>
  );
};

export default CountdownTimer;
