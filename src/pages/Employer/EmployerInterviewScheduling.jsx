import React from 'react'
import Aside from '../../components/Employer/InterviewSchedueling/Aside'
import Main from "../../components/Employer/InterviewSchedueling/Main";
import '../../assets/CSS/employer-interview-scheduling.css'

export default function EmployerInterviewScheduling() {
  return (
    <>
      <div className="mt-5 row mw-100 d-flex flex-lg-row flex-column align-items-lg-start align-items-center justify-content-lg-between">
        <Aside />
        <Main />
      </div>
    </>
  );
}
