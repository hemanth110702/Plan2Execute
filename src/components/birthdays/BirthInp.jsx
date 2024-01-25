const BirthInp = ({
  name,
  description,
  dob,
  setName,
  setDob,
  setDescription,
  addDob,
}) => {
  return (
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
  );
};

export default BirthInp;
