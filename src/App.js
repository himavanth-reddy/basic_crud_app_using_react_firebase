import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  let authSessionToken = sessionStorage.getItem("Auth Token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authSessionToken={authSessionToken} route={"home"}>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute authSessionToken={authSessionToken} route={"login"}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute authSessionToken={authSessionToken} route={"signup"}>
            <Signup />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
