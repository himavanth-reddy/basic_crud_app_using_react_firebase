import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import "../styles/login.scss";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSignup = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        setCurrentUser(auth.currentUser.uid);
        console.log(currentUser);
        navigate("/");
      })

      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast.error("Wrong Password", {
            position: "bottom-center",
          });
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found", {
            position: "bottom-center",
          });
        }
      });
  };
  return (
    <div className="container">
      <div className="login-container">
        <h1>Log in</h1>
        <div className="form-container">
          <form action="" className="login-form">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              name=""
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <button onClick={handleSignup}>Login</button>
          </form>
          <Toaster />
          <p>Dont have an account click below</p>
          <button>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
