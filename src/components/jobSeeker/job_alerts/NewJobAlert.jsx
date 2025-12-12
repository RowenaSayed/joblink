import { useState } from "react";

function NewJobAlert() {
  const [formData, setFormData] = useState({
    keywords: "",
    jobTitle: "",
    location: "",
    jobType: "Full-time",
    minSalary: "",
    maxSalary: "",
    frequency: "Daily",
    email_notification: true,
    in_app_notification: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleJobTypeChange = (type) => {
    setFormData({ ...formData, jobType: type });
  };

  const handleFrequencyChange = (freq) => {
    setFormData({ ...formData, frequency: freq });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const alertData = {
        ...formData,
        minSalary: formData.minSalary ? parseInt(formData.minSalary) : 0,
        maxSalary: formData.maxSalary ? parseInt(formData.maxSalary) : 0,
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://joblink-server-app.vercel.app/api/job-alerts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(alertData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Job alert created successfully!" });
        setFormData({
          keywords: "",
          jobTitle: "",
          location: "",
          jobType: "Full-time",
          minSalary: "",
          maxSalary: "",
          frequency: "Daily",
          email_notification: true,
          in_app_notification: true,
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to create job alert",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-secondary-subtle p-4" style={{ borderRadius: "15px" }}>
      <div>
        <h5 style={{ fontWeight: 700 }}>Create a New Job Alert</h5>
        <p className="text-secondary">
          Define your preferences to receive notifications for new job opportunities.
        </p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type === "success" ? "success" : "danger"} mt-3`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          <div className="mb-3 mx-lg-3 mx-md-auto" style={{ width: "350px" }}>
            <label htmlFor="keywords" className="form-label">Keywords</label>
            <input
              type="text"
              className="form-control"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder=" Software Engineer, Frontend"
            />
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto" style={{ width: "350px" }}>
            <label htmlFor="jobTitle" className="form-label">Job Title (Optional)</label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder=" Senior Developer"
            />
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto" style={{ width: "350px" }}>
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder=" Remote, New York"
            />
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto d-flex flex-column" style={{ width: "350px" }}>
            <label className="form-label">Job Type</label>
            <div className="btn-group border border-secondary-subtle" style={{ borderRadius: "5px" }}>
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
              >
                {formData.jobType}
              </button>
              <ul className="dropdown-menu w-100 p-0">
                {["Full-time", "Part-time", "Internship", "Contract", "Remote"].map((type) => (
                  <li key={type} className="p-1">
                    <button
                      type="button"
                      className="dropdown-item text-center w-100"
                      onClick={() => handleJobTypeChange(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto" style={{ width: "350px" }}>
            <label htmlFor="minSalary" className="form-label">Minimum Salary ($)</label>
            <input
              type="number"
              className="form-control"
              id="minSalary"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleInputChange}
              placeholder=" 50000"
            />
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto" style={{ width: "350px" }}>
            <label htmlFor="maxSalary" className="form-label">Maximum Salary ($)</label>
            <input
              type="number"
              className="form-control"
              id="maxSalary"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleInputChange}
              placeholder=" 100000"
            />
          </div>

          <div className="mb-3 mx-lg-3 mx-md-auto d-flex flex-column" style={{ width: "350px" }}>
            <label className="form-label">Alert Frequency</label>
            <div className="btn-group border border-secondary-subtle" style={{ borderRadius: "5px" }}>
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
              >
                {formData.frequency}
              </button>
              <ul className="dropdown-menu w-100 p-0">
                {["Daily", "Weekly", "Monthly"].map((freq) => (
                  <li key={freq} className="p-1">
                    <button
                      type="button"
                      className="dropdown-item text-center w-100"
                      onClick={() => handleFrequencyChange(freq)}
                    >
                      {freq}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mb-3 mx-lg-3 mx-md-auto d-flex flex-column justify-content-end"
            style={{ width: "350px" }}
          >
            <div className="d-flex">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="emailNotification"
                  name="email_notification"
                  checked={formData.email_notification}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="emailNotification" style={{ fontWeight: "700" }}>
                  Email Notifications
                </label>
              </div>
            </div>

            <div className="d-flex">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="inAppNotification"
                  name="in_app_notification"
                  checked={formData.in_app_notification}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="inAppNotification" style={{ fontWeight: "700" }}>
                  In-App Notifications
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            className="btn text-light section-one-btn"
            style={{ backgroundColor: "#22498c" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating...
              </>
            ) : (
              "Create Alert"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewJobAlert;
