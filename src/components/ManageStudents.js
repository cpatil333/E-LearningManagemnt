import React, { useState, useEffect } from "react";
import "../styles/CommonStyle.css";
import { useElearningContext } from "./elearningContext";
import { Link, useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const { state, dispatch } = useElearningContext();
  const [manageStudent, seManageStudent] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getManageStudents();
  });

  const getManageStudents = async () => {
    try {
      const url = `https://localhost:44345/api/Student/GetStudentsByTeacherId/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();

      if (data !== null) {
        seManageStudent(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard", {
      state: { user: { fullName: fullName, role: role } },
    });
  };

  const handleStudentDelete = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:44345/api/Student/DeleteUserById/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        dispatch({
          type: "DELETE_STUDENT",
          payload: id,
        });
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <div className="action-bar">
          <button className="btn-back" onClick={handleDashboard}>
            Dashboard
          </button>
          <Link
            to={"/add-student"}
            className="btn-add"
            style={{ textDecoration: "none" }}
          >
            Add Student
          </Link>
        </div>
        {manageStudent.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {manageStudent.map((student) => (
                <tr key={student.userId}>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>
                    {new Date(student.dateJoined).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <td>
                      <Link
                        to={"/update-student/" + student.userId}
                        className="btn-edit"
                        style={{ textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={() => handleStudentDelete(student.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Student's Data available</p>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
