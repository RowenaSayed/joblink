import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/CSS/Profile.css";

function ViewJobseekerProfile() {
  const { id } = useParams(); 
  const [profileData, setProfileData] = useState({
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    skills: [],
    experience: [],
    education: [],
    certificates: [],
    resumeUrl: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobseekerProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://joblink-server-app.vercel.app/api/users/profile/public/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            name: data.user?.name || "Not specified",
            headline: data.user?.personalHeadline || "Not specified",
            email: data.user?.email || "Not specified",
            phone: data.user?.phone || "Not specified",
            location: data.user?.location || "Not specified",
            about: data.user?.about || "No information provided",
            skills: data.user?.skills || [],
            experience: data.user?.experience || [],
            education: data.user?.education || [],
            certificates: data.user?.certificates || [],
            resumeUrl: data.user?.resume || "",
            profilePicture:
              data.user?.profilePicture ||
              "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
          });
        } else {
          throw new Error("Failed to fetch jobseeker profile");
        }
      } catch (error) {
        console.error("Error fetching jobseeker profile:", error);
        setError("Failed to load jobseeker profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobseekerProfile();
    }
  }, [id]);

  const handleDownloadResume = () => {
    if (profileData.resumeUrl) {
      window.open(profileData.resumeUrl, "_blank");
    }
  };

 

  if (loading) {
    return (
      <div className="container py-5 mx-auto text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 mx-auto">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mx-auto">
      <h2 className="mb-1 fw-bold col-lg-10 mx-auto">Jobseeker Profile</h2>
      <p className="text-muted col-lg-10 mx-auto mb-4">
        Viewing {profileData.name}'s professional profile
      </p>

      <div className="row g-4">
        <div className="col-lg-10 mx-auto">
          {/* Profile Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <div className="avatar mb-3">
                    <img
                      src={profileData.profilePicture}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{
                       
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <h3 className="fw-bold mb-2">{profileData.name}</h3>
                  <h5 className="text-primary mb-3">{profileData.headline}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <i className="fas fa-envelope me-2"></i>
                        <strong>Email:</strong> {profileData.email}
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-phone me-2"></i>
                        <strong>Phone:</strong> {profileData.phone}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        <strong>Location:</strong> {profileData.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                   
                    {profileData.resumeUrl && (
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleDownloadResume}
                      >
                        <i className="fas fa-download me-1"></i> Download Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold bg-light">
              <i className="fas fa-user me-2"></i> About Me
            </div>
            <div className="card-body">
              <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
                {profileData.about}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold bg-light">
              <i className="fas fa-tools me-2"></i> Skills
            </div>
            <div className="card-body">
              {profileData.skills.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="badge bg-primary bg-opacity-10 text-light p-2 fw-normal"
                      style={{ fontSize: "1rem" }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No skills listed</p>
              )}
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold bg-light">
              <i className="fas fa-briefcase me-2"></i> Work Experience
            </div>
            <div className="card-body">
              {profileData.experience.length > 0 ? (
                <div className="list-group list-group-flush">
                  {profileData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="list-group-item border-0 px-0 py-2"
                    >
                      <div className="d-flex align-items-start">
                        <i
                          className="fas fa-circle text-primary me-2 mt-1"
                          style={{ fontSize: "0.5rem" }}
                        ></i>
                        <div>
                          <p className="mb-1 fw-semibold">{exp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No work experience listed</p>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold bg-light">
              <i className="fas fa-graduation-cap me-2"></i> Education
            </div>
            <div className="card-body">
              {profileData.education.length > 0 ? (
                <div className="list-group list-group-flush">
                  {profileData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="list-group-item border-0 px-0 py-2"
                    >
                      <div className="d-flex align-items-start">
                        <i
                          className="fas fa-circle text-primary me-2 mt-1"
                          style={{ fontSize: "0.5rem" }}
                        ></i>
                        <div>
                          <p className="mb-1 fw-semibold">{edu}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No education listed</p>
              )}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold bg-light">
              <i className="fas fa-award me-2"></i> Certificates & Awards
            </div>
            <div className="card-body">
              {profileData.certificates.length > 0 ? (
                <div className="list-group list-group-flush">
                  {profileData.certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="list-group-item border-0 px-0 py-2"
                    >
                      <div className="d-flex align-items-start">
                        <i
                          className="fas fa-circle text-primary me-2 mt-1"
                          style={{ fontSize: "0.5rem" }}
                        ></i>
                        <div>
                          <p className="mb-1 fw-semibold">{cert}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No certificates listed</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-4">
            
            {profileData.resumeUrl && (
              <button
                className="btn btn-outline-primary"
                onClick={handleDownloadResume}
              >
                <i className="fas fa-file-pdf me-1"></i> View Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewJobseekerProfile;
