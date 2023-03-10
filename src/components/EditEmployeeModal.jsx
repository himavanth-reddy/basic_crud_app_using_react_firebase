import { useState } from "react";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { app } from "../utils/firebase-config";
import "../styles/addEmployeeModal.scss";
const EditEmployeeModal = ({
  setEditModal,
  employeeList,
  setData,
  data,
  editId,
}) => {
  const empObj = employeeList.filter((emp) => {
    return emp.id === editId;
  });

  const [name, setName] = useState(empObj[0].name);
  const [email, setEmail] = useState(empObj[0].email);
  const [title, setTitle] = useState(empObj[0].title);
  const [department, setDepartment] = useState(empObj[0].department);
  const [role, setRole] = useState(empObj[0].role);
  const db = getFirestore(app);
  const docRef = doc(db, "employees", editId);

  const obj = {
    id: editId,
    name: name,
    email: email,
    title: title,
    department: department,
    role: role,
  };
  const onEditEmployee = async () => {
    if (name && email && title && department && role) {
      await updateDoc(docRef, obj);
      setEditModal(false);
      setData(!data);
    }
  };
  return (
    <div className="modal-background">
      <div className="model-container">
        <div className="model-header">
          <h2>Edit Employee</h2>
          <p
            onClick={() => {
              setEditModal(false);
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
          <button onClick={onEditEmployee}>Edit Employee</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
