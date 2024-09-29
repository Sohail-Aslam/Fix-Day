/* eslint-disable */
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../config/firebase"; // Ensure this path is correct

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSingIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/admin-restricted-operation":
          setError("This operation is restricted to administrators only.");
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#969393",
        flexDirection: "column",
        position: " absolte",
        width: "300px",
        height: "400px",
        gap: "15px",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="button" className="btn" onClick={handleSingIn}>
        LogIn
      </button>
      <p>
        Dont have account <Link to="/signup"> SignUp </Link>
      </p>
    </div>
  );
}
