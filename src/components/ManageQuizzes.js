import React, { useEffect, useState } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/CommonStyle.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const ManageQuizzes = () => {
  const { state, dispatch } = useElearningContext();
  const [isModelOpen, setModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [manageQuizzes, seManageQuizzes] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getManageQuizzes();
  });

  const getManageQuizzes = async () => {
    try {
      const url = `https://localhost:44345/api/Quiz/GetQuizzesByTeacher/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();
      if (data !== null) {
        seManageQuizzes(data);
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

  const viewQuestions = (quizId) => {
    // Navigate to questions view or modal for the selected quiz
    console.log("View questions for quiz:", quizId);
    setSelectedQuizId(quizId);
    getQuizQuestions(quizId);
    setIsEditMode(false); // Set to view mode
    setModalOpen(true);
  };

  const getQuizQuestions = async (quizId) => {
    try {
      const response = await fetch(
        `https://localhost:44345/api/Question/GetQuestions/${quizId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        setQuizQuestions(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const editQuiz = (quizId) => {
    // Navigate to edit view for the selected quiz
    console.log("Edit quiz:", quizId);
    setSelectedQuizId(quizId);
    getQuizQuestions(quizId);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const deleteQuiz = async (quizId) => {
    console.log("Delete quiz:", quizId);

    try {
      const response = await fetch(
        `https://localhost:44345/api/Quiz/DeleteQuizById/${quizId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.StatusCode === 200) {
        dispatch({
          type: "DELETE_QUIZ",
          payload: quizId, // Remove quiz from state
        });
      } else {
        console.log("Error:", data.Message);
      }
    } catch (error) {
      console.log("Error deleting quiz:", error);
    }
  };

  const handleQuestionChange = (index, newText) => {
    setQuizQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, questionText: newText } : q
      )
    );
  };

  const saveQuizQuestions = async () => {
    // Send the updated `quizQuestions` to the backend API
    console.log("Saving updated questions:", quizQuestions);
    // Call your API here to save the changes
    try {
      const response = await fetch(
        "https://localhost:44345/api/Question/UpdateQuestion",
        {
          method: "PUT",
          body: JSON.stringify(quizQuestions),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrected "Authorization" header
          },
        }
      );
      const data = await response.json();
      if (data && data.StatusCode === 200) {
        dispatch({
          type: "UPDATE_LESSON",
          payload: data.data,
        });
      } else {
        console.log("Failed to save questions:", data.Message);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
    setModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <div className="action-bar">
          <button className="btn-back" onClick={handleDashboard}>
            Dashboard
          </button>
          <button className="btn-add">
            <Link
              to={"/add-course"}
              style={{ color: "white", textDecoration: "none" }}
            >
              Add New Quizzes
            </Link>
          </button>
        </div>
        {manageQuizzes.length > 0 ? ( // Check for quizzes
          <table>
            <thead>
              <tr>
                <th>Quiz ID</th>
                <th>Title</th>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {manageQuizzes.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.quizId}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.course ? quiz.course.title : "No Course"}</td>{" "}
                  {/* Accessing course title */}
                  <td>
                    <button
                      onClick={() => viewQuestions(quiz.quizId)}
                      className="btn-edit"
                    >
                      View Questions
                    </button>
                    <button
                      onClick={() => editQuiz(quiz.quizId)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuiz(quiz.quizId)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                    {isModelOpen && (
                      <Modal
                        isOpen={isModelOpen}
                        onClose={() => setModalOpen(false)}
                      >
                        <h2>
                          {isEditMode ? "Edit Quiz Question" : "Quiz Question"}
                        </h2>
                        <p>
                          {isEditMode
                            ? "Edit the Questions below"
                            : "Here are the questions for the selected quiz..."}
                        </p>
                        <table>
                          <tbody>
                            {quizQuestions.map((question, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td style={{ textAlign: "left" }}>
                                  {isEditMode ? (
                                    <input
                                      type="text"
                                      value={question.questionText}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    />
                                  ) : (
                                    question.questionText
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                        {isEditMode && (
                          <button
                            onClick={saveQuizQuestions}
                            className="btn-edit"
                          >
                            Save Changes
                          </button> // Button for saving changes
                        )}
                      </Modal>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default ManageQuizzes;
