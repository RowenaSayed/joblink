import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListCard({
  savedJobId,
  jobId,
  jobTitle,
  company,
  location,
  savedDate,
  description,
  jobImage,
}) {
  if (!jobTitle || !company) return null;
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRemoveClick = () => {
    setShowModal(true);
  };

  const handleConfirmRemove = async () => {
    setIsRemoving(true);
    setShowModal(false);

    try {
      const response = await fetch(`https://joblink-server-app.vercel.app/api/saved/${savedJobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing job:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <div
        className="card h-100 p-4"
        style={{ borderRadius: "15px", paddingTop: "30px" }}
      >
        <div className="card-header p-0 border-0 d-flex align-items-center bg-transparent gap-4">
          <img
            src={jobImage}
            className=""
            style={{ marginTop: "-10px" }}
            alt=""
          />
          <div>
            <h5 className="card-title" style={{ marginBottom: 0 }}>
              {jobTitle}
            </h5>
            <p className="text-secondary">{company}</p>
          </div>
        </div>
        <div className="card-body px-0 pt-3 pb-1 border-bottom">
          <div className="d-flex gap-2">
            <div className="text-secondary d-flex gap-2 align-items-center">
              <i className="fa-solid fa-location-dot"></i>
              <p>{location}</p>
            </div>
            <div className="text-secondary d-flex gap-2 align-items-center">
              <i className="fa-regular fa-calendar-days"></i>
              <p>Saved on {savedDate}</p>
            </div>
          </div>
          <div>
            <p
              className="text-secondary"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="card-footer d-flex bg-transparent justify-content-between px-0 pb-0 py-3">
          <button
            type="button"
            className="py-2 px-3 card-details-btn"
            style={{
              border: 10,
              fontSize: "14px",
              borderRadius: "10px",
              fontWeight: 600,
            }}
            onClick={() => {
              navigate(`/jobseeker/jobs/${jobId}`);
            }}
          >
            View Details
          </button>
          <button
            type="button"
            className="text-light py-2 px-3 card-remove-btn"
            style={{
              border: 10,
              fontSize: "14px",
              borderRadius: "10px",
              fontWeight: 600,
              backgroundColor: "#D8666AFF",
            }}
            onClick={handleRemoveClick}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>

      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{
          backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Removal</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to remove "{jobTitle}" from your saved jobs?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCard;
