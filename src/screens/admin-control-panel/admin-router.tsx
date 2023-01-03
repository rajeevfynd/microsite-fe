import * as React from "react";
import EditCarousal from "./edit-carousel";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminInduction } from "./induction";
import { AdminJourneyList } from "./journeys";
import { AdminProgramList } from "./programs";
import { AddAnnouncement } from "./manage-announcements";
import { NewProgram } from "./programs/views/new-program";
import { NewJourney } from "./journeys/views/new-jounrey";
import { EditJourney } from "./journeys/views/edit-journey";
import { EditProgram } from "./programs/views/edit-program";
import { AdminCoursePage } from "./courses";
import NewSurvey from "../surveys/new-survey";
import { CreatedSurvey } from "../surveys/created-surveys";
import { EditCourse } from "./courses/edit-course";
import { AddCourse } from "../learning-development/learning-center/add-course";
import { DownloadTabs } from "./download-center";
import { AdminLnd } from "./lnd";
import { ProtectedComponent } from "./../../components/protected/protected-component"

export const AdminRouter = () => {
  return (
    <>
    <ProtectedComponent>
      <Routes>
        <Route path="/admin-lnds/*" element={<AdminLnd />}></Route>
        <Route
          path="/manage-announcement/*"
          element={<AddAnnouncement></AddAnnouncement>}
        ></Route>
       
        <Route path="/new-survey" element={<NewSurvey />} />
        <Route path="/created-surveys" element={<CreatedSurvey />} />
        <Route path="/created-surveys/edit/:id" element={<NewSurvey />} />
        <Route path="/addCourse" element={<AddCourse></AddCourse>}></Route>
        <Route path="/downloads" element={<DownloadTabs />} />
        {/* <Route path="/templates" element={<AdminDownloadTemplates />} />
        <Route path="/leaders-gallery" element={<AdminLeadersGallery />} />
        <Route path="/logo" element={<AdminDownloadsLogo />} />
        <Route path="/policies" element={<AdminDownloadPolicies />} /> */}
        <Route
          path="*"
          element={<Navigate replace to="/induction/*" />}
        ></Route>
      </Routes>
      </ProtectedComponent>
    </>
  );
};
