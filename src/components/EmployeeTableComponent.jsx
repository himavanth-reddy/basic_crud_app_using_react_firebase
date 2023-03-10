import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../utils/firebase-config";
import "../styles/employeetable.scss";
const EmployeeTableComponent = ({
  employeeList,
  setEditModal,
  setEditId,
  setData,
  data,
}) => {
  const db = getFirestore(app);

  const renderRows = (employeeList) => {
    const ondelete = async (id) => {
      const docRef = doc(db, "employees", id);
      await deleteDoc(docRef);
      setData(!data);

      //const updatedList = employeeList.filter((employee) => employee.id !== id);

      //setEmployeeList(updatedList);
    };
    const onEdit = (id) => {
      setEditId(id);
      setEditModal(true);
    };
    return employeeList.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td>{item.email}</td>
          <td>{item.department}</td>
          <td>{item.role}</td>
          <td className="buttons">
            <button
              onClick={() => {
                onEdit(item.id);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                ondelete(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="table-container">
      <table
        className="employee-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">{renderRows(employeeList)}</tbody>
      </table>
    </div>
  );
};

export default EmployeeTableComponent;
