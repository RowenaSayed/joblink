import { useState, useEffect } from "react";
import "../../assets/CSS/job_seeker_job_alerts.css";
import NewJobAlert from "../../components/jobSeeker/job_alerts/NewJobAlert";
import ActiveAlertsCard from "../../components/jobSeeker/job_alerts/ActiveAlertsCard";

function Job_Seeker_Job_Alerts() {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [activeAlerts]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("https://joblink-server-app.vercel.app/api/job-alerts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const Data = await response.json();
      setActiveAlerts(Data.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAlertDescription = (alert) => {
    const parts = [];
    if (alert.keywords) {
      if (Array.isArray(alert.keywords) && alert.keywords.length > 0)
        parts.push(`Keywords: ${alert.keywords.join(", ")}`);
      else if (typeof alert.keywords === "string")
        parts.push(`Keywords: ${alert.keywords}`);
    }
    if (alert.location) parts.push(`Location: ${alert.location}`);
    if (alert.jobType) parts.push(`Job Type: ${alert.jobType}`);
    if (alert.salaryMin != null && alert.salaryMax != null)
      parts.push(`Salary: $${alert.salaryMin} - $${alert.salaryMax}`);
    else if (alert.salaryMin != null)
      parts.push(`Salary: From $${alert.salaryMin}`);
    else if (alert.salaryMax != null)
      parts.push(`Salary: Up to $${alert.salaryMax}`);
    if (alert.frequency) parts.push(`Frequency: ${alert.frequency}`);
    return parts.join(" | ");
  };

  return loading ? (
    <div className="py-5 text-center">Loading...</div>
  ) : (
    <main className="mb-5">
      <div className="px-5 mt-5">
        <h1 style={{ fontWeight: 700 }}>Job Alerts</h1>
        <NewJobAlert
          onAlertCreated={(newAlert) =>
            setActiveAlerts((prev) => [newAlert, ...prev])
          }
        />
        <div
          className="border border-secondary-subtle p-4 mt-5"
          style={{ borderRadius: "15px" }}
        >
          <div>
            <h4 style={{ fontWeight: 700 }}>My Active Alerts</h4>
            <p className="text-secondary">
              Manage your existing job alerts. Toggle, edit, or delete them as
              needed.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            {activeAlerts.length === 0 ? (
              <div className="col-12 text-center py-4">
                <p className="text-secondary">No active alerts found.</p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <div className="col" key={alert._id}>
                  <ActiveAlertsCard
                    cardId={alert._id}
                    cardTitle={`${
                      Array.isArray(alert.keywords)
                        ? alert.keywords.join(", ")
                        : alert.keywords || "Job"
                    } Alert`}
                    cardDescription={formatAlertDescription(alert)}
                    cardStatus={
                      alert.isActive !== false ? "Active" : "Inactive"
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Job_Seeker_Job_Alerts;
