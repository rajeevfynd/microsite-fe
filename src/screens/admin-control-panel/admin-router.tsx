import * as React from 'react'
import EditCarousal from './edit-carousel'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminInduction } from './induction'
import { AdminJourneyList } from './journeys'
import { AdminProgramList } from './programs'
import { AddAnnouncement } from './manage-announcements'
import { NewProgram } from './programs/views/new-program'
import { NewJourney } from './journeys/views/new-jounrey'
import { EditJourney } from './journeys/views/edit-journey'
import { EditProgram } from './programs/views/edit-program'
import { AdminCoursePage } from './courses'
import NewSurvey from '../surveys/new-survey'
import {CreatedSurvey} from '../surveys/created-surveys'
import { EditCourse } from './courses/edit-course'
import { AddCourse } from '../learning-development/learning-center/add-course'
import { AdminDownloadPolicies, AdminDownloadsLogo, AdminDownloadTemplates, AdminLeadersGallery, AdminNewEmployeeDownloads} from './download-center'

export const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/manage-announcement/*' element={<AddAnnouncement></AddAnnouncement>}></Route>
        <Route path='/edit-carousel/*' element={<EditCarousal></EditCarousal>}></Route>
        <Route path='/induction/*' element={<AdminInduction />}></Route>
        <Route path='/journeys/*' element={<AdminJourneyList />}></Route>
        <Route path='/journeys/new' element={<NewJourney />} />
        <Route path='/journeys/:id' element={<EditJourney />} />
        <Route path='/programs/*' element={<AdminProgramList />}></Route>
        <Route path='/programs/new' element={<NewProgram />}></Route>
        <Route path='/programs/:id' element={<EditProgram />}></Route>
        <Route path='/courses/*' element={<AdminCoursePage />} />
        <Route path='/courses/:id' element={<EditCourse />} />
        <Route path="/new-survey" element={<NewSurvey />} />
        <Route path="/created-surveys" element={<CreatedSurvey />} />
        <Route path="/created-surveys/edit/:id" element={<NewSurvey />} />
        <Route path='/addCourse' element={<AddCourse></AddCourse>}></Route>
        <Route path="/new-employee-downloads" element={<AdminNewEmployeeDownloads />} />
        <Route path="/templates" element={<AdminDownloadTemplates />} />
        <Route path="/leaders-gallery" element={<AdminLeadersGallery />} />
        <Route path="/logo" element={<AdminDownloadsLogo />} />
        <Route path="/policies" element={<AdminDownloadPolicies />} />
        <Route path='*' element={<Navigate replace to="/induction/*" />} ></Route>
      </Routes>
    </>
  )
}
