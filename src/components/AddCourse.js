import React, { useEffect, useState } from "react";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";
import { useElearningContext } from "./elearningContext";

const AddCourse = () => {
  const { state, dispatch } = useElearningContext();

  const userId = localStorage.getItem("userId");
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    teacherId: userId,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://localhost:44345/api/Course/AddNewCourse",
        {
          method: "POST",
          body: JSON.stringify(inputValue),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data !== null) {
        const userId = localStorage.getItem("userId");
        const responseCourse = await fetch(
          `https://localhost:44345/api/Course/GetCourses/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataCourse = await responseCourse.json();
        dispatch({
          type: "SETS_USER_COURSE_LIST_BYID",
          payload: dataCourse,
        });
        navigate("/TeacherCourseList");
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
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Course Name</label>
            <input
              type="text"
              placeholder="Enter Course Name"
              name="title"
              value={inputValue.title}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter Course Description"
              name="description"
              value={inputValue.description}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <button className="btn-submt">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
