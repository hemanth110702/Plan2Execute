import React from 'react'

const CreatePlan = () => {
  return (
    <form action="#">
      Display Name:
      <input type="text" placeholder="Name" /> <br />
      Display Content: <textarea placeholder="Plan...."></textarea>
      <br />
      Start Date:
      <input type="date" />
      <br />
      Start Time: <input type="time" />
      <br />
      End Time: <input type="time" />
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
        <input type="radio" name="eventType" value="Other" />
        Other
      </label>
    </form>
  );
}

export default CreatePlan