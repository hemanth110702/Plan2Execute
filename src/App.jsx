import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase/config";
import Plans from "./components/Plans";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(auth?.currentUser?.displayName);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser} />} />
      <Route path="/:id" element={<Plans user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
