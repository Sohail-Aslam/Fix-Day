import { useState } from 'react';
import { signOut } from 'firebase/auth';
import {
  BrowserRouter, Route, Routes, Link,
} from 'react-router-dom';
import { auth } from './config/firebase';
import SignUp from './components/SignUp';
import './App.css';
import { Todo } from './main-pages/Todo';
import Blogs from './main-pages/Blogs';
import { Read } from './main-pages/Read';
import Login from './main-pages/Login';

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      alert('logout success');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className="main-container">
          <div className={`side-menu ${menuOpen ? 'expanded' : 'collapsed'}`}>
            <p id="left" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
              {menuOpen ? '◀' : '▶'}
            </p>

            {menuOpen && (
              <>
                <div className="pages out">
                  <a onClick={logOut}>Sign Out</a>
                </div>
                <div className="pages">
                  <Link to="/signup">Sign Up</Link>
                </div>
                <div className="pages">
                  <Link to="/login">Log In</Link>
                </div>
                <div className="pages">
                  <Link to="/">Todo</Link>
                </div>
                <div className="pages">
                  <Link to="/read">Read</Link>
                </div>
                <div className="pages">
                  <Link to="/blogs">Blogs</Link>
                </div>
              </>
            )}
          </div>

          <div className="content-container">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Todo />} />
              <Route path="/read" element={<Read />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
