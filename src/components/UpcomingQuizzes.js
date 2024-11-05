import React, { useState, useEffect } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";

const UpcomingQuizzes = () => {
  const { state, dispatch } = useElearningContext();
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUpcomingQuizzes();
    }
  }); // Empty dependency array ensures this runs only on mount

  const getUpcomingQuizzes = async () => {
    try {
      const url = `https://localhost:44345/api/Quiz/GetUpcomingQuizzes/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();
      if (data !== null) {
        setUpcomingQuizzes(data);
        setLoading(false);
      } else {
        console.log("Something went wrong");
        setError(false);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      setError(false);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard", {
      state: { user: { fullName: fullName, role: role } },
    });
  };
  
  if (loading) return <p>Loading upcoming quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <div className="action-bar">
          <button className="btn-back" onClick={handleDashboard}>
            Dashboard
          </button>
        </div>
        {upcomingQuizzes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Quizzes Nmae</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {upcomingQuizzes.map((quiz) => (
                <tr key={quiz.quizId}>
                  <td style={{ textAlign: "left" }}>{quiz.title}</td>
                  <td style={{ textAlign: "left" }}>
                    {new Date(quiz.dateCreated).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
            <p>No upcoming quizzes found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingQuizzes;
