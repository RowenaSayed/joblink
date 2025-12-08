import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/CSS/Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    type: [],
    location: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    company: "",
    keyword: "",
  });

  const norm = (v) => v?.toLowerCase().replace(/[-\s]/g, "");

  // ---------------- Fetch Jobs ----------------
  useEffect(() => {
    fetch("https://joblink-server-app.vercel.app/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        const unique = Array.from(new Map(data.map((j) => [j._id, j])).values());
        setJobs(unique);
        setFiltered(unique);

        if (location.state) {
          const patch = {
            keyword: location.state.keyword || "",
            location: location.state.location || "",
          };
          setFilters((p) => ({ ...p, ...patch }));
        }
      })
      .finally(() => setLoading(false));
  }, [location.state]);

  // ---------------- Update Filter ----------------
  const updateFilters = (k, v) => setFilters((p) => ({ ...p, [k]: v }));
  const toggleType = (t) =>
    updateFilters(
      "type",
      filters.type.includes(t)
        ? filters.type.filter((x) => x !== t)
        : [...filters.type, t]
    );

  const clear = () =>
    setFilters({
      type: [],
      location: "",
      salaryMin: "",
      salaryMax: "",
      experience: "",
      company: "",
      keyword: "",
    });

  // ---------------- Filtering Logic ----------------
  useEffect(() => {
    const f = jobs.filter((job) => {
      const txt = (
        job.title +
        job.description +
        (job.type || "") +
        (job.company?.name || "") +
        (job.skills?.join(" ") || "") +
        (job.tags?.join(" ") || "")
      ).toLowerCase();

      return (
        (!filters.keyword || txt.includes(filters.keyword.toLowerCase())) &&
        (!filters.type.length || filters.type.some((t) => norm(t) === norm(job.type))) &&
        (!filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.salaryMin || (job.salary?.min ?? 0) >= Number(filters.salaryMin)) &&
        (!filters.salaryMax || (job.salary?.max ?? 0) <= Number(filters.salaryMax)) &&
        (!filters.experience || job.experience?.toLowerCase().includes(filters.experience.toLowerCase())) &&
        (!filters.company || job.company?.name?.toLowerCase().includes(filters.company.toLowerCase()))
      );
    });

    setFiltered(f);
  }, [filters, jobs]);

  // ---------------- Dynamic Filter Options ----------------
  const typesAvailable = Array.from(new Set(jobs.map((j) => j.type).filter(Boolean)));
  const locationsAvailable = Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)));

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <main className="container-fluid my-4">
      <div className="row">

        {/* ---------------- Sidebar Filters ---------------- */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div
            className="card shadow-sm rounded-4 p-4 sticky-top"
            style={{ top: "100px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Filters</h5>
              <button className="btn btn-outline-secondary btn-sm" onClick={clear}>
                Clear
              </button>
            </div>

            <SmallInput title="Keyword" value={filters.keyword} onChange={(v) => updateFilters("keyword", v)} />
            <SmallInput title="Experience" value={filters.experience} onChange={(v) => updateFilters("experience", v)} />
            <SmallInput title="Company" value={filters.company} onChange={(v) => updateFilters("company", v)} />

            <h6 className="fw-semibold mt-3">Job Type</h6>
            {typesAvailable.map((t) => (
              <CheckBox key={t} label={t} checked={filters.type.includes(t)} onClick={() => toggleType(t)} />
            ))}

            <h6 className="fw-semibold mt-3">Location</h6>
            {locationsAvailable.map((loc) => (
              <CheckBox
                key={loc}
                label={loc}
                checked={filters.location === loc}
                onClick={() => updateFilters("location", filters.location === loc ? "" : loc)}
              />
            ))}

            <h6 className="fw-semibold mt-3">Salary Range</h6>
            <div className="d-flex gap-2">
              <NumberInput placeholder="Min" value={filters.salaryMin} onChange={(v) => updateFilters("salaryMin", v)} />
              <NumberInput placeholder="Max" value={filters.salaryMax} onChange={(v) => updateFilters("salaryMax", v)} />
            </div>
          </div>
        </div>

        {/* ---------------- Jobs List ---------------- */}
        <div className="col-lg-9 col-md-8">
          <p className="fw-semibold mb-3">{filtered.length} Jobs Found</p>
          <div className="row g-4">
            {filtered.map((job) => (
              <div className="col-12" key={job._id}>
                <JobCard job={job} navigate={navigate} />
              </div>
            ))}
            {!filtered.length && (
              <div className="text-center py-5">
                <h4>No jobs found</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Small Components ---------------- */
const SmallInput = ({ title, value, onChange }) => (
  <div className="mb-2">
    <h6>{title}</h6>
    <input className="form-control" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const NumberInput = ({ value, onChange, placeholder }) => (
  <input type="number" className="form-control" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
);

const CheckBox = ({ label, checked, onClick }) => (
  <div className="form-check">
    <input className="form-check-input" type="checkbox" checked={checked} onChange={onClick} />
    <label className="form-check-label">{label}</label>
  </div>
);

/* ---------------- Job Card ---------------- */
function JobCard({ job, navigate }) {
  const save = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch("https://joblink-server-app.vercel.app/api/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: job._id }),
      });
      const data = await res.json();
      alert(data.message || "Saved!");
    } catch {
      alert("Error saving.");
    }
  };

  return (
    <div className="card p-3 rounded-4 shadow-sm">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3">
          <img src={job.company?.logo || "/default-company.jpg"} className="rounded-circle" style={{ width: 45, height: 45, objectFit: "cover" }} alt="" />
          <div>
            <h5 className="mb-1">{job.title}</h5>
            <p className="text-muted small mb-0">{job.company?.name} • {job.type}</p>
          </div>
        </div>
        <i className="fa-regular fa-heart fs-4 text-danger" style={{ cursor: "pointer" }} onClick={save}></i>
      </div>
      <p className="mt-3 text-secondary">{job.description}</p>
      <div className="d-flex justify-content-between">
        <span className="text-muted small">${job.salary?.min} – ${job.salary?.max} {job.salary?.currency || "USD"} • {job.location}</span>
        <button className="btn btn-primary btn-sm" onClick={() => navigate(`/jobs/${job._id}`)}>View</button>
      </div>
    </div>
  );
}
