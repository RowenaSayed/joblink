import "../../assets/CSS/Profile.css";
import { useState, useEffect } from "react";

function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    skills: [],
    experience: [],
    education: [],
    certificates: [],
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newCertificate, setNewCertificate] = useState("");
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://joblink-server-app.vercel.app/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            fullName: data.user.name || "",
            headline: data.user.personalHeadline || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            location: data.user.location || "",
            about: data.user.about || "",
            skills: data.user.skills || [],
            experience: data.user.experience || [],
            education: data.user.education || [],
            certificates: data.user.certificates || [],
          });
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://joblink-server-app.vercel.app/api/users/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileData.fullName,
            personalHeadline: profileData.headline,
            phone: profileData.phone,
            location: profileData.location,
            about: profileData.about,
            skills: profileData.skills,
            experience: profileData.experience,
            education: profileData.education,
            certificates: profileData.certificates,
          }),
        }
      );

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://joblink-server-app.vercel.app/api/users/resume",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Resume uploaded successfully!");
      } else {
        throw new Error("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setMessage("Failed to upload resume");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;
    const updatedSkills = [...profileData.skills, newSkill.trim()];
    setProfileData({ ...profileData, skills: updatedSkills });
    setNewSkill("");
    setShowSkillForm(false);
  };

  const handleAddExperience = () => {
    if (newExperience.trim() === "") return;
    const updatedExperience = [...profileData.experience, newExperience.trim()];
    setProfileData({ ...profileData, experience: updatedExperience });
    setNewExperience("");
    setShowExperienceForm(false);
  };

  const handleAddEducation = () => {
    if (newEducation.trim() === "") return;
    const updatedEducation = [...profileData.education, newEducation.trim()];
    setProfileData({ ...profileData, education: updatedEducation });
    setNewEducation("");
    setShowEducationForm(false);
  };

  const handleAddCertificate = () => {
    if (newCertificate.trim() === "") return;
    const updatedCertificates = [
      ...profileData.certificates,
      newCertificate.trim(),
    ];
    setProfileData({ ...profileData, certificates: updatedCertificates });
    setNewCertificate("");
    setShowCertificateForm(false);
  };

  return (
    <div className="container py-5  mx-auto">
      <h2 className="mb-1 fw-bold col-lg-10 mx-auto">My Profile</h2>
      <p className="text-muted col-lg-10 mx-auto">
        Manage your professional information for JobLink.
      </p>

      {message && (
        <div
          className={`alert ${
            message.includes("success") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-10 mx-auto">
          <div className="card mb-4 text-center p-4">
            <h6 className="fw-bold mb-3">Profile Picture</h6>
            <div className="avatar mb-3">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                alt="Profile"
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
            <button className="btn btn-primary">Change Photo</button>
          </div>

          <div className="card mb-4">
            <div className="card-header fw-bold">Personal Information</div>
            <div className="card-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Professional Headline</label>
                  <input
                    type="text"
                    className="form-control"
                    name="headline"
                    value={profileData.headline}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">About Me</label>
                  <textarea
                    rows="4"
                    className="form-control"
                    name="about"
                    value={profileData.about}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold">Resume / CV</h5>
              <p className="text-muted">
                Upload your latest resume. PDF format preferred.
              </p>
              <div className="upload-box p-3 border rounded text-center">
                <p className="mb-2">Drag and drop your file here, or</p>
                <label
                  htmlFor="resumeInput"
                  className="btn btn-outline-primary"
                >
                  Browse Files
                </label>
                <input
                  id="resumeInput"
                  type="file"
                  className="form-control-file d-none"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                />
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Skills</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowSkillForm(!showSkillForm)}
              >
                {showSkillForm ? "Cancel" : "+ Add New"}
              </button>
            </div>
            {showSkillForm && (
              <div className="card-body border-bottom">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddSkill}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="card-body">
              {profileData.skills.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="badge bg-primary bg-opacity-10 text-white p-2"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No skills added yet</p>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Work Experience</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowExperienceForm(!showExperienceForm)}
              >
                {showExperienceForm ? "Cancel" : "+ Add New"}
              </button>
            </div>
            {showExperienceForm && (
              <div className="card-body border-bottom">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Software Engineer at Google (2020-2023)"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddExperience()
                    }
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddExperience}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="list-group list-group-flush">
              {profileData.experience.length > 0 ? (
                profileData.experience.map((exp, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>{exp}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="list-group-item text-muted">
                  No work experience added
                </div>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Education</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowEducationForm(!showEducationForm)}
              >
                {showEducationForm ? "Cancel" : "+ Add New"}
              </button>
            </div>
            {showEducationForm && (
              <div className="card-body border-bottom">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., BSc Computer Science at Cairo University (2020)"
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddEducation()
                    }
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddEducation}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="list-group list-group-flush">
              {profileData.education.length > 0 ? (
                profileData.education.map((edu, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>{edu}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="list-group-item text-muted">
                  No education added
                </div>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Certificates & Awards</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCertificateForm(!showCertificateForm)}
              >
                {showCertificateForm ? "Cancel" : "+ Add New"}
              </button>
            </div>
            {showCertificateForm && (
              <div className="card-body border-bottom">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., AWS Certified Solutions Architect - 2023"
                    value={newCertificate}
                    onChange={(e) => setNewCertificate(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddCertificate()
                    }
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddCertificate}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="list-group list-group-flush">
              {profileData.certificates.length > 0 ? (
                profileData.certificates.map((cert, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>{cert}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="list-group-item text-muted">
                  No certificates added
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mt-3">
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;