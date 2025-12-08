import "../../assets/CSS/AdminDashboard.css";
import { useEffect } from "react";
import { Chart } from "chart.js/auto";
import {
  FaBriefcase,
  FaUserAlt,
  FaUserEdit,
  FaExclamationTriangle,
  FaKey,
} from "react-icons/fa";

let chartInstance;

function Admin() {
  useEffect(() => {
    const ctx = document.getElementById("jobChart");

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# job postings",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
          {
            label: "# new users",
            data: [10, 22, 7, 2, 8, 6],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <main>
        <div className="container py-4">
          <h3 className="fw-bold mb-3">Admin Dashboard</h3>

          <h6 className="section-title">Overview Statistics</h6>

          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h6>Total Users</h6>
                <div className="stat-value">12,500</div>
                <div className="stat-change">+5% vs. last month</div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h6>Active Employers</h6>
                <div className="stat-value">850</div>
                <div className="stat-change">+2% vs. last month</div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h6>Active Job Postings</h6>
                <div className="stat-value">3,200</div>
                <div className="stat-change">+8% vs. last month</div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h6>Applications Received</h6>
                <div className="stat-value">7,120</div>
                <div className="stat-change">+10% vs. last month</div>
              </div>
            </div>
          </div>

          <h6>Job Posting Activity</h6>
          <br />

          <div className="card p-4">
            <h6 className="fw-semibold">Monthly Job Postings & New Users</h6>
            <p className="text-muted">Overview of platform growth.</p>
            <canvas id="jobChart" height="300"></canvas>
          </div>

          <br />

          <h6 className="section-title">Recent System Activities</h6>
          <div className="card p-3">
            <h6>Latest Events</h6>

            <ul className="list-unstyled mt-3 mb-0">
              <li>
                <FaBriefcase /> New employer <b>Tech Solutions Inc.</b>{" "}
                registered.
              </li>
              <li>
                <FaUserAlt /> Job <b>Senior Software Engineer</b> posted.
              </li>
              <li>
                <FaUserEdit /> User <b>Sarah Jones</b> updated her profile.
              </li>
              <li>
                <FaExclamationTriangle /> Database usage at 85%.
              </li>
              <li>
                <FaKey /> Admin <b>Michael Lee</b> logged in.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
