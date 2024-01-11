import { useState } from "react";
import { auth } from "./firebase/config";
import "./App.css";
import Plans from "./components/Plans";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {

  const [user, setUser] = useState(auth?.currentUser?.displayName);
  console.log(auth?.currentUser?.email);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser} />} />
      <Route path="/:id" element={<Plans user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
