import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatedSurvey from "./created-surveys";
import MySurveys from "./my-surveys";
import ResponseSurvey from "./my-surveys/ResponseSurvey";
import Survey from "./my-surveys/Survey";
import NewSurvey from "./new-survey";
import "./new-survey/questionForm.css";

function SurveyRouter() {
  return (
    <>
      <Routes>
        <Route path="/new-survey" element={<NewSurvey />} />
        <Route path="/my-surveys/" element={<MySurveys />} />
        <Route path="/created-surveys" element={<CreatedSurvey />} />
        {/* <Route path="/my-surveys/one" element={<SingleSurvey />} /> */}
        <Route path="/created-surveys/edit/:id" element={<NewSurvey />} />
        <Route path="/submit/survey/:id/:assigneeId" element={<Survey />} />
        <Route
          path="/assignee/response/:id/:assigneeId"
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

export default SurveyRouter;
