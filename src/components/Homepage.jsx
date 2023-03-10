import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase-config";

import { getAuth } from "firebase/auth";
import EmployeeTableComponent from "./EmployeeTableComponent";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import "../styles/homepage.scss";
const Homepage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  let displayName;
  let uid;
  if (user !== null) {
    displayName = user.displayName;
    uid = user.uid;
  }
  useEffect(() => {
    const getColections = async () => {
      const querySnapshot = await getDocs(collection(db, "employees"));
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setEmployeeList(list);
    };
    getColections();
  }, [db, data]);
  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="Home-container">
      <div className="header">
        <h1>Welcome back, {user ? displayName : null}</h1>
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <div className="dashboard">
        <div>
          <h2>Employees</h2>
          <p>
            A list of all the employess in your company including their names,
            title, email, department and role
          </p>
        </div>
        <button
          onClick={() => {
            setAddModal(true);
          }}
        >
          Add Employee
        </button>
      </div>
      {addModal ? (
        <AddEmployeeModal
          setAddModal={setAddModal}
          setData={setData}
          data={data}
        />
      ) : null}
      {editModal ? (
        <EditEmployeeModal
          setEditModal={setEditModal}
          setEmployeeList={setEmployeeList}
          employeeList={employeeList}
          editId={editId}
          setData={setData}
          data={data}
          uid={uid}
        />
      ) : null}
      <div className="list-container">
        <EmployeeTableComponent
          employeeList={employeeList}
          setEditModal={setEditModal}
          setEditId={setEditId}
          setData={setData}
          data={data}
        />
      </div>
    </div>
  );
};

export default Homepage;
