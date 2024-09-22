import React, { useEffect, useState } from 'react';
import {
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

export function Todo() {
  const [todo, setTodo] = useState([]);
  const [add, setAdd] = useState('');
  const [complete, setComplete] = useState(false);
  const [updateTask, setUpdateTask] = useState('');

  const todoTasks = collection(db, 'Tasks');

  const getTodoList = async () => {
    try {
      const data = await getDocs(todoTasks);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodo(filteredData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const handleSubmit = async () => {
    try {
      await addDoc(todoTasks, {
        todo: add,
        complete,
      });
      setAdd('');
      getTodoList();
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (id) => {
    const todoDoc = doc(db, 'Tasks', id);
    await deleteDoc(todoDoc);
    getTodoList();
  };

  const handleUpdate = async (id) => {
    const todoDoc = doc(db, 'Tasks', id);
    await updateDoc(todoDoc, { todo: updateTask });
    getTodoList();
    setUpdateTask('');
  };

  const handleChecked = async (id, isComplete) => {
    const todoDoc = doc(db, 'Tasks', id);
    await updateDoc(todoDoc, { complete: isComplete });
    getTodoList();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        minWidth: '500px',
        height: '700px',
        overflow: 'auto',
        padding: '20px',
        alignItems: 'center',
      }}
    >
      <input
        className="todo"
        type="text"
        placeholder="What's in your mind... 🧠"
        value={add}
        onChange={(e) => setAdd(e.target.value)}
      />

      <button className="btn" onClick={handleSubmit}>
        Add Task
      </button>

      <div className="tasks">
        {todo.length > 0 ? (
          todo.map((Tasks, index) => (
            <div className="task-card" key={index}>
              <h2
                style={{
                  textDecoration: Tasks.complete ? 'line-through' : 'none',
                }}
              >
                {Tasks.todo}
              </h2>

              <div className="checkbox-wrapper-61">
                <input
                  type="checkbox"
                  className="check"
                  id={`check-${Tasks.id}`}
                  checked={Tasks.complete}
                  onChange={() => handleChecked(Tasks.id, !Tasks.complete)}
                />
                <label htmlFor={`check-${Tasks.id}`} className="label">
                  <svg width="45" height="45" viewBox="0 0 95 95">
                    <rect
                      x="30"
                      y="20"
                      width="50"
                      height="50"
                      stroke="black"
                      fill="none"
                    />
                    <g transform="translate(0,-952.36222)">
                      <path
                        d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                        className="path1"
                      />
                    </g>
                  </svg>
                </label>
              </div>

              <input
                type="text"
                style={{ marginLeft: '5px' }}
                placeholder="Update Task"
                onChange={(e) => setUpdateTask(e.target.value)}
              />
              <button className="btn" onClick={() => handleUpdate(Tasks.id)}>
                Update
              </button>
              <button className="btn" onClick={() => handleDelete(Tasks.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <style>
        {`
          .checkbox-wrapper-61 input[type="checkbox"] {
            visibility: hidden;
            display: none;
          }

          .checkbox-wrapper-61 * {
            box-sizing: border-box;
          }

          .checkbox-wrapper-61 {
            position: relative;
            display: block;
            overflow: hidden;
          }

          .checkbox-wrapper-61 .check {
            width: 50px;
            height: 50px;
            position: absolute;
            opacity: 0;
          }

          .checkbox-wrapper-61 .label svg {
            vertical-align: middle;
          }

          .checkbox-wrapper-61 .path1 {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            transition: .5s stroke-dashoffset;
            opacity: 0;
          }

          .checkbox-wrapper-61 .check:checked + label svg g path {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
