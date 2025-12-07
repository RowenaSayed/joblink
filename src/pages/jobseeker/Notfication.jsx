import "../../assets/CSS/Notification.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://joblink-server-app.vercel.app/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        // only showing job recommendation type notifications like in the API example
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const formatTime = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffMs = now - createdAt;
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  if (loading) {
    return (
      <div className="container my-4">
        <h3 className="mb-4">Notifications</h3>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Separate unread and read notifications
  const unreadNotifications = notifications.filter((n) => !n.readStatus);
  const readNotifications = notifications.filter((n) => n.readStatus);

  return (
    <div className="container my-4">
      <h3 className="mb-4">Notifications</h3>

      {unreadNotifications.length > 0 ? (
        <>
          <h5 className="mb-3">Unread Notifications</h5>
          {unreadNotifications.map((notification) => (
            <div
              key={notification._id}
              className="custom-container unread-notification"
            >
              <i className="bi bi-briefcase notification-icon"></i>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">New Job Recommendation!</h6>
                  <p className="mb-0 text-muted small">
                    {notification.message}
                    <br />
                    <small>{formatTime(notification.createdAt)}</small>
                  </p>
                </div>
                <div>
                  <Link to={`/jobseeker/jobs/${notification.job_id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                   
                  >
                    View Job
                  </Link>
                 
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No unread notifications</p>
      )}

      {readNotifications.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Earlier Notifications</h5>
          {readNotifications.map((notification) => (
            <div
              key={notification._id}
              className="custom-container read-notification"
            >
              <i className="bi bi-briefcase notification-icon"></i>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">New Job Recommendation!</h6>
                  <p className="mb-0 text-muted small">
                    {notification.message}
                    <br />
                    <small>{formatTime(notification.createdAt)}</small>
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    (window.location.href = `/jobs/${notification.job_id}`)
                  }
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {notifications.length === 0 && !loading && (
        <div className="text-center py-5">
          <i
            className="bi bi-bell"
            style={{ fontSize: "3rem", color: "#6c757d" }}
          ></i>
          <p className="mt-3 text-muted">No notifications yet</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
