import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Website from "./website";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/build" element={<Website />} />
      </Routes>
    </div>
  );
}

export default App;
