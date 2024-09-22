import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config/firebase';

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSinupUp = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup success');
    } catch (err) {
      alert(err);
    }
  };

  console.log(auth.currentuser);

  return (
    <div
      style={{
        backgroundColor: '#969393',
        display: 'flex',
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
      <button type="button" className="btn" onClick={handleSinupUp}>
        Sign Up
      </button>
      <p>
        Already have
        {' '}
        <a href="/login">Login</a>
      </p>
    </div>
  );
}
