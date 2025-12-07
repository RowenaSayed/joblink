import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function Analytics() {
  const [filter, setFilter] = useState("all");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(
          "https://joblink-server-app.vercel.app/api/apps/all/company-apps/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data.applications);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchApplications();
  }, []);



  const jobsPosted = new Set(applications.map((app) => app.jobId)).size;
  const totalApplications = applications.length;
  const candidatesHired = applications.filter(
    (app) => app.status === "hired"
  ).length;

  const destroyExistingChart = (canvasId) => {
    Object.values(Chart.instances).forEach((chart) => {
      if (chart.canvas.id === canvasId) {
        chart.destroy();
      }
    });
  };

  // Charts
  useEffect(() => {
    // Views Chart
    destroyExistingChart("viewsChart");
    const ctxViews = document.getElementById("viewsChart");
    if (ctxViews) {
      new Chart(ctxViews, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Views",
              data: [50, 70, 60, 90, 100],
              borderColor: "blue",
              fill: false,
            },
            {
              label: "Applications",
              data: [20, 30, 25, 40, 50],
              borderColor: "green",
              fill: false,
            },
          ],
        },
      });
    }

    // Source Chart
    destroyExistingChart("sourceChart");
    const ctxSource = document.getElementById("sourceChart");
    if (ctxSource) {
      new Chart(ctxSource, {
        type: "doughnut",
        data: {
          labels: ["Website", "Referral", "Job Portal", "Others"],
          datasets: [
            {
              data: [40, 25, 25, 10],
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
            },
          ],
        },
      });
    }

    // Funnel Chart
    destroyExistingChart("funnelChart");
    const ctxFunnel = document.getElementById("funnelChart");
    if (ctxFunnel) {
      new Chart(ctxFunnel, {
        type: "bar",
        data: {
          labels: ["Applied", "Interviewed", "Offered", "Hired"],
          datasets: [
            {
              label: "Candidates",
              data: [100, 60, 30, 15],
              backgroundColor: "#36A2EB",
            },
          ],
        },
      });
    }

    // Time Chart
    destroyExistingChart("timeChart");
    const ctxTime = document.getElementById("timeChart");
    if (ctxTime) {
      new Chart(ctxTime, {
        type: "bar",
        data: {
          labels: ["Screening", "Interview", "Offer", "Onboarding"],
          datasets: [
            {
              label: "Avg. Days",
              data: [3, 5, 4, 2],
              backgroundColor: "#FF6384",
            },
          ],
        },
      });
    }
  }, [applications]);

  return (
    <main>
      <div className="container my-4">
        <div className="row text-center mb-4 g-2">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 d-flex flex-column">
              <div className="card-body">
                <h6 className="text-muted">Jobs Posted</h6>
                <h3 className="fw-bold">{jobsPosted}</h3>
                <small className="text-success">+5 Since last month</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 d-flex flex-column">
              <div className="card-body">
                <h6 className="text-muted">Total Applications</h6>
                <h3 className="fw-bold">{totalApplications}</h3>
                <small className="text-success">+120 Since last month</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 d-flex flex-column">
              <div className="card-body">
                <h6 className="text-muted">Avg. Time to Hire</h6>
                <h3 className="fw-bold">22 Days</h3>
                <small className="text-success">
                  -3 Days Compared to last quarter
                </small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 d-flex flex-column">
              <div className="card-body">
                <h6 className="text-muted">Candidates Hired</h6>
                <h3 className="fw-bold">{candidatesHired}</h3>
                <small className="text-success">+2 Since last month</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm chart-card">
              <div className="card-body">
                <h6 className="mb-3">Job Views & Applications Over Time</h6>
                <canvas id="viewsChart"></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm chart-card">
              <div className="card-body">
                <h6 className="mb-3">Application Source Breakdown</h6>
                <canvas id="sourceChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm chart-card">
              <div className="card-body">
                <h6 className="mb-3">Hiring Funnel Conversion</h6>
                <canvas id="funnelChart"></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm chart-card">
              <div className="card-body">
                <h6 className="mb-3">Average Time Per Hiring Stage</h6>
                <canvas id="timeChart"></canvas>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </main>
  );
}

export default Analytics;
