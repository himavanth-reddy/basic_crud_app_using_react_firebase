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
          <ProtectedRoute authSessionToken={authSessionToken}>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
