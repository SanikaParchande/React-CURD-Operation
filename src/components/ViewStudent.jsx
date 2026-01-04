import { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewStudent() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getAllStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5308/Student/get");
      if (res.data.status) {
        console.log(res.data);
        setStudents(res.data.data);
      } else {
        toast.error("Failed to load students");
      }
    } catch (err) {
      toast.error("Internal error");
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    const toastId = toast.loading("Deleting student...");
    try {
      const res = await axios.delete(`http://localhost:5308/Student/delete/${id}`);
      const resData = res.data;

      if (resData.status) {
        toast.success(resData.message, { id: toastId });
        getAllStudent();
      } else {
        toast.error(resData.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting student", { id: toastId });
      console.error(err);
    }
  };

  const onUpdateClick = (student) => {
    navigate(`/update-student/${encodeURIComponent(JSON.stringify(student))}`);
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <div className="user-form">
        <div className="title">
          <h2>View Students</h2>
        </div>

        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "gray", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Email</th>
              <th>Mobile</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>
                    {student.firstName} {student.middleName || ""} {student.lastName}
                  </td>
                  <td>{student.gender}</td>
                  <td>{student.department}</td>
                  <td>{student.emailAddress}</td>
                  <td>{student.mobileNo}</td>
                  <td>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => onUpdateClick(student)}
                      className="btn-update"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
