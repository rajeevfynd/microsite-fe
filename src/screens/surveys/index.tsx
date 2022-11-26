import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MySurveys from "./my-surveys";
import ResponseSurvey from "./my-surveys/views/ResponseSurvey";
import Survey from "./my-surveys/views/Survey";
import SurveyDashBoard from "./survey-dash-board";
import "./new-survey/views/questionForm.css";

function Surveys() {
  return (
    <>
      <Routes>
        <Route path="/my-surveys/" element={<MySurveys />} />
        <Route
          path="/submit/survey/:surveyId/:assigneeId"
          element={<Survey />}
        />
        <Route path="/survey/dash-board" element={<SurveyDashBoard />} />
        <Route
          path="/assignee/response/:surveyId/:assigneeId"
          element={<ResponseSurvey />}
        />
        <Route
          path="*"
          element={<Navigate replace to="/survey/my-surveys/" />}
        ></Route>
      </Routes>
    </>
  );
}

export default Surveys;
