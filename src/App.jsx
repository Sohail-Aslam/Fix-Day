/* eslint-disable */
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { IoReader } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { auth } from "./config/firebase";
import SignUp from "./components/SignUp";
import "./App.css";
import { Todo } from "./main-pages/Todo";
import Blogs from "./main-pages/Blogs";
import Read from "./main-pages/Read";
import Login from "./main-pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      alert("Logout success");
      setUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <BrowserRouter className="mai">
      {!user ? (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="main grid-container">
          <div
            className="side-menu item1"
            style={{ width: isOpen ? "200px" : "45px" }}
          >
            <p
              className="collaspe"
              data-tip={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              id="left"
              onClick={toggle}
              style={{ cursor: "pointer" }}
            >
              {isOpen ? (
                <TbLayoutSidebarLeftCollapseFilled />
              ) : (
                <TbLayoutSidebarRightCollapseFilled />
              )}
            </p>

            <Link to="/">
              <div data-tooltip-id="my-tooltip-3" className="pages hover">
                <div className="pages ">
                  <LuListTodo />
                  <div
                    className="title"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    Todo
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/read">
              <div data-tooltip-id="my-tooltip-2" className="pages hover">
                <div className="pages ">
                  <IoReader />
                  <div
                    className="title"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    Read
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/blogs">
              <div data-tooltip-id="my-tooltip-1" className="pages hover">
                <div className="pages ">
                  <FaPencilAlt className="icon" />
                  <div
                    className="title"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    Blogs
                  </div>
                </div>
              </div>
            </Link>
            <div />
            <div className="out" style={{ left: isOpen ? "160px" : "10px" }}>
              <a onClick={logOut}>
                <IoMdLogOut data-tooltip-id="my-tooltip-4" className="logout" />
              </a>
            </div>
          </div>
          <div style={{ marginLeft: isOpen ? "250px" : "100px" }}>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Todo />} />
              <Route path="/read" element={<Read />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
          </div>
        </div>
      )}

      {/* Content Container for authenticated pages */}
      <ReactTooltip id="my-tooltip-1" place="bottom" content="Write Blogs" />
      <ReactTooltip
        id="my-tooltip-2"
        place="bottom"
        content="Read Your Blog Articles"
      />
      <ReactTooltip
        id="my-tooltip-3"
        place="bottom"
        content="Daily Todo List "
      />
      <ReactTooltip id="my-tooltip-4" place="bottom" content="Log Out" />
    </BrowserRouter>
  );
}

export default App;
