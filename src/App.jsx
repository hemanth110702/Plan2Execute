import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import Home from "./components/Home";
import Plans from "./components/Plans";
import History from "./components/History";
import Birthdays from "./components/Birthdays";
import Notes from "./components/Notes";
import "./App.css";

function App() {
  const [user, setUser] = useState(auth?.currentUser?.displayName);
  const navigate = useNavigate();
  // navigate to home, when user logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  const logout = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("logout error: ", err);
    }
    setUser(auth?.currentUser?.displayName);
  };

  const activateLink = {
    backgroundColor: "red", 
    color: "yellow", 
  };


  return (
    <>
      <nav className="nav-bar">
        <h1>Plan2Execute</h1>

        <div className="nav-sections">
          <p>
            {" "}
            <NavLink
              to={`/${user}/plans`}
              style={({ isActive }) => {
                return isActive ? activateLink : {};
              }}
            >
              {" "}
              plans{" "}
            </NavLink>
          </p>
          <p>
            {" "}
            <NavLink
              to={`/${user}/history`}
              style={({ isActive }) => {
                return isActive ? activateLink : {};
              }}
            >
              {" "}
              History{" "}
            </NavLink>
          </p>
          <p>
            {" "}
            <NavLink
              to={`/${user}/birthdays`}
              style={({ isActive }) => {
                return isActive ? activateLink : {};
              }}
            >
              Birthdays
            </NavLink>
          </p>
          <p>
            <NavLink
              to={`/${user}/notes`}
              style={({ isActive }) => {
                return isActive ? activateLink : {};
              }}
            >
              Notes
            </NavLink>
          </p>
        </div>
        <div className="nav-user">
          <h3>{user}</h3>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/:id">
          <Route
            path="plans"
            element={<Plans user={user} setUser={setUser} />}
          />
          <Route path="history" element={<History />} />
          <Route path="birthdays" element={<Birthdays />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
