import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
// --------------------------------------------------------
import AuthLayout from "./components/layout/Authlayout";
import EmployerLayout from "./components/layout/EmployerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import JobseekerLayout from "./components/layout/JobseekerLayout";
//============================================================
import Admin_Jobs_Management from "./pages/Admin/Admin_Jobs_Management";
import User_management from "./pages/Admin/user_management";
import Admin from "./pages/Admin/AdminDashboard";
// --------------------------------------------------------
// ============================================================
import JobLinkLanding from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignupJobseeker from "./pages/Auth/SignupJobseeker";
// ============================================================
import EmployerDashboard from "./pages/Employer/Dashboard";
import ManageJobs from "./pages/Employer/ManageJobs";
import Analytics from "./pages/Employer/Analytics";
import PostJob from "./pages/Employer/PostJob";
import Search from "./pages/Employer/Search";
import Employer_Company_Profile from "./pages/Employer/Employer_Company_Profile";
import Applicants from "./pages/Employer/Applicants";
import EmployerInterviewScheduling from "./pages/Employer/EmployerInterviewScheduling";
// ============================================================
import Dashboard from "./pages/jobseeker/Dashboard";
import Jobs from "./pages/jobseeker/Jobs";
import Job_Seeker_Applications from "./pages/jobseeker/Job_Seeker_Applications";
import Job_Seeker_Job_Details from "./pages/jobseeker/Job_Seeker_Job_Details";
import Job_Seeker_Job_Alerts from "./pages/jobseeker/Job_Seeker_Job_Alerts";
import Job_Seeker_Saved_Jobs from "./pages/jobseeker/Job_Seeker_Saved_Jobs";
import ViewCompanyProfile from "./pages/jobseeker/ViewCompanyProfile";
import ViewJobseekerProfile from "./pages/Employer/ViewJobseekerProfile";
import Profile from "./pages/jobseeker/Profile";
import Notifications from "./pages/jobseeker/Notfication";
// ============================================================
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            localStorage.getItem("role").toLowerCase().trim() ===
            "jobseeker" ? (
              <Navigate to="/jobseeker/dashboard" />
            ) : localStorage.getItem("role").toLowerCase().trim() ===
              "employer" ? (
              <Navigate to="/employer/dashboard" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          ) : (
            <JobLinkLanding />
          )
        }
      />
      <Route element={<ViewCompanyProfile />} path="/company/:id"></Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupJobseeker />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="jobs/:id" element={<Job_Seeker_Job_Details />} />
        <Route path="candidates" element={<Search />}></Route>
        <Route path="candidates/:id" element={<ViewJobseekerProfile />}></Route>
      </Route>
      {/* ===================================== */}
      <Route path="/employer" element={<EmployerLayout />}>
        <Route path="dashboard" element={<EmployerDashboard />}></Route>
        <Route path="dashboard/analytics" element={<Analytics />}></Route>
        <Route path="manage-jobs" element={<ManageJobs />}></Route>
        <Route path="post-job" element={<PostJob />}></Route>
        <Route path="candidates" element={<Search />}></Route>
        <Route path="candidates/:id" element={<ViewJobseekerProfile />}></Route>
        <Route path="profile" element={<Employer_Company_Profile />}></Route>
        <Route path="applicants" element={<Applicants />}></Route>

        <Route
          path="interviews"
          element={<EmployerInterviewScheduling />}
        ></Route>
      </Route>

      {/* ===================================== */}

      <Route path="/jobseeker" element={<JobseekerLayout />}>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="jobs" element={<Jobs />}></Route>
        <Route path="jobs/:id" element={<Job_Seeker_Job_Details />} />
        <Route path="apps" element={<Job_Seeker_Applications />}></Route>
        <Route path="saved-jobs" element={<Job_Seeker_Saved_Jobs />}></Route>
        <Route path="alerts" element={<Job_Seeker_Job_Alerts />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="notify" element={<Notifications />}></Route>
      </Route>

      {/* ===================================== */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="jobs" element={<Admin_Jobs_Management />}></Route>
        <Route path="users" element={<User_management />}></Route>
        <Route path="dashboard" element={<Admin />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
