import { useState } from "react";

function ActiveAlertsCard({
  cardId,
  cardTitle,
  cardDescription,
  cardStatus,
  onAlertUpdated,
}) {
  const [isActive, setIsActive] = useState(cardStatus === "Active");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    jobTitle: cardTitle.replace(" Alert", ""),
    keywords: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    email_notification: true,
    in_app_notification: true,
  });

  const handleToggle = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    try {
      const response = await fetch(
        `https://joblink-server-app.vercel.app/api/job-alerts/${cardId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );
      if (!response.ok) setIsActive(!newStatus);
    } catch {
      setIsActive(!newStatus);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://joblink-server-app.vercel.app/api/job-alerts/${cardId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.ok) onAlertUpdated();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...editFormData };
      if (formData.minSalary) formData.minSalary = Number(formData.minSalary);
      if (formData.maxSalary) formData.maxSalary = Number(formData.maxSalary);

      const response = await fetch(
        `https://joblink-server-app.vercel.app/api/job-alerts/${cardId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setShowEditModal(false);
        onAlertUpdated();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div
        className="card h-100 p-lg-2 p-md-0"
        style={{ borderRadius: "15px" }}
      >
        <div className="card-body d-sm-flex p-3 flex-sm-column justify-content-sm-around">
          <div className="d-flex flex-column flex-sm-row justify-content-between mb-4 gap-3">
            <div style={{ width: "60%" }}>
              <h5 className="card-title" style={{ fontWeight: 700 }}>
                {cardTitle}
              </h5>
              <p
                className="card-text text-secondary"
                style={{ fontSize: "14px" }}
              >
                {cardDescription}
              </p>
            </div>
            <div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={isActive}
                  onChange={handleToggle}
                  style={{ fontSize: "20px" }}
                />
                <label className="form-check-label" style={{ fontWeight: 700 }}>
                  {isActive ? "Active" : "Inactive"}
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex flex-lg-row justify-content-between gap-3 flex-column">
            <div style={{ height: "26px", marginLeft: "-10px" }}>
              <ul className="d-flex list-unstyled">
                <li
                  className="second-section-btn rounded-circle"
                  style={{ transition: "0.3s" }}
                >
                  <button className="btn">
                    <i className="bi bi-envelope text-secondary"></i>
                  </button>
                </li>
                <li
                  className="second-section-btn rounded-circle"
                  style={{ transition: "0.3s" }}
                >
                  <button className="btn">
                    <i className="bi bi-bell text-secondary"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-light border text-end edit-btn"
                style={{ width: "90px", fontWeight: 700 }}
                onClick={handleEditClick}
              >
                <i className="bi bi-pencil" style={{ float: "left" }}></i>Edit
              </button>
              <button
                type="button"
                className="btn btn-danger text-end"
                style={{ width: "108px", fontWeight: 700 }}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <i className="bi bi-trash3" style={{ float: "left" }}></i>
                {isDeleting ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showEditModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{
          backgroundColor: showEditModal ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Job Alert</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    value={editFormData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Keywords *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="keywords"
                    value={editFormData.keywords}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={editFormData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Job Type</label>
                  <select
                    className="form-select"
                    name="jobType"
                    value={editFormData.jobType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Min Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minSalary"
                      value={editFormData.minSalary}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Max Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxSalary"
                      value={editFormData.maxSalary}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="email_notification"
                    checked={editFormData.email_notification}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    Email Notifications
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="in_app_notification"
                    checked={editFormData.in_app_notification}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    In-App Notifications
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActiveAlertsCard;
