import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, onIdTokenChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import Home from "./components/Home";
import Plans from "./components/plans/Plans";
import History from "./components/History";
import Birthdays from "./components/birthdays/Birthdays";
import Notes from "./components/Notes";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Analysis from "./components/Analysis";
import "./App.css";
import Feedback from "./components/feedback";

function App() {
  const [plans, setPlans] = useState({});
  const [notes, setNotes] = useState({});
  const [birthdays, setBirthdays] = useState({
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  });

  const p2eCollectionRef = collection(db, "p2eData");
  const [user, setUser] = useState(auth?.currentUser?.displayName);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      if (user) {
        const userDataRef = doc(p2eCollectionRef, user);
        const docSnapshot = await getDocs(userDataRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setPlans(userData?.plans || plans);
          setNotes(userData?.notes || notes);
          setBirthdays(userData?.birthdays || birthdays);
        } else {
          await setDoc(userDataRef, {
            plans,
            notes,
            birthdays,
          });
        }
      }
    } catch (err) {
      console.error("Error getting data: ", err);
    }
  };

  const updateFirebaseData = async () => {
    try {
      if (user) {
        const userDataRef = doc(p2eCollectionRef, user);
        const docSnapshot = await getDocs(userDataRef);

        if (docSnapshot.exists()) {
          await updateDoc(userDataRef, {
            plans,
            notes,
            birthdays,
          });
        } else {
          console.error(
            "User data not found. Document should exist at this point."
          );
        }
      } else {
        console.error("Invalid user path for updating data");
      }
    } catch (err) {
      console.error("Error updating data: ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateFirebaseData();
  }, [plans, birthdays, notes]);

  // navigate to home, when user logout
  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not logged in
        navigate("/");
        setUser(null);
      } else {
        // User is logged in
        setUser(user.displayName);

        const unsubscribeIdTokenChanged = onIdTokenChanged(
          auth,
          async (newUser) => {
            if (!newUser) {
              // Token expired or user logged out
              navigate("/");
              setUser(null);
            } else {
              // Token refreshed, or new user logged in
              setUser(newUser.displayName);
              // You might want to re-fetch user-specific data here if needed
              getData();
            }
          }
        );

        return () => {
          // Clean up the onIdTokenChanged listener when the component unmounts
          unsubscribeIdTokenChanged();
        };
      }
    });

    return () => {
      // Clean up the onAuthStateChanged listener when the component unmounts
      unsubscribeAuthState();
    };
  }, [navigate, setUser, getData]);

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

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && (
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
            <p>
              <NavLink
                to={`/${user}/analysis`}
                style={({ isActive }) => {
                  return isActive ? activateLink : {};
                }}
              >
                Analysis
              </NavLink>
            </p>
            <p>
              <NavLink
                to={`/${user}/feedback`}
                style={({ isActive }) => {
                  return isActive ? activateLink : {};
                }}
              >
                Feedback
              </NavLink>
            </p>
          </div>
          <div className="nav-user">
            <h3>{user}</h3>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/:id">
          <Route
            path="plans"
            element={
              <Plans
                user={user}
                setUser={setUser}
                plans={plans}
                setPlans={setPlans}
              />
            }
          />
          <Route path="history" element={<History plans={plans} />} />
          <Route
            path="birthdays"
            element={
              <Birthdays birthdays={birthdays} setBirthdays={setBirthdays} />
            }
          />
          <Route
            path="notes"
            element={<Notes notes={notes} setNotes={setNotes} />}
          />
          <Route path="analysis" element={<Analysis />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
