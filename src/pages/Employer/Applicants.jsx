import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Applicants() {
  const [statusFilter, setStatusFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [allApplicants, setAllApplicants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApplicantsData();
  }, []);

  const getApplicantsData = async () => {
    try {

      const response = await fetch(
        "https://joblink-server-app.vercel.app/api/apps/all/company-apps",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get data");
      }

      const data = await response.json();

      const mappedApplicants = data.applications.map((app) => {
        const cleanName = app.applicant.name.replace(/\s+/g, "").toLowerCase();
        const randomImg = `https://i.pravatar.cc/40?u=${cleanName}`;

        return {
          id: app._id,
          name: app.applicant.name,
          role: app.job.title,
          date: new Date(app.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          experience: "",
          status: app.status,
          img: randomImg,
          email: app.applicant.email,
          coverLetter: app.coverLetter,
          resume: app.resume,
          location: app.job.location,
        };
      });

      setAllApplicants(mappedApplicants);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterApplicants = () => {
    let filtered = [...allApplicants];

    if (statusFilter && statusFilter !== "Select Status") {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (jobFilter) {
      filtered = filtered.filter((app) =>
        app.role.toLowerCase().includes(jobFilter.toLowerCase())
      );
    }

    return filtered;
  };

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      setAllApplicants((prev) =>
        prev.map((app) =>
          app.id === applicantId ? { ...app, status: newStatus } : app
        )
      );

      const response = await fetch(
        `https://joblink-server-app.vercel.app/api/apps/status/${applicantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      console.log("Status updated successfully");
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  const viewProfile = (applicant) => {
    alert(
      `Name: ${applicant.name}\nEmail: ${applicant.email}\nRole: ${applicant.role}\nStatus: ${applicant.status}`
    );
  };

  const statusColors = {
    Applied: { background: "#e3eaff", color: "#3258c5" },
    Pending: { background: "#eee", color: "#555" },
    Shortlisted: { background: "#e3eaff", color: "#3258c5" },
    Rejected: { background: "#ffe5e5", color: "#d63031" },
    Interviewing: { background: "#e6ffe6", color: "#2e8b57" },
  };

  const handleClearFilters = () => {
    setStatusFilter("");
    setJobFilter("");
  };

  const applicantsToShow = filterApplicants();

  return (
    <div className="container py-5">
      <h3 className="mb-4" style={{ fontWeight: "600" }}>
        Applicant Overview
      </h3>

      <div className="p-4 mb-4 bg-white rounded border">
        <h6 className="mb-3" style={{ fontWeight: "600" }}>
          Filter Applicants
        </h6>

        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label small">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ height: "42px" }}
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search job title..."
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              style={{ height: "42px" }}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              style={{ height: "42px", fontWeight: "500" }}
            >
              Apply
            </button>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleClearFilters}
              style={{ height: "42px" }}
            >
              Clear
            </button>
          </div>

          <div className="col-md-1 text-end">
            <span className="badge bg-light text-dark">
              {applicantsToShow.length} found
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded border">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 style={{ fontWeight: "600", margin: 0 }}>All Applicants</h6>

        </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "14px", color: "#555" }}>
                  <th>Candidate</th>
                  <th>Applied For</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applicantsToShow.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={applicant.img}
                          alt={applicant.name}
                          className="rounded-circle me-3"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: "500" }}>
                            {applicant.name}
                          </div>
                          <small className="text-muted">
                            {applicant.email}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>{applicant.role}</div>
                      <small className="text-muted">
                        {applicant.experience}
                      </small>
                    </td>

                    <td>{applicant.date}</td>

                    <td>{applicant.location}</td>

                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            statusColors[applicant.status]?.background ||
                            "#eee",
                          color:
                            statusColors[applicant.status]?.color || "#555",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                      >
                        {applicant.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => viewProfile(applicant)}
                          style={{ borderRadius: "6px", fontSize: "13px" }}
                        >
                          View
                        </button>

                        <select
                          className="form-select"
                          value={applicant.status}
                          onChange={(e) =>
                            handleStatusChange(applicant.id, e.target.value)
                          }
                          style={{
                            width: "130px",
                            height: "32px",
                            fontSize: "13px",
                            padding: "0 8px",
                          }}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       
      </div>
    </div>
  );
}

export default Applicants;
