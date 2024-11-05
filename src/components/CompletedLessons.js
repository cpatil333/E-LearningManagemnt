import React, { useEffect, useState } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";

const CompletedLessons = () => {
  const { state, dispatch } = useElearningContext();
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getCompletedLessons();
  });

  const getCompletedLessons = async () => {
    try {
      const url = `https://localhost:44345/api/Lesson/GetCompletedLessons/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        setCompletedLessons(data);;
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

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <div className="action-bar">
          <button className="btn-back" onClick={handleDashboard}>
            Dashboard
          </button>
        </div>
        {completedLessons.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Course Nmae</th>
                <th>Completion Date</th>
              </tr>
            </thead>
            <tbody>
              {completedLessons.map((lesson) => (
                <tr key={lesson.lessonId}>
                  <td style={{ textAlign: "left" }}>{lesson.title}</td>
                  <td style={{ textAlign: "left" }}>{new Date(lesson.completionDate).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses available for you!</p>
        )}
      </div>
    </div>
  );
};

export default CompletedLessons