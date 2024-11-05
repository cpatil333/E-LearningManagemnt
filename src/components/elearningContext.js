import React, { createContext, useContext, useReducer } from "react";

const elearningContext = createContext();

const initialState = {
  users: [],
  courses: [],
  lessons: [],
  quizzes: [],
  questions: [],
  teacherManageStudent: [],
  manageStudentCourse: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        users: state.users.find(
          (user) =>
            user.email === action.payload.email &&
            user.password === action.payload.password
        ),
      };
    case "SETS_USER_COURSE_LIST_BYID":
      return {
        ...state,
        courses: action.payload,
      };
    case "SETS_TAECHERSTUDENTS":
      return {
        ...state,
        teacherManageStudent: action.payload,
      };
    case "ADD_LESSON":
      return {
        ...state,
        lessons: [...state.lessons, action.payload],
      };
    case "UPDATE_LESSON":
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.questionId !== action.payload.questionId
            ? action.payload
            : question
        ),
      };
    case "SETS_QUIZZES":
      return {
        ...state,
        quizzes: action.payload,
      };
    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter(
          (quiz) => quiz.quizId !== action.payload.quizId
        ),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        teacherManageStudent: state.teacherManageStudent.filter(
          (student) => student.userId !== action.payload.id
        ),
      };
    case "SETS_STUDENT_COURSE":
      return {
        ...state,
        manageStudentCourse: action.payload,
      };
    default:
      return state;
  }
};

export const ElearningContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <elearningContext.Provider value={{ state, dispatch }}>
      {children}
    </elearningContext.Provider>
  );
};

export const useElearningContext = () => {
  return useContext(elearningContext);
};
