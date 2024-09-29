/* eslint-disable */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSinupUp = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup success");
      navigate("/");
      setError("");
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

  console.log(auth.currentuser);

  return (
    <div
      style={{
        backgroundColor: "#969393",
        display: "flex",
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

      <button type="button" className="btn" onClick={handleSinupUp}>
        Sign Up
      </button>
      <p>
        Already have <a href="/login">Login</a>
      </p>
    </div>
  );
}
