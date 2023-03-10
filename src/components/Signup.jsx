import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../utils/firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "../styles/signup.scss";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const database = getFirestore(app);
  const collectionRef = collection(database, "users");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        await addDoc(collectionRef, {
          userId: userCredential.user.uid,
          email: email,
          name: name,
        });
        toast.success("Sucess Navigating to Home", {
          position: "bottom-center",
        });
        navigate("/");
      } catch (error) {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use", {
            position: "bottom-center",
          });
        } else {
          toast.error("Something went error", {
            position: "bottom-center",
          });
        }
      }
    } else {
      toast.error("Fill all required fields", {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className="container">
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="form-container">
          <form action="" className="login-form">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name=""
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name=""
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <Toaster />
          </form>

          <p>Already have an account</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
