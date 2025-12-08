import { useState, useEffect } from "react";
import GridCard from "../../components/jobSeeker/saved_jobs/GridCard";
import ListCard from "../../components/jobSeeker/saved_jobs/ListCard";
import "../../assets/CSS/job_seeker_saved_jobs.css";

function Job_Seeker_Saved_Jobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("Grid");

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const response = await fetch("https://joblink-server-app.vercel.app/api/saved/all/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.savedJobs) {
        setSavedJobs(data.savedJobs);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobRemoved = (jobId) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  };

  function changeLayout(type) {
    setLayout(type);
  }

  const activeBtn = {
    borderRadius: "10px",
    height: "40px",
    width: "40px",
    backgroundColor: "#22498CFF",
    color: "#FFF",
  };
  const inActiveBtn = {
    borderRadius: "10px",
    height: "40px",
    width: "40px",
    backgroundColor: "#FFF",
    color: "#22498CFF",
    border: "1px solid #22498CFF !important",
  };

  if (loading) {
    return <div className="py-5 text-center">Loading...</div>;
  }

  return (
    <main className="py-5">
      <div className="container">
        <div className="d-flex flex-column">
          <div className="mb-4">
            <h2 className="fw-bold">Saved Jobs</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="text-secondary">
                Showing {savedJobs.length} saved jobs
              </p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <button
                onClick={() => changeLayout("Grid")}
                className="p-2 me-2"
                style={layout == "Grid" ? activeBtn : inActiveBtn}
              >
                <i className="bi bi-grid"></i>
              </button>
              <button
                onClick={() => changeLayout("List")}
                className="p-2 border border-secondary-subtle"
                style={layout == "List" ? activeBtn : inActiveBtn}
              >
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {savedJobs.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-secondary">No saved jobs found.</p>
            </div>
          ) : layout == "Grid" ? (
            savedJobs
              .filter((savedJob) => savedJob.job)
              .map((savedJob) => (
                <div
                  className="col-lg-3 col-md-4 col-12 mb-3"
                  key={savedJob._id}
                >
                  <GridCard
                          savedJobId={savedJob._id}
                    jobId={savedJob.job._id}
                    jobTitle={savedJob.job.title}
                    company={savedJob.job.company.name || savedJob.job.company}
                    location={savedJob.job.location}
                    savedDate={new Date(savedJob.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    description={savedJob.job.description}
                    jobImage={savedJob.job.company.logo || savedJob.jobImage}
                    onJobRemoved={handleJobRemoved}
                  />
                </div>
              ))
          ) : (
            savedJobs
              .filter((savedJob) => savedJob.job)
              .map((savedJob) => (
                <div className="col-12 mb-3" key={savedJob._id}>
                      <ListCard
                            savedJobId={savedJob._id}
                    jobId={savedJob.job._id}
                    jobTitle={savedJob.job.title}
                    company={savedJob.job.company.name || savedJob.job.company}
                    location={savedJob.job.location}
                    savedDate={new Date(savedJob.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    description={savedJob.job.description}
                    jobImage={savedJob.job.company.logo || savedJob.jobImage}
                    onJobRemoved={handleJobRemoved}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Job_Seeker_Saved_Jobs;
