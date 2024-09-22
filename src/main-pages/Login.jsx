import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { auth } from '../config/firebase'; // Ensure this path is correct

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSingIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      alert('login success');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#969393',
        flexDirection: 'column',
        position: ' absolte',
        width: '300px',
        height: '400px',
        gap: '15px',
        padding: '20px',
        alignItems: 'center',
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
      <button type="button" className="btn" onClick={handleSingIn}>
        LogIn
      </button>
      <p>
        Dont have account
        {' '}
        <Link to="/signup"> SignUp </Link>
      </p>
    </div>
  );
}
