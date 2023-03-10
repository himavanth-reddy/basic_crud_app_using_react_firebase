import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../utils/firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import "../styles/addEmployeeModal.scss";
const AddEmployeeModal = ({ setAddModal, setData, data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const database = getFirestore(app);
  const collectionRef = collection(database, "employees");
  const auth = getAuth();
  const user = auth.currentUser.uid;
  const obj = {
    name: name,
    email: email,
    title: title,
    department: department,
    role: role,
    userId: user,
  };
  const onAddEmployee = async () => {
    if (name && email && title && department && role) {
      await addDoc(collectionRef, obj);
      setAddModal(false);
      setData(!data);
    }
  };
  return (
    <div className="modal-background">
      <div className="model-container">
        <div className="model-header">
          <h2>Add Employee</h2>
          <p
            onClick={() => {
              setAddModal(false);
            }}
          >
            X
          </p>
        </div>
        <div className="form-container">
          <form action="" className="addemployeeform">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              value={department}
            />
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              value={role}
            />
          </form>
          <button onClick={onAddEmployee}>Add Employee</button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
